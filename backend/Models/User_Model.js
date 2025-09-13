import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true
    }
}, {timestamps: true});


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    income: {
        type: Number,
        required: true,
        default: 100
    },
    transactions: {
        type: [transactionSchema],
        default: []
    }
}, {timestamps: true});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;