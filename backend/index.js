import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';
import { userRoutes, transactionRoutes } from './routes/routes.js';

dotenv.config();
//creating instance of express
const app = express();

//creating local server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Local server is running at http://localhost:${PORT}/`);
});

//application level middlewares
app.use(express.json());
app.use(cors());

//calling routes with app
userRoutes(app);
transactionRoutes(app);

//connecting with MongoDB Atlas
mongoose.connect(`mongodb+srv://akbansal765:${process.env.DB_PASSWORD}@cluster0.wxkk1bi.mongodb.net/esubhalekha`).then(() => {
    console.log("MongoDB Atlas Successfully Connected!!");
}).catch(() => {
    console.log("MongoDB Atlas not connected. Try again!!");
});
