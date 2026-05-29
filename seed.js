const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load environment variables
dotenv.config();

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
// Notice the second argument {} has been completely removed

const sampleProducts = [
    {
        name: 'Gaming Headset Pro',
        image: '/images/casque.jpg',
        description: 'High quality surround sound gaming headset with noise-canceling microphone.',
        category: 'Audio',
        price: 89.99,
        countInStock: 15
    },
    {
        name: 'Mechanical Keyboard',
        image: '/images/clavier.jpg',
        description: 'RGB mechanical gaming keyboard with responsive tactile switches.',
        category: 'Peripherals',
        price: 129.99,
        countInStock: 20
    },
    {
        name: 'Ultra-Wide Monitor',
        image: '/images/monitor.webp',
        description: '34-inch ultra-wide curved gaming monitor for immersive gameplay.',
        category: 'Displays',
        price: 499.99,
        countInStock: 7
    },
    {
        name: 'HD Streaming Webcam',
        image: '/images/webcam.jpg',
        description: '1080p HD webcam perfect for streaming and video calls.',
        category: 'Accessories',
        price: 59.99,
        countInStock: 30
    },
    {
        name: 'Carbon Gaming Desk',
        image: '/images/carbonDesk.webp',
        description: 'Ergonomic carbon fiber textured gaming desk with cup holder.',
        category: 'Furniture',
        price: 199.99,
        countInStock: 5
    },
    {
        name: 'Fast Wireless Charger',
        image: '/images/wirelessCharger.jpg',
        description: 'Fast charging wireless pad compatible with all Qi-enabled devices.',
        category: 'Accessories',
        price: 29.99,
        countInStock: 50
    },
    {
        name: 'Studio Condenser Mic',
        image: '/images/micro.avif',
        description: 'Professional grade USB condenser microphone for podcasting and recording.',
        category: 'Audio',
        price: 149.99,
        countInStock: 12
    },
    {
        name: 'Ergonomic Office Chair',
        image: '/images/chair.webp',
        description: 'Comfortable mesh office chair with lumbar support and adjustable arms.',
        category: 'Furniture',
        price: 249.99,
        countInStock: 8
    },
    {
        name: 'Smart RGB LED Strip',
        image: '/images/rgb.avif',
        description: 'App-controlled RGB LED strip lights to customize your room setup.',
        category: 'Lighting',
        price: 39.99,
        countInStock: 40
    },
    {
        name: 'Aluminum Laptop Stand',
        image: '/images/laptopStand.webp',
        description: 'Premium aluminum laptop riser for better ergonomics and cooling.',
        category: 'Accessories',
        price: 45.99,
        countInStock: 25
    },
    {
        name: 'Smart WiFi Plug',
        image: '/images/plug.jpg',
        description: 'Control your devices from anywhere using your smartphone.',
        category: 'Smart Home',
        price: 19.99,
        countInStock: 60
    },
    {
        name: '2TB External Hard Drive',
        image: '/images/disk.jpg',
        description: 'Portable external hard drive for fast and secure data backup.',
        category: 'Storage',
        price: 89.99,
        countInStock: 18
    },
    {
        name: 'Smartphone Gimbal',
        image: '/images/gimbal.jpg',
        description: '3-axis handheld gimbal stabilizer for smooth video recording.',
        category: 'Accessories',
        price: 119.99,
        countInStock: 10
    },
    {
        name: 'Smart Fitness Watch',
        image: '/images/smart.jpg',
        description: 'Water-resistant smartwatch with heart rate and sleep tracking.',
        category: 'Wearables',
        price: 159.99,
        countInStock: 22
    },
    {
        name: 'Multi-port USB-C Hub',
        image: '/images/usbc.jpg',
        description: 'Expand your laptop connectivity with HDMI, USB 3.0, and SD card readers.',
        category: 'Accessories',
        price: 55.99,
        countInStock: 35
    },
    {
        name: 'Bluetooth ANC Headphones',
        image: '/images/casquo.webp',
        description: 'Over-ear active noise canceling wireless headphones with deep bass.',
        category: 'Audio',
        price: 199.99,
        countInStock: 14
    },
    {
        name: 'Web Development Book',
        image: '/images/book.jpg',
        description: 'Comprehensive guide to modern full-stack web development.',
        category: 'Books',
        price: 34.99,
        countInStock: 100
    },
    {
        name: 'Dual Monitor Arm',
        image: '/images/duel.webp',
        description: 'Heavy-duty adjustable dual monitor mount for clean desk setups.',
        category: 'Accessories',
        price: 79.99,
        countInStock: 16
    },
    {
        name: 'Wooden Desk Organizer',
        image: '/images/desk.webp',
        description: 'Keep your workspace tidy with this stylish desk organizer.',
        category: 'Furniture',
        price: 24.99,
        countInStock: 45
    },
    {
        name: 'Creator Ring Light',
        image: '/images/light.webp',
        description: '10-inch LED ring light with tripod stand and phone holder.',
        category: 'Lighting',
        price: 49.99,
        countInStock: 28
    }
];

const importData = async () => {
    try {
        // 1. Clear out existing products to prevent duplicates
        await Product.deleteMany();

        // 2. Insert the sample products
        await Product.insertMany(sampleProducts);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error.message}`);
        process.exit(1);
    }
};

importData();