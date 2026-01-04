const Product = require('../models/productModel');

// @desc    Fetch all products
// @route   GET /api/products
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    // 1. Check if there is a keyword (e.g. ?keyword=iPhone)
    const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword, // Match part of the name
          $options: 'i',             // Case insensitive (iphone = iPhone)
        },
      }
    : {};

    // 2. Find products that match the keyword (or all if no keyword)
    const products = await Product.find({ ...keyword });
    
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
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  // 1. We extract the values sent from the frontend
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock, // <--- THIS WAS MISSING!
  } = req.body;

  // 2. We create the new product using those values
  const product = new Product({
    name,
    price,
    user: req.user._id,
    image,
    brand,
    category,
    countInStock, // <--- THIS WAS MISSING!
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