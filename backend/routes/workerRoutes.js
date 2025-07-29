const express=require('express');
const router=express.Router();
const {registerWorker}=require('../controllers/registerWorker');
const {loginWorker}=require('../controllers/loginWorker');
const workerModel = require("../model/workermodel");
router.get("/", function (req, res) {
  res.send("hey it's working");
});
const multer = require('multer');


// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {            
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post("/register", upload.single('profileImage'), registerWorker);
router.post("/edit", upload.single('profileImage'), async (req, res) => {
  try {
    const { email, name, phone, location } = req.body;
    const updatedData = {
      name,
      phone,
      location,
      profileImage: req.file ? `uploads/${req.file.filename}` : null,
    };
    const result = await workerModel.findOneAndUpdate({ email }, updatedData, { new: true });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "Profile updated successfully", user: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/login", loginWorker);
router.get('/data/:profession', async (req, res) => {
  try {
    const profession = req.params.profession;
    const workers = await workerModel.find({ tag: profession });
    if (!workers.length) {
      return res.status(404).json({ message: `No ${profession}s found` });
    }
    return res.json({ workers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
    }
});
router.get('/:id', async (req, res) => {
  try {
    const profession = req.params.id;
    const workers = await workerModel.findOne({ _id: profession });
    if (!workers) {
      return res.status(404).json({ message: `No user found` });
    }
    return res.json({ workers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
    }
    
});
router.get('/profile/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;
        const user = await workerModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user }); // send user object
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post('/rate/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const { rating } = req.body; // Expecting { rating: "4" } or { rating: 4 }

    if (!rating) {
      return res.status(400).json({ message: "Rating is required" });
    }

    // Push the new rating (as string) into the array
    const user = await workerModel.findOneAndUpdate(
      { email: userEmail },
      { $push: { rating: String(rating) } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;