ReChat - Real-Time Chat Application
===================================

Welcome to **ReChat**, a real-time chat application designed to offer a seamless and intuitive messaging experience using WebSockets. This README provides instructions for setting up and running both the frontend and backend components of the application.

Overview
--------

**ReChat** is a WebSocket-powered chat application that provides an array of real-time features, such as messaging, friend requests, group chats, typing indicators, and file sharing. This project is a result of exploring WebSocket technology and real-time communication, and it includes enhanced UI responsiveness, efficient state management, and secure OTP-based authentication.

Features
--------

*   **Real-Time Messaging** with WebSockets
    
*   **Responsive Search Functionality** to locate chats quickly
    
*   **OTP-Based Authentication** for secure login
    
*   **File Sharing** support for multiple file types
    
*   **Friend Requests** to connect with new users
    
*   **Typing Indicators** to show when others are typing
    
*   **Group Chats** to support team conversations
    
*   **Real-Time Message Alerts** for instant notifications
    

Project Structure
-----------------

The project consists of two directories:

1.  **Frontend**: React-based UI for users to interact with the app.
    
2.  **Backend**: Node.js server handling WebSocket connections, authentication, and API endpoints.
    

Installation
------------

### Step 1: Clone the Repository

       git clone [https://github.com/shrivarshapoojari/ReChat.git](https://github.com/shrivarshapoojari/ReChat.git)  
       cd ReChat   `

### Step 2: Install Dependencies

Navigate to each directory (Frontend and Backend) and install the necessary npm packages.

#### Frontend

 ``` cd  Frontend ```
 
  
```   npm install   ```

#### Backend

  ```  cd ../Backend  ```
  
   ``` npm install   ```

### Step 3: Run the Application

1. ``` cd Backend ```
     ```  npm run dev ```
    
    *   Backend server will run on port 3000.
        
3.  ``` cd ../frontend ```
        ``` npm run dev```
    
    *   Frontend server will run on port 5173.
        

Accessing the Application
-------------------------

After running both servers, you can access **ReChat** in your browser at:

 ```  http://localhost:5173   ```
