const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function(req, res, next) {
  let token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'No token provided' });

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
