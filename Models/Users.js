const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    HasAdminAccess: {
        type: Boolean,
        required: false,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['superadmin', 'storekeeper', 'salesperson'],
        default: 'user',
    },


    
},
{timestamps: true}

);

//create model from schema
const User = mongoose.model('User', userSchema);

module.exports = User; //export the model to use in other files  