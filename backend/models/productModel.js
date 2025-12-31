// backend/models/productModel.js
const mongoose = require('mongoose');

// 1. DEFINE THE BLUEPRINT (SCHEMA)
const productSchema = mongoose.Schema(
    {
        // Who added this product? (We will link this to a User later)
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // This links to the User model (we'll make this later)
        },
        name: {
            type: String,
            required: true, // If true, the product MUST have a name
        },
        image: {
            type: String, // This will be a URL link to the image
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0, // If we forget the price, it defaults to 0
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
    }
);

// 2. CREATE THE MODEL
// This converts the Schema into a Model we can work with
const Product = mongoose.model('Product', productSchema);

// 3. EXPORT IT
// This lets other files use this model
module.exports = Product;