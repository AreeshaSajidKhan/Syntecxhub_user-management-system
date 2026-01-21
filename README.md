# User Management System 🚀

A full-stack **User Management System** that allows complete **CRUD operations** — Create, Read, Update, and Delete users.  
This project demonstrates full-stack development skills using **React for frontend**, **Node.js & Express for backend**, **MongoDB for database**, and **Postman for API testing**.  

---

## 🌟 Features

- Add new users  
- View all users  
- Update/Edit existing users  
- Delete users  
- Refresh user list  
- Modern, professional UI with **gradient/background color changes and dynamic effects**  

---

## 🧰 Tech Stack

- **Frontend:** React, JavaScript, CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB Atlas, Mongoose for schema & data management  
- **API Testing:** Postman  

---

## 🔗 Requirements

- Node.js installed  
- NPM installed  
- MongoDB Atlas account (or local MongoDB)  

 🛠 Setup & Running the Project

 1️⃣ Backend

1. Open terminal in `backend` folder  
2. Install dependencies:
npm install

Make sure .env file exists with:
MONGO_URI=your_mongodb_connection_string
PORT=5000
AUTH_USER=your_db_username
AUTH_PASS=your_db_password

Start backend server:
npx nodemon server.js
You should see:
MongoDB Connected
Server running on port 5000

2️⃣ Frontend

Open another terminal in frontend folder
Install dependencies:
npm install
Start frontend:
npm start
Opens in browser at: http://localhost:3000

Database (MongoDB)
Hosted on MongoDB Atlas
Users stored in a collection called users
Schema defined using Mongoose

🎨 Frontend Features

Modern UI with gradient backgrounds & hover effects
Display users in cards with icons
Add/Edit/Delete users using forms and buttons
Refresh button to reload user list from backend
