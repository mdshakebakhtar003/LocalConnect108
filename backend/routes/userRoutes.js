const express = require("express");
const router = express.Router();
const jwtAuthMiddleware = require('../jwtuser');
const User = require('../model/usermodel'); // Assuming the user model is in the model directory
const { loginUser } = require('../controllers/loginUser');
const { registerUser } = require('../controllers/registerUser');
router.get("/", function (req, res) {
  res.send("hey it's working");
});

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/register', upload.single('profileImage'), registerUser);
router.post('/edit', upload.single('profileImage'), async (req, res) => {
  try {
    const userEmail = req.body.email;
    const updatedData = {
      name: req.body.name,
      phone: req.body.phone,
      location: req.body.location,
      profileImage:  req.file ? `uploads/${req.file.filename}` : null,
    };
    const user = await User.findOneAndUpdate({ email: userEmail }, updatedData, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
//router.post("/register", upload.single('profileImage'), registerUser);


//router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/profile/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user }); // send user object
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});




module.exports = router;