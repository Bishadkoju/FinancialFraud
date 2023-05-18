import React, {useState} from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Transaction from "./Transaction";


const ageMap = {
  0: "<= 18",
  1: "19-25",
  2: "26-35",
  3: "36-45",
  4: "46-55",
  5: "56-65",
  6: "> 65",
  U: "Unknown",
};

const Transactions = ({ transactions, setFraudulentTransaction}) => {
  const [selectedTransaction, setSelectedTransaction]= useState(null)
  const [transactionModalOpen, setTransctionModalOpen] = useState(true)
  const [customerModalOpen, setCustomerModalOpen] = useState(false)
  
  const handleTransactionSelect = (transaction)=> {
    setSelectedTransaction(transaction)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Action</th>
            <th>Customer Id</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Amount</th>
            <th>Merchant Id</th>
            <th>Fraudulent ?</th>
          </tr>
        </thead>
        <tbody id="stocks-table-body">
          {console.log(transactions)}
          {transactions &&
            transactions.map((transaction) => (
              <tr style={{backgroundColor: transaction.status==='Success' ? 'white': 'orange'}} key={transaction.transaction_id}>
                <td>
                  <button onClick={() => handleTransactionSelect(transaction)}>
                    View
                  </button>
                </td>
                <td>{transaction.customer_id}</td>
                <td>{transaction.gender}</td>
                <td>{ageMap[transaction.age]}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.merchant}</td>
                <td>{transaction.fraudulent ? "Yes" : "No"}</td>
              </tr>
            ))}
        </tbody>
        <Modal
          open={Boolean(selectedTransaction)}
          onClose={() => setSelectedTransaction(null)}
        >
          <Box sx={style}>
            <Transaction setFraudulentTransaction={setFraudulentTransaction} ageMap={ageMap} transaction={selectedTransaction} close={()=>setSelectedTransaction(null)}/>
          </Box>
        </Modal>
      </table>
    </div>
  );
};

export default Transactions;
