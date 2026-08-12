const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
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
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['superadmin', 'storekeeper', 'salesperson'],
        //default: 'salesperson',
    },
    HasAdminAccess: {
        type: Boolean,
        required: false,
    },


    
},
{timestamps: true}

);

//create model from schema
const User = mongoose.model('User', userSchema);

module.exports = User; //export the model to use in other files  