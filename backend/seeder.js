// backend/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const bcrypt = require('bcryptjs'); // Security tool

// Load data files
const users = require('./data/users');
const products = require('./data/products');

// Load models
const User = require('./models/userModel');
const Product = require('./models/productModel');

// Load DB connection
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // 1. WIPE THE DATABASE CLEAN
        await Product.deleteMany();
        await User.deleteMany();

        // 2. ENCRYPT PASSWORDS & CREATE USERS
        // We loop through the users and hash their passwords before saving
        const usersWithHashedPasswords = users.map(user => {
            return {
                ...user,
                password: bcrypt.hashSync(user.password, 10)
            };
        });

        const createdUsers = await User.insertMany(usersWithHashedPasswords);

        // 3. GET THE ADMIN USER
        // We assume the first user in our list is the admin
        const adminUser = createdUsers[0]._id;

        // 4. ADD ADMIN ID TO PRODUCTS
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // 5. INSERT PRODUCTS
        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Check if we ran "node seeder.js -d" (to destroy) or just "node seeder.js" (to import)
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}