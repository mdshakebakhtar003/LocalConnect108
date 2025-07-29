const mongoose = require('mongoose');
const workerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        default: 'worker',
        enum: ['user', 'worker']
    },
    Experience:{
        type: String,
        required:true
    },
    Hourly_rate:{
    type:String,
    required:true
    },
    Job_done:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        required: true
    },
    profileImage: {
        type: String // This will store the file path or URL
    },
    rating:{

      type:  [Number] // Array of numbers or strings for ratings
        
    }
  
}, {
    timestamps: true
});
module.exports = mongoose.model('Worker', workerSchema); // Export the User model