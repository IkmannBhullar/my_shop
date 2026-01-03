const Product = require('../models/productModel');

// @desc    Fetch all products
// @route   GET /api/products
const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

// @desc    Fetch single product
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
    const { name, price, description, image, brand, category } = req.body;

    const product = new Product({
        name,
        price,
        user: req.user._id, // Link the product to the logged-in user!
        image,
        brand,
        category,
        countInStock: 0,
        numReviews: 0,
        description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        // CHECK OWNERSHIP: Does the logged-in user match the product owner?
        if (product.user.toString() === req.user._id.toString()) {
            
            // Use deleteOne to remove it
            await Product.deleteOne({ _id: req.params.id });
            res.json({ message: 'Product removed' });
            
        } else {
            res.status(401).json({ message: 'Not authorized to delete this item' });
        }
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

module.exports = { getProducts, getProductById, createProduct, deleteProduct };