// makeAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const user = await User.findOneAndUpdate(
        { email: 'medmigamo@gmail.com' },  
        { $set: { isAdmin: true } },
        { new: true }
    );
    console.log('✅ Admin set for:', user.name, '| isAdmin:', user.isAdmin);
    process.exit();
});