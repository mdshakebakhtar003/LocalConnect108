const userModel = require("../model/workermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.registerWorker = async (req, res) => {
    try {
        const { name, email, password,Experience,Hourly_rate,Job_done ,tag,location,phone } = req.body;
const profileImage = req.file ? `uploads/${req.file.filename}` : null;
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            Experience,
            Hourly_rate,
            Job_done,
            tag,
            location,
            phone,
            profileImage
        });

        // Generate token
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
//console.log("JWT_SECRET:", process.env.JWT_SECRET);
        return res.status(201).json({ token });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


