# 🏠 Roomie - Find & List Rental Spaces & Roommates

## 📜 Project Description&#x20;

Roomie is a 🌐 web-based platform built with the MERN stack that helps users find rental rooms or flats while allowing landlords to list their available properties. Additionally, it helps users find compatible roommates for shared living spaces.

## ✨ Features&#x20;

- **🔐 User Authentication** (📝 Sign up, 🔑 Login, 🚪 Logout)
- **👥 Two User Roles**: 🏡 Rent Seekers & 🏠 Property Owners
- **🏠 Property Listings**: ➕ Add, ✏️ Edit, and ❌ Delete rental spaces
- **🔍 Search & 🎛️ Filter Properties & Roommates**
- **💬 Messaging System** for 📩 direct communication between users
- **🤝 Roommate Matching** based on 🎯 preferences and compatibility
- **📱 Responsive UI with 🎨 Tailwind CSS for a seamless experience**

## 🛠️ Tech Stack&#x20;

- **🎨 Frontend**: ⚛️ React, 🎨 Tailwind CSS
- **🖥️ Backend**: 🟢 Node.js, 🚀 Express.js
- **🗄️ Database**: 🍃 MongoDB
- **🔄 State Management**: 🎭 Redux
- **🔐 Authentication**: 🔑 JWT for secure access

## 📥 Installation&#x20;

### 🛑 Prerequisites&#x20;

- Install  Node.js
- Ensure  MongoDB is running locally or use a ☁️ cloud database (MongoDB Atlas)

### ⚙️ Setup Instructions&#x20;

#### 🖥️ Clone the Repository&#x20;

```bash
git clone https://github.com/your-username/roomie.git
cd roomie
```

#### 📦 Install Dependencies&#x20;

##### ⚙️ Backend

```bash
cd server
npm install
```

##### 🎨 Frontend

```bash
cd client
npm install
```

#### 🌍 Set Up Environment Variables&#x20;

Create a `.env` file in the server directory and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

#### 🚀 Running the Application

##### ▶️ Start the Backend&#x20;

```bash
cd server
npm run dev
```

##### ▶️ Start the Frontend&#x20;

```bash
cd client
npm start
```

## 📝 License&#x20;

This project is licensed under the 📜 MIT License.&#x20;
