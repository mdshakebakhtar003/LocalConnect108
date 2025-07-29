const nodemailer = require('nodemailer');
const twilio = require('twilio');
const otpModel = require("../model/otpmodel");
// Twilio Setup
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send Email Function
async function sendEmailOTP(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`,
  });
}

// Send SMS Function
/*async function sendSMS(phone, otp) {
  await client.messages.create({
    body: `Your OTP is: ${otp}`,
    from: process.env.TWILIO_PHONE,
    to: phone,
  });
}*/

// Combined OTP Handler
exports.sendOTP = async (req, res) => {
  try {
    const {id,email} = req.params;

    const otp = generateOTP();

    await sendEmailOTP(email, otp);
   // await sendSMS(phone, otp);

    // Save OTP in DB or cache (e.g. Redis) with expiry (not shown here)
    const otpEntry = await otpModel.create({ bid: id, otp });
    if (!otpEntry) {
      return res.status(500).json({ message: 'Failed to save OTP.' });
    }   

    res.status(200).json({ message: 'OTP sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
};
