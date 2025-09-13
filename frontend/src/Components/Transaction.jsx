import { useContext } from 'react'
import context from '../Contexts/context'
import edit from '../assets/edit.png'
import { useOutletContext } from 'react-router-dom'

const Transaction = ({text, amount, id}) => {

  const {setTransacion, setIsEditTransc, setEditID} = useOutletContext();
  
  const context_5 = useContext(context);
  const {transactions, delTransaction} = context_5

  const handleDeleteTransc = function(e){
    delTransaction(e.target.id)
  }
  
  const handleEditTransaction = function(){
     const editTransaction = transactions.find(el => el.id == id);
     setTransacion({text: editTransaction.text, amount: editTransaction.amount})
     setIsEditTransc(true);
     setEditID(id);
  }

  return (
    <>
    <div className='transaction_component'>
        <button onClick={handleEditTransaction} className="edit_transaction_btn" id={id}>
          <img src={edit} alt="edit transaction" />
        </button>
        <div className="transaction_details_box">
          <p>{text}</p>
          <div className='transaction_value_color_box'>
            <p className="transaction_value">{amount > 0 ? '+' + amount : amount}</p>
            <div className={`transaction_color_box ${amount > 0 ? 'deposit' : 'withdraw'}`}></div>
          </div>
        </div>
      <button onClick={handleDeleteTransc} className="del_transaction invisible_btn" id={id}>✖</button>
    </div>
    </>
  )
}

export default Transaction
