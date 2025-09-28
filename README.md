![image](https://github.com/user-attachments/assets/d6224ebe-7b2c-4f21-ab83-42e27e4ac37c) 
# HD Notes App

A modern, responsive note-taking application built with React, TypeScript, and a Node.js/Express backend. It features a secure, passwordless authentication flow using email and One-Time Passwords (OTP).

## 🚀 Live Demo

You can view and interact with the live application here: **[https://hd-notes-app-sage.vercel.app/](https://hd-notes-app-sage.vercel.app/)**

![image](https://github.com/user-attachments/assets/c09a2d7b-3f8b-406d-bd4f-f668ec554130)

![image](https://github.com/user-attachments/assets/56d64272-41b3-4e1b-a77a-863da82bed77)

![image](https://github.com/user-attachments/assets/da1e162a-27cb-475d-8a05-70c20ef12c4a)

<p align="center">
  <img width="400" src="https://github.com/user-attachments/assets/28a6e09e-28d4-41e0-ba5f-fc8aebc65b12" hspace="10">
  <img width="400" src="https://github.com/user-attachments/assets/629cb8b6-a584-4ae0-aa6b-f71c9a905e0a" hspace="10">
</p>

## ✨ Features

-   **🔐 Secure Authentication**
    -   Email-based OTP authentication for passwordless login and registration.
    -   Protected API endpoints using JSON Web Tokens (JWT) to ensure data privacy.
    -   JWTs are stored securely on the client to manage user sessions.

-   **📝 Note Management**
    -   Authenticated users can create and delete their own notes.
    -   A clean and intuitive dashboard to view all notes.
    -   Responsive design that works on both desktop and mobile devices.

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18.0.0 or higher)
-   npm (or yarn)
-   A MongoDB account (a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) is recommended)
-   A Gmail account with an **App Password** for sending OTP emails via Nodemailer.

### Installation

#### Backend Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/vineet0194/HD-notes-app.git](https://github.com/vineet0194/HD-notes-app.git)
    cd your-repo-name
    ```

2.  **Navigate to the backend directory**
    ```bash
    cd backend
    ```

3.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Create an environment file**
    Create a `.env` file in the `/backend` directory and add the following configuration variables:
    ```env
    MONGO_URI=<Your MongoDB Connection String>
    JWT_SECRET=a_strong_random_secret_key_for_jwt
    EMAIL_USER=<Your_Gmail_Address>
    EMAIL_PASS=<Your_16_Character_Google_App_Password_with_no_spaces>
    ```

5.  **Start the server**
    ```bash
    npm run dev
    ```
    The backend server will start on `http://localhost:3001`.

#### Frontend Setup

1.  **Navigate to the frontend directory** (from the project's root folder)
    ```bash
    cd frontend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure the proxy**
    Ensure the `proxy` setting in `/frontend/package.json` is set to your backend's URL:
    ```json
    "proxy": "http://localhost:3001"
    ```

4.  **Start the development server**
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.

## 🎨 Technologies Used

### Frontend
-   React 18
-   TypeScript
-   Axios (for API requests)
-   Modern CSS3 with a responsive, mobile-first design

### Backend
-   Node.js with Express
-   TypeScript
-   MongoDB with Mongoose (for data modeling)
-   JSON Web Tokens (JWT) for authentication
-   Nodemailer for sending OTP emails

## 🤝 Contributing

Contributions are always welcome! [cite_start]Please feel free to fork the repository and submit a Pull Request. [cite: 9]

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/NewFeature`)
3.  Commit your Changes (`git commit -m 'Add some NewFeature'`)
4.  Push to the Branch (`git push origin feature/NewFeature`)
5.  Open a Pull Request

---

Made with ❤️ by Vineet Singh
