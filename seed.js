// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    { name: "Obsidian Mechanical Keyboard", price: 129.99, imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=800&fit=crop", description: "Premium tactile keyboard for professionals.", stockCount: 50 },
    { name: "Ergonomic Wireless Mouse", price: 79.99, imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop", description: "Comfort-focused design for long work hours.", stockCount: 100 },
    { name: "UltraWide Curved Monitor", price: 599.99, imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3a56?w=800&h=800&fit=crop", description: "Immersive 34-inch display for multitasking.", stockCount: 20 },
    { name: "Carbon Fiber Desk Mat", price: 34.99, imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop", description: "Sleek, durable surface for your workspace.", stockCount: 200 },
    { name: "Noise-Cancelling Headphones", price: 249.99, imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop", description: "Studio-quality sound with deep ANC.", stockCount: 40 },
    { name: "USB-C Hub Pro", price: 59.99, imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop", description: "10-in-1 connectivity for all your devices.", stockCount: 150 },
    { name: "Minimalist Laptop Stand", price: 49.99, imageUrl: "https://images.unsplash.com/photo-1593642634367-d9ea1325c34e?w=800&h=800&fit=crop", description: "Adjustable aluminum stand for better posture.", stockCount: 80 },
    { name: "Studio LED Light Bar", price: 89.99, imageUrl: "https://images.unsplash.com/photo-1598327105666-5b8935134b22?w=800&h=800&fit=crop", description: "Perfect lighting for video calls and streaming.", stockCount: 60 },
    { name: "Professional Studio Mic", price: 159.99, imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=800&fit=crop", description: "Crystal clear audio for content creation.", stockCount: 30 },
    { name: "Dual Monitor Arm", price: 119.99, imageUrl: "https://images.unsplash.com/photo-1595224756534-1188094625b1?w=800&h=800&fit=crop", description: "Full-motion mounting for two screens.", stockCount: 25 },
    { name: "Portable SSD 1TB", price: 139.99, imageUrl: "https://images.unsplash.com/photo-1597872200969-2b65374bd6e1?w=800&h=800&fit=crop", description: "High-speed storage in your pocket.", stockCount: 75 },
    { name: "Smart Charging Station", price: 69.99, imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop", description: "Charge all your gadgets simultaneously.", stockCount: 90 },
    { name: "Leather Mouse Pad", price: 29.99, imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop", description: "Premium genuine leather desk accessory.", stockCount: 120 },
    { name: "Webcam 4K Ultra", price: 199.99, imageUrl: "https://images.unsplash.com/photo-1606787620819-87fd0c8399a5?w=800&h=800&fit=crop", description: "Sharp, high-definition video for professionals.", stockCount: 35 },
    { name: "Ergonomic Gaming Chair", price: 349.99, imageUrl: "https://images.unsplash.com/photo-1580513876092-23c5e00b33a5?w=800&h=800&fit=crop", description: "Maximum comfort with lumbar support.", stockCount: 15 },
    { name: "Wireless Charging Mat", price: 39.99, imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&h=800&fit=crop", description: "Fast wireless charging for smartphones.", stockCount: 110 },
    { name: "Noise Isolating Earbuds", price: 99.99, imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop", description: "Compact design with premium sound.", stockCount: 65 },
    { name: "Desktop Microphone Arm", price: 55.99, imageUrl: "https://images.unsplash.com/photo-1583301832049-74d394e334a1?w=800&h=800&fit=crop", description: "Adjustable boom arm for studio mics.", stockCount: 45 },
    { name: "Mechanical Numpad", price: 45.99, imageUrl: "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=800&h=800&fit=crop", description: "Add a numpad to your compact keyboard.", stockCount: 70 },
    { name: "Thunderbolt 4 Cable", price: 35.99, imageUrl: "https://images.unsplash.com/photo-1596495577886-d925f1fb7538?w=800&h=800&fit=crop", description: "Maximum speed for data and power.", stockCount: 200 },
    { name: "Tablet Drawing Pen", price: 85.99, imageUrl: "https://images.unsplash.com/photo-1587840171634-802521f7537b?w=800&h=800&fit=crop", description: "Precision stylus for creative designers.", stockCount: 55 },
    { name: "Compact Mechanical Board", price: 109.99, imageUrl: "https://images.unsplash.com/photo-1595009537332-95f00e6c214c?w=800&h=800&fit=crop", description: "60% layout for a minimal desk setup.", stockCount: 40 },
    { name: "Bluetooth Speaker Pro", price: 125.99, imageUrl: "https://images.unsplash.com/photo-1545454675-3531b5767e52?w=800&h=800&fit=crop", description: "Portable high-fidelity sound.", stockCount: 50 },
    { name: "Monitor Light Bar", price: 75.00, imageUrl: "https://images.unsplash.com/photo-1592659762303-902374662e84?w=800&h=800&fit=crop", description: "Reduces eye strain with asymmetric light.", stockCount: 95 },
    { name: "Smart Desk Clock", price: 25.99, imageUrl: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&h=800&fit=crop", description: "Modern minimalist design clock.", stockCount: 150 },
    { name: "High-Speed WiFi Router", price: 189.99, imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=800&fit=crop", description: "Gigabit speeds for your smart home.", stockCount: 25 },
    { name: "Laptop Sleeve Case", price: 35.00, imageUrl: "https://images.unsplash.com/photo-1603899732733-91253272cc33?w=800&h=800&fit=crop", description: "Protective sleeve with velvet lining.", stockCount: 130 },
    { name: "HD Security Camera", price: 145.99, imageUrl: "https://images.unsplash.com/photo-1557324232-15949e2908f5?w=800&h=800&fit=crop", description: "Keep your workspace secure.", stockCount: 30 },
    { name: "RGB LED Light Strip", price: 30.00, imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&h=800&fit=crop", description: "Ambient lighting for your setup.", stockCount: 200 },
    { name: "Wireless Game Controller", price: 65.99, imageUrl: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&h=800&fit=crop", description: "Precise control for all platforms.", stockCount: 85 },
    { name: "Desktop File Organizer", price: 40.00, imageUrl: "https://images.unsplash.com/photo-1544652889-106509f6e4d2?w=800&h=800&fit=crop", description: "Keep your documents clean and organized.", stockCount: 60 },
    { name: "Headphone Stand Holder", price: 20.00, imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop", description: "Keep your headset safe and accessible.", stockCount: 140 },
    { name: "Smart Home Hub", price: 110.00, imageUrl: "https://images.unsplash.com/photo-1558002030-9e6786c57f92?w=800&h=800&fit=crop", description: "The brain of your smart setup.", stockCount: 40 },
    { name: "External CD/DVD Drive", price: 45.00, imageUrl: "https://images.unsplash.com/photo-1592398555986-e6c1e3093b13?w=800&h=800&fit=crop", description: "Slim drive for modern laptops.", stockCount: 70 },
    { name: "Graphic Tablet", price: 280.00, imageUrl: "https://images.unsplash.com/photo-1550594031-946ca68fc1c6?w=800&h=800&fit=crop", description: "Pro-level digital canvas.", stockCount: 15 },
    { name: "Adjustable Desk Lamp", price: 50.00, imageUrl: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop", description: "Customizable light for your eyes.", stockCount: 110 },
    { name: "Multi-Port Wall Charger", price: 42.00, imageUrl: "https://images.unsplash.com/photo-1584056761552-03d1581451f2?w=800&h=800&fit=crop", description: "Charge everything from one outlet.", stockCount: 160 },
    { name: "Cable Management Box", price: 22.00, imageUrl: "https://images.unsplash.com/photo-1533158307587-828f0a764d63?w=800&h=800&fit=crop", description: "Hide all your messy cables.", stockCount: 180 },
    { name: "Blue Light Glasses", price: 35.00, imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=800&fit=crop", description: "Protect your vision while coding.", stockCount: 90 },
    { name: "Wireless Media Remote", price: 30.00, imageUrl: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&h=800&fit=crop", description: "Control your media from anywhere.", stockCount: 75 }
];
const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        await Product.deleteMany({}); // Clear existing
        await Product.insertMany(products);
        console.log("Database seeded successfully!");
        
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();