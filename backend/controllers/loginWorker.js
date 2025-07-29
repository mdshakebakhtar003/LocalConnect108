const workerModel = require("../model/workermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.loginWorker = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Await and use filter object
        let user = await workerModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Worker not found" });
        }
        // Compare password
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(500).json({ message: "Error comparing passwords" });
            }
            if (result) {
                const token = jwt.sign(
                    { id: user._id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );
                return res.status(200).json({ token });
            } else {
                return res.status(401).json({ message: "Email or Password incorrect" });
            }
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};