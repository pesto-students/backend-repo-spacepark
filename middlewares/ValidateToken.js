const jwt = require('jsonwebtoken');

// Middleware function to validate JWT token and user authorization
function validateToken(req, res, next) {
  // Get token from request headers, query string, or request body
  const token = req.headers.authorization || req.query.token || req.body.token;
  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Validate token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    // Token is valid, store decoded payload in request object for later use
    req.user = decoded;
    // Check if user is authorized (example: user role check)
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Proceed to the next middleware/controller
    next();
  });
}

module.exports = validateToken;
