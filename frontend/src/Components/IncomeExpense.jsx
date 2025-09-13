import { useContext, useState } from 'react'
import context from '../Contexts/context'
import edit from '../assets/edit.png'
import save from '../assets/save.png'

const IncomeExpense = () => {

  const [isEdit, setIsEdit] = useState(false);
  const [incomeValue, setIncomeValue] = useState(0);

  const context_3 = useContext(context);
  const {income, setIncome, totalExpenses, updateUserIncome} = context_3;

  function handleEditIncome(e){
    setIncomeValue(e.target.value);
  }

  function handleSaveIncome(){
    if(incomeValue > 0){
      setIncome(incomeValue);
      setIsEdit(false);

      //update user income in database
      updateUserIncome(incomeValue);
    }else{
      alert("Income must be greater than zero")
    }
  }

  return (
    <div className='Income_Expense_comp'>
       {!isEdit && <button className="edit_income_button" onClick={() => setIsEdit(true)}>
                      <img src={edit} alt="edit income" />
                  </button>
       }
       {isEdit &&
       <>
          <button className='save_income_button' onClick={handleSaveIncome}>
            <img src={save} alt="save income" />
          </button>
          <button className="cancel_income_button" onClick={() => setIsEdit(false)}>✖</button>
       </>
       }
       <div className="income_box box">
        <p>INCOME</p>
        {!isEdit && <p className="income_amount">{`$${income}.00`}</p>}
        {isEdit && <input type="number" className='setIncome_input_el' placeholder='set income' value={incomeValue} onChange={handleEditIncome}/>}
       </div>
       <div className="expense_box box">
        <p>EXPENSE</p>
        <p className="expense_amount">{`$${-(totalExpenses)}.00`}</p>
       </div>
    </div>
  )
}

export default IncomeExpense
