const jwt = require('jsonwebtoken');
const userModel = require('./model/usermodel');

const jwtAuthMiddleware = async (req, res, next) => {

  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Get the token part

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Fetch the user from DB
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // 4. Attach user to request
    req.user = user;

    // 5. Continue to next middleware/route
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = jwtAuthMiddleware;
