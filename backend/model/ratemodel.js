const mongoose = require('mongoose');
const rateSchema = new mongoose.Schema({
    wemail: {
        type: String,
        required: true,
        
    },
    rating: {
        type: Number,
        required: true,
       
    },
    uname: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now
    },
    photo: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Rate', rateSchema); // Export the User model