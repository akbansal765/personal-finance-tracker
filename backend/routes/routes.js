import { registerUser, loginUser, updateUserIncome, getUserIncome } from "../controllers/user_controller.js";
import { getAllTransactions, createTransaction, updateTransaction, deleteTransaction } from "../controllers/transaction_controller.js";
import verifyToken from "../middlewares/verifyToken.js";

export function userRoutes(app){
   app.post("/register", registerUser); // api for registering the new user
   app.post("/login", loginUser); // api for handling login
   app.put("/income", updateUserIncome); // api for updating the user income
   app.get("/income", getUserIncome); // api to get the user income
}

export function transactionRoutes(app){
   app.get("/transactions", verifyToken, getAllTransactions); // api to fetch all the existing transactions per user
   app.post("/transaction", createTransaction); // api to create a transaction
   app.put("/transaction/:id", updateTransaction); // api to update the existing transaction
   app.delete("/transaction/:id", deleteTransaction); // api to delete the transaction
}