import React from "react";
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'

const Transaction = ({transaction, ageMap, close, setFraudulentTransaction}) =>{
    if(!transaction){
        return
    }
    const {transaction_id, customer_id, gender, age, amount, merchant, fraudulent, status} = transaction

    const handleFraudulentSwitch= (e)=>{
        console.log(e.target.checked)
        setFraudulentTransaction(transaction_id, e.target.checked)
    }
    return (
        <div>
           <h3> Transaction Details</h3>
      <table className="table is-striped is-fullwidth">
        <tr>
          <td>Transaction ID</td>
          <td>{transaction_id}</td>
        </tr>
        <tr>
          <td>Date</td>
          <td>{(new Date(parseInt(transaction_id))).toUTCString()}</td>
        </tr>
        <tr>
          <td>Customer ID</td>
          <td>{customer_id}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{gender}</td>
        </tr>
        <tr>
          <td>Age</td>
          <td>{ageMap[age]} yrs</td>
        </tr>
        <tr>
          <td>Customer ID</td>
          <td>{customer_id}</td>
        </tr>
        <tr>
          <td> Amount</td>
          <td>${amount}</td>
        </tr>
        <tr>
          <td>Merchant ID</td>
          <td>{merchant}</td>
        </tr>
        <tr>
            <td>Status</td>
            <td>{status}</td>
        </tr>
        <tr>
            <td>Fraudulent</td>
            <td><Switch checked={fraudulent} onChange={handleFraudulentSwitch}/></td>
        </tr>
      </table>
      <Button variant='contained' color='error' onClick={close}>Close</Button>
      </div>
    );
}

export default Transaction