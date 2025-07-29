const express=require('express');
const router=express.Router();
const {registerWorker}=require('../controllers/registerWorker');
const {loginWorker}=require('../controllers/loginWorker');
const bookModel = require("../model/bookmodel");
router.get("/", function (req, res) {
  res.send("hey it's working");
});


router.post('/service', async (req, res) => {
  try {
    const data = req.body;
    const { Date, Time, Address, instruction, email,name,phone,uemail,price ,wname,wtag,status} = data;
    if (!Date || !Time || !Address || !email || !name || !phone || !uemail || !price || !wname || !wtag || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newUser = await bookModel.create({
      Date,
      Time,
      Address,
      instruction,
      email,
      name,
      phone,
      uemail,
      price,
      wname,
      wtag,
      status
    });

    return res.json({ newUser });
  } catch (err) {
  console.error("Booking error:", err.stack || err);
  res.status(500).json({ message: "Internal server error" });
}
});
router.get('/profile/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;
        const user = await bookModel.find({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user }); // send user object
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get('/users/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;
        const user = await bookModel.find({ uemail: userEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user }); // send user object
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await bookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.json({ book });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

    router.post('/modify/:id',async (req, res) => {
    try {
        const bookId = req.params.id;
        const { status } = req.body;
        const book = await bookModel.findOneAndUpdate({ _id: bookId }, { status }, { new: true });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        return res.json({ book });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post('/chat/:bookingId', async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const { chatid } = req.body;
        const message = await bookModel.findOneAndUpdate(
            { _id: bookingId },
            {  chatid: chatid  },
            { new: true }
        );
        if (!message) {
            return res.status(404).json({ message: "Chat not found" });
        }
        return res.json({ message });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
