// controllers/productController.js
const Product = require('../models/Product');

// Fetch all products from the database
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Server Error while fetching products' });
    }
};

module.exports = { getProducts };