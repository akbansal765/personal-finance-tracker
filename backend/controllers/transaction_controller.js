import UserModel from "../Models/User_Model.js";

export async function getAllTransactions(req, res){
    try{
        //finding a user
        const email = req.query.email;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        //getting transactions from user
        const transactions = user.transactions;
        if(transactions.length == 0){
            return res.status(404).json({message: 'No transactions found'});
        }
        return res.status(200).json(user.transactions);
    }catch(err){
        return res.status(500).json({message: "Unable to fetch transactions! Kindly try again later",
                                     error: err.message
                                    });
    }
}

export async function createTransaction(req, res){
    try{
        //finding the user
        const email = req.query.email;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        //creating a new transaction in transactions array in the user
        const {id, text, amount, date} = req.body;
        user.transactions.push({id, text, amount, date});
        await user.save();

        return res.status(201).json({message: "Transaction has been added!!"})
    }catch(err){
        return res.status(500).json({message: "Unable to add transaction! Kindly try again later",
                                     error: err.message
                                    });
    }
}

export async function updateTransaction(req, res){
    try{
        const transactionId = req.params.id;

        const email = req.query.email;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const index = user.transactions.findIndex(transaction => transaction.id == transactionId);
        if(index == -1){
            return res.status(404).json({messsage: "Transaction not found!!"})
        }
        //inserting the updated transaction in the transactions array
        user.transactions[index] = req.body;

        await user.save();

        return res.status(200).json({message: "Transaction has been updated!!"})
    }catch(err){
        return res.status(500).json({message: "Unable to update the transaction! Kindly try again later",
                                     error: err.message
                                    });
    }
}

export async function deleteTransaction(req, res){
    try{
        //getting task id from request params
        const transactionId = req.params.id;

        const email = req.query.email;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const index = user.transactions.findIndex(transaction => transaction.id == transactionId);
        if(index == -1){
            return res.status(404).json({messsage: "Transaction not found!!"})
        }
        //deleting the transaction
        user.transactions.splice(index, 1);
        await user.save();

        return res.status(200).json({message: "Transaction has been deleted!!"})
    }catch(err){
        return res.status(500).json({message: "Unable to delete the transaction! Kindly try again later",
                                     error: err.message
                                    });
    }
}