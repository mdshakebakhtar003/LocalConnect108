const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true,
        
    },
    Time: {
        type: String,
        required: true,
        
        
    },
    Address: {
        type: String,
        required: true,
       
    },
    instruction: {
        type: String,
        required:true,
    },
    email:{
        type:String,
        required: true
    },
    name:{
         type:String,
        required: true
    },
    phone:{
         type:String,
        required: true
    },
    uemail:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    wname:{
        type:String,
        required: true
    },
    wtag:{
        type:String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending',
        required: true
    },
    chatid: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Book', bookSchema); // Export the User model