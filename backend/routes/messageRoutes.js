const express = require('express');
const router = express.Router();
const { sendOTP } = require('../controllers/otpcontroller');
const Message = require("../model/messagemodel");







router.get('/:roomId', async (req, res) => {
  const messages = await Message.find({ roomId: req.params.roomId });
  res.json(messages);
});
module.exports = router;