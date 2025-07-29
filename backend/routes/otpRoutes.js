const express = require('express');
const router = express.Router();
const { sendOTP } = require('../controllers/otpcontroller');
const otpModel = require("../model/otpmodel");
router.post('/send/:id/:email', sendOTP);
router.get('/:id',async (req,res)=>{
try{
const bookid=req.params.id;
const OTP=await otpModel.findOne({bid:bookid});
if(!OTP){
    return res.json("Otp not found");
}
return res.json({OTP});
}
catch{
return res.json("Server Error");
}
});

module.exports = router;
