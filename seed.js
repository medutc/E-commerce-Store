// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
    {
        name: "Emerald Horizon Watch",
        description: "A luxury timepiece featuring a charcoal matte finish with subtle emerald blue accents.",
        price: 299.99,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
        stockCount: 15
    },
    {
        name: "Minimalist Acoustic Pods",
        description: "High-fidelity wireless audio wrapped in a sleek, soft-touch neutral casing.",
        price: 149.99,
        imageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=800",
        stockCount: 30
    },
    {
        name: "Carbon Fiber Desk Mat",
        description: "Premium charcoal desk organization with glassmorphism-inspired synthetic weave.",
        price: 49.99,
        imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800",
        stockCount: 50
    }
];
console.log("MY MONGO URI IS:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected for Seeding...');
        await Product.deleteMany(); // Clear existing products
        await Product.insertMany(sampleProducts);
        console.log('Premium Products Imported Successfully!');
        process.exit();
    })
    .catch((error) => {
        console.error('Error seeding data:', error);
        process.exit(1);
    });