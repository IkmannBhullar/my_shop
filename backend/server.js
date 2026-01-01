// IMPORTSLIBRARIES
// We need 'express' to build the web server.
const express = require('express');

// We need 'dotenv' to read secret variables from a .env file (we will create this later).
const dotenv = require('dotenv');

// We need 'cors' to allow our future Frontend to talk to this Backend.
const cors = require('cors');

const Product = require('./models/productModel');

// 2. CONFIGURATION
// This command loads the environment variables (secrets).
dotenv.config();



const connectDB = require('./config/db'); // <--- ADD THIS LINE

connectDB(); // <--- ADD THIS LINE (Call the function to connect)

// ... rest of the code ...
// Initialize the express application. 'app' is now our server object.
const app = express();

// 3. MIDDLEWARE
// This allows the server to accept JSON data (like when a user sends a login form).
app.use(express.json()); 

// This tells the browser it's okay for the frontend to request data from here.
app.use(cors());

// Get all products
app.get('/api/products', async (req, res) => {
    const products = await Product.find({}); // Fetch everything from MongoDB
    res.json(products);
});

// Get single product (we will need this later)
app.get('/api/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Starts the server on port 5001
const PORT = process.env.PORT || 5001;

// This command actually turns the server on.
app.listen(PORT, () => {
    // This logs a message to your terminal so you know it worked.
    console.log(`Server running on port ${PORT}`);
});

