import { useContext } from 'react'
import context from '../Contexts/context'
import { useOutletContext } from 'react-router-dom'

const NewTransaction = () => {
  const context_2 = useContext(context);
  const {addTransaction, updateTransaction, balance} = context_2;

  // const [transaction, setTransacion] = useState({text: '', amount: ''});
    const {transaction, setTransacion, isEditTransac, setIsEditTransc, editID} = useOutletContext();


  const handleFormSubmit = (e) => {
      e.preventDefault();

      const _date = new Date();
      const date_1 = _date.toLocaleDateString();
      const date_2 = _date.toLocaleTimeString();
      const date = date_1 + ' ' + date_2;

      const text = transaction.text;
      const amount = transaction.amount;
      if(!isEditTransac){
        addTransaction(text, amount, date);
      }else{
        updateTransaction(text, amount, date, editID);
      }

      // clearing the input fields
      if(amount > 0 || (amount < 0 && Math.abs(amount) <= balance)){
        setTransacion({text : '', amount : ''})
        setIsEditTransc(false);
      }
  }

  const onChange = (e) => {
    setTransacion({...transaction, [e.target.name] : e.target.value})
  }

  return (
    <div className='newTransaction_component'>
        <div className="newTransaction_header">Add new transaction</div>
        <div className='newTransaction_form'>
            <form className='form' onSubmit={handleFormSubmit}>
                <div>
                    <p>Text</p>
                    <input className='transaction_description' type="text" name='text' value={transaction.text} onChange={onChange} placeholder='Enter text...'/>
                </div>
                <div>
                    <p>Amount</p>
                    <p>(negative - expense, positive - income)</p>
                    <input className='newTransaction_amount' type="number" name='amount' value={transaction.amount} onChange={onChange} placeholder='Enter amount...'/>
                </div>
                <button className="addTransaction_btn">{isEditTransac ? "Update Transaction" : "Add Transaction"}</button>
            </form>
        </div>
    </div>
  )
}

export default NewTransaction
