import React, { useState, useEffect} from 'react';
import Filter from './filter';
// import Form from './form';
import { Watch, watch } from 'react-loader-spinner';
import Form from './form.js';


function Trans() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      fetch("https://api.npoint.io/6c17bb8fe6201901f1b2")
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data.transactions);
          setIsLoading(false);
        });
    }, []);
  
    const handleNewTransaction = (newTransaction) => {
      setTransactions([...transactions, newTransaction]);
    };
  
    const handleDeleteTransaction = (id) => {
      const newTransactions = transactions.filter((transaction) => transaction.id !== id);
      setTransactions(newTransactions);
    };
  
    return (
      <div className="transactions-container">
        {isLoading ? (
          <div className='loader'>
            <Watch
  height="80"
  width="80"
  radius="48"
  color="#4fa94d"
  ariaLabel="watch-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
/>
          </div>
        ) : (
          <>
            <Filter transactions={transactions} onDelete={handleDeleteTransaction} />
            <Form onSubmit={handleNewTransaction} />
          </>
        )}
      </div>
    );
  }

export default Trans;

