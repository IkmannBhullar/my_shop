const path = require('path'); // <--- 1. Import path
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); // <--- 2. Import upload routes
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

connectDB(); // <--- 3. Connect to Database

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running...');
});

// 4. Use Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

// 5. Make the "uploads" folder accessible to the browser
// We use the global __dirname directly to avoid conflicts
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});