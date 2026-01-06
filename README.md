# SwapSpot - Full Stack E-Commerce Platform

SwapSpot is a fully functional e-commerce application built from scratch using the MERN stack (MongoDB, Express, React, Node.js). It features a complete shopping cart, user authentication, product management, and payment integration.

## 🚀 Live Demo

[Link to Live Site](https://your-app-url.onrender.com)

## ✨ Key Features

- **Full Stack Shopping Cart:** Custom built cart logic with Redux/Context API.
- **User Authentication:** Secure login & registration using JWT (JSON Web Tokens).
- **Product Management:** Admin dashboard to Create, Read, Update, and Delete (CRUD) products.
- **Cloud Image Storage:** Integrated Cloudinary for seamless image uploads.
- **Payment Processing:** Fully integrated PayPal API for secure transactions.
- **Database:** MongoDB Atlas for scalable cloud data storage.
- **Responsive Design:** Styled with React-Bootstrap (Lux Theme) for mobile-first UI.

## 🛠️ Tech Stack

- **Frontend:** React.js, React-Bootstrap, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Tools:** Cloudinary, Multer, PayPal API, JWT

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

`NODE_ENV` = development
`PORT` = 5001
`MONGO_URI` = mongodb+srv://ikmann12_db_user:Ikmann12%40@cluster0.qgqkutr.mongodb.net/?appName=Cluster0
`JWT_SECRET` = supersecretkey123
`PAYPAL_CLIENT_ID` = your_paypal_client_id
`CLOUDINARY_CLOUD_NAME` = dkwbzioop
`CLOUDINARY_API_KEY` = 653462541483162
`CLOUDINARY_API_SECRET` = 5GoRQv2OsV9YE9dB76TcmzR2FwQ

## 📦 Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/yourusername/swapspot.git](https://github.com/yourusername/swapspot.git)
    ```

2.  **Install Dependencies (Root, Backend & Frontend)**

    ```bash
    npm install
    cd frontend
    npm install
    ```

3.  **Run the App**
    ```bash
    # Run Frontend and Backend concurrently
    npm run dev
    ```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
