// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Attempt to connect to the database using the URI from your .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // If something goes wrong (wrong password, no internet), show the error
        console.error(`Error: ${error.message}`);
        process.exit(1); // Stop the app because we can't run without a DB
    }
};

module.exports = connectDB;