import "./App.css";
import React, { useEffect, useState } from "react";
import logo from './fraud.png'
import Transactions from "./components/Transactions";
export const BACKEND_URL = "http://localhost:3030/"

function App() {
  const [transactions, setTransactions] = useState([])
  const fetchTransactionsData = async () => {
    try {
        const res2 = await fetch(BACKEND_URL );
        if (res2.status === 200) {
          const response = await res2.json();
          console.log(response.transactions.reverse().map(x=>x));
          setTransactions(response.transactions);
        }
    } catch (e) {
      console.log("Couldnt fetch data");
    }
  };
  const setFraudulentTransaction = async(id, value) => {
    console.log(id, value)
    const formData = new FormData();
    formData.append("id", id);
    formData.append("value", value);
    const req = await fetch(BACKEND_URL+'setFraudulent',{ method: 'POST', body: formData} )
    console.log('hello', req)
    const updatedTransactions = transactions.map(transaction=>{
      if(transaction.transaction_id==id){
        transaction.fraudulent = value
        transaction.status = value ? 'Suspicious' : 'Success'
      }
      return transaction
    })
    setTransactions(updatedTransactions)
  }
  useEffect(()=>{
    fetchTransactionsData()
  } , [])

  return (
    <div className="App">
      <h1 className="title">Financial Fraud Monitor</h1>
      <img id="logo" src={logo} alt="Logo" />
      <div className="container">
        <Transactions transactions={transactions} setFraudulentTransaction={setFraudulentTransaction} />
      </div>
    </div>
  );
}

export default App;
