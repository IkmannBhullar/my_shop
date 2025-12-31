// IMPORTSLIBRARIES
// We need 'express' to build the web server.
const express = require('express');

// We need 'dotenv' to read secret variables from a .env file (we will create this later).
const dotenv = require('dotenv');

// We need 'cors' to allow our future Frontend to talk to this Backend.
const cors = require('cors');

// 2. CONFIGURATION
// This command loads the environment variables (secrets).
dotenv.config();

// Initialize the express application. 'app' is now our server object.
const app = express();

// 3. MIDDLEWARE
// This allows the server to accept JSON data (like when a user sends a login form).
app.use(express.json()); 

// This tells the browser it's okay for the frontend to request data from here.
app.use(cors());

// 4. ROUTES (The URL paths)
// A simple test route. If you visit http://localhost:5000/, this function runs.
// req = request (what the user sent us), res = response (what we send back).
app.get('/', (req, res) => {
    res.send('API is running...'); 
});

// Starts the server on port 5001
const PORT = process.env.PORT || 5001;

// This command actually turns the server on.
app.listen(PORT, () => {
    // This logs a message to your terminal so you know it worked.
    console.log(`Server running on port ${PORT}`);
});