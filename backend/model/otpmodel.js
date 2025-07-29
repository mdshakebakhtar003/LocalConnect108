const mongoose = require('mongoose');
const OtpSchema = new mongoose.Schema({
    bid: {
        type: String,
        required: true,
        
    },
    otp: {
        type: String,
        required: true,
       
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Otp', OtpSchema); // Export the User model