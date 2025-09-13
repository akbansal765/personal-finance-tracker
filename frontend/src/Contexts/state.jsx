import { useState, useEffect } from 'react'
import context from './context'

const State = (props) => {

  const [income, setIncome] = useState(100);
  const [user, setUser] = useState(null);

  const [transactions, setTransacions] = useState([]);


/////////////  Adding New Transaction  /////////////////
function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // fallback for older browsers
  return Date.now() + Math.random().toString(36).substring(2, 9);
}

const addTransaction = async (text, amount, date) => {
    const newTransc = {
        "text" : text,
        "amount" : amount,
        "id": generateId(),
        "date": date
      }
    // add the transaction only when amount is positive and if amount is positive it should be greater than balance amount
    if(amount > 0){
      setTransacions(transactions.concat(newTransc));
    }
    if(amount < 0 && Math.abs(amount) <= balance){
      setTransacions(transactions.concat(newTransc));
    }
    if(amount < 0 && Math.abs(amount) > balance){
      alert('Balance cant be negative')
    }

    //adding transaction to database
    try{
      if(!user) return;
      const response = await fetch(`http://localhost:5000/transaction?email=${user?.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTransc)
        })
        const data = await response.json();
        if(response.ok){
          console.log(data.message);
        }else{
          alert(data.message);
        }
    }catch(err){
      console.log(err.message);
    }
}

//////////////// Update Transaction ///////////////////
const updateTransaction = async (text, amount, date, id) => {
    const newArray = transactions.filter(obj => obj.id !== id);
    const newTransc = {
        "text" : text,
        "amount" : amount,
        "id": id,
        "date": date
    }
        // add the transaction only when amount is positive and if amount is positive it should be greater than balance amount
    if(amount > 0){
      setTransacions(newArray.concat(newTransc));
    }
    if(amount < 0 && Math.abs(amount) <= balance){
      setTransacions(newArray.concat(newTransc));
    }
    if(amount < 0 && Math.abs(amount) > balance){
      alert('Balance cant be negative')
    }

    //updating transaction in the database
    try{
      if(!user) return;
      const response = await fetch(`http://localhost:5000/transaction/${id}?email=${user?.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTransc)
        })
        const data = await response.json();
        if(response.ok){
          console.log(data.message);
        }else{
          alert(data.message);
        }
    }catch(err){
      console.log(err.message);
    }
}

/////////////// Deleting Transaction //////////////////
const delTransaction = async (id) => {
  // filtering the transaction whose id does not match with delete button id passed in the function
  const newArray = transactions.filter((obj) => obj.id !== id);

  setTransacions(newArray);

    //updating transaction in the database
    try{
      if(!user) return;
      const response = await fetch(`http://localhost:5000/transaction/${id}?email=${user?.email}`, {
        method: "DELETE"
        })
        const data = await response.json();
        if(response.ok){
          console.log(data.message);
        }else{
          alert(data.message);
        }
    }catch(err){
      console.log(err.message);
    }
}

//////////////// Updating User Income ///////////////////
const updateUserIncome = async (userIncome) => {
    //updating income in the database
    try{
      if(!user) return;
      const response = await fetch(`http://localhost:5000/income?email=${user?.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({userIncome})
        })
        const data = await response.json();
        if(response.ok){
          console.log(data.message);
        }else{
          alert(data.message);
        }
    }catch(err){
      console.log(err.message);
    }
}

/////////////  Calculating Transactions Sum ////////////
let totalExpenses = "";
let totalCredit;

const transactionSum = () => {

  const amountarray = transactions.map((obj)=>{
    return Number(obj.amount)
  });

  const expensesArray = amountarray.filter((amount)=>amount < 0);
  
  const creditArray = amountarray.filter((amount) => amount > 0);


  totalExpenses = expensesArray.reduce((acc, cur) => {
   return acc + cur;
  }, 0);
  totalCredit = creditArray.reduce((acc, cur) => {
   return acc + cur;
  }, 0);
}
transactionSum();

/////////////  Calculating Remaing Balance for Your Balance Component  ////////////////////

const balance = income - (-totalExpenses) + totalCredit;

/////////////////////////////////////////////////
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("LoggedInUserData")) || "null";
    setUser(data);
  }, [])

  useEffect(() => {
    //getting all the transactions
    async function fetchTransactions(){
      try{
          if(!user) return;
          const response = await fetch(`http://localhost:5000/transactions?email=${user?.email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `JWT ${user?.accessToken}`
            },
          })
          const data = await response.json();
          if(response.ok){
            setTransacions(data);
          }else{
            alert(data.message);
          }
      }catch(err){
          console.log(err.message);
      }
    }
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    /////////////// fetching user income ///////////////
    async function fetchUserIncome(){
      try{
          if(!user) return;
          const response = await fetch(`http://localhost:5000/income?email=${user?.email}`)
          const data = await response.json();
          if(response.ok){
            setIncome(data);
          }else{
            alert(data.message);
          }
      }catch(err){
          console.log(err.message);
      }
    }
    fetchUserIncome();
  }, [user]);

  return (
    <div>
      <context.Provider value={{transactions, addTransaction, delTransaction, updateTransaction, totalExpenses, income, setIncome, balance, updateUserIncome}}>
        {props.children}
      </context.Provider>
    </div>
  )
}

export default State

