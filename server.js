// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); 
// Middleware
app.use(cors()); 
app.use(express.json()); 
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log('Database connection error: ', err));

// Basic Health Check Route
app.get('/api/status', (req, res) => {
    res.json({ message: 'E-commerce API is running smoothly.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});