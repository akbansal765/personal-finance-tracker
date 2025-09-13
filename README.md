# Project Setup Instructions

Follow the steps below to get the project running locally.

## Setup Instructions

### Step 1: Start the Frontend

cd frontend
npm install
npm run dev

### Step 2: Start the Backend

cd backend
npm install
create .env file (I have shared a env file on the internshala platform)
npm start


### Authentication Flow

Register: Users must first create an account by registering.

Login: After registering, users can log in to access the application.

Access Control: Only logged-in users (authenticated via JWT) are allowed to get the transactions.

Security: User passwords are hashed using bcrypt before storing them in the database.


### Features
User registration and login system

Only Authenticated users can fetch their transactions

JWT (JSON Web Token) is used to protect routes and verify users

Passwords are securely hashed using bcrypt

Clean separation of frontend and backend codebases

Users can set their income

Can update transactions

Users can download their statement and view the statement in the table format


## 🧰 Tech Stack

### 🌐 Frontend  
- React.js (with Hooks and functional components)  
- Context API (for state management)  
- React Router DOM
- XLSX Library for exporting excel files

### 🛠️ Backend  
- Node.js with Express  
- MongoDB with Mongoose  
- JWT (for authentication)  
- Bcrypt (password hashing)  
- CORS
- Dotenv (environment variables handling)   


## 📡 API Documentation

Base URL: `http://localhost:5000/api`

### 🔐 Auth Routes

| Method | Endpoint       | Description        |
|--------|----------------|--------------------|
| POST   | `/register`    | Create new user    |
| POST   | `/login`       | Authenticate user  |


### 📋 Transactions Routes (JWT Protected)

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| GET    | `/transactions`  | Fetch all transactions |
| POST   | `/transaction`   | Create new transaction |
| PUT    |`/transaction/:id`| Update a transaction   |
| DELETE |`/transaction/:id`| Delete a transaction   |
| GET    | `/income/:id`    | Fetch user income      |
| PUT    | `/income/:id`    | Update user income     |
