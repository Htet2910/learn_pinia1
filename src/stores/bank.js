import { defineStore } from "pinia";
// type Transaction={
//   id:number,
//   amount:Number,
//   type:'charge'|'refund'|'payment',
//   status:'pending'|'processed'
// }
// type BankDetail ={
//     balance:0,
//     transactions:Transaction[]
// }
const useBankAccountStore = defineStore('bankAccount',{
  state:()=>{
         return {
            balance:0,
            transactions:[]
         }
  },
  actions:{
      charge(amount) {
        const id =Date.now();
        this.transactions.push({
            id,
            type:'charge',
            amount,
            status:'pending',
        });
        return id;
      },
      pay(amount){
        const id =Date.now();
        this.transactions.push({
            id,
            type:'payment',
            amount:-amount,
            status:'pending',
        });
        return id;
      },
      reconcile(){
       this.balance=this.runningBalance;
       this.transactions=[];
      },
      processTransaction(transactionId){
        setTimeout(()=>{
            this.transactions=this.transactions.map((t)=>{
                if(t.id === transactionId){
                    return{...t,status:'processed'}
                }
                return t;
            })
        },5000)
      }
  },
  getters:{
       processTransaction:(state) => state.transactions.filter((t)=>t.status ==='processed'),
       pendingTransaction:(state) => state.transactions.filter((t)=>t.status === 'pending'),

       runningBalance(state){
         return (
            this.balance +
            this.processTransaction.map((t)=>t.amount)
            .reduce((acc,curr)=>acc+curr,0)
         );
       },
       pendingAmount(){
         return this.pendingTransaction.map((t)=>t.amount)
         .reduce((acc,curr)=>acc+curr,0)
       },
  }
})