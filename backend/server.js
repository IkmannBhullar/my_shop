// // IMPORTSLIBRARIES
// // We need 'express' to build the web server.
// const express = require('express');

// // We need 'dotenv' to read secret variables from a .env file (we will create this later).
// const dotenv = require('dotenv');

// // We need 'cors' to allow our future Frontend to talk to this Backend.
// const cors = require('cors');

// const Product = require('./models/productModel');

// const userRoutes = require('./routes/userRoutes');

// // 2. CONFIGURATION
// // This command loads the environment variables (secrets).
// dotenv.config();



// const connectDB = require('./config/db'); // <--- ADD THIS LINE

// connectDB(); // <--- ADD THIS LINE (Call the function to connect)

// // ... rest of the code ...
// // Initialize the express application. 'app' is now our server object.
// const app = express();

// // 3. MIDDLEWARE
// // This allows the server to accept JSON data (like when a user sends a login form).
// app.use(express.json()); 

// // This tells the browser it's okay for the frontend to request data from here.
// app.use(cors());

// app.use('/api/users', userRoutes); //get user routes



// // Starts the server on port 5001
// const PORT = process.env.PORT || 5001;

// // This command actually turns the server on.
// app.listen(PORT, () => {
//     // This logs a message to your terminal so you know it worked.
//     console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
// Import Routes
const productRoutes = require('./routes/productRoutes'); // <--- NEW
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Use Routes
app.use('/api/products', productRoutes); // <--- NEW
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));