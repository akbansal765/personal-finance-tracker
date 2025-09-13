import Transaction from './Transaction'
import { useContext } from 'react'
import context from '../Contexts/context'

const History = () => {
  
  const context_1 = useContext(context);
  const {transactions} = context_1;

  const last_10_transactions = transactions.slice(-10).reverse();  // here we got the last 10 transactions and then reverse them to show the latest transaction at first

  return (
    <div className='history_component'>
      <p className="history_header">
        Last 10 Transactions
      </p>
      <div className="transactions_box">
        {last_10_transactions.map((transactionObj, i) => {
          return <Transaction text={transactionObj.text} amount={transactionObj.amount} key={transactionObj.id} id={transactionObj.id}/>
        })}
       
      </div>
    </div>
  )
}

export default History