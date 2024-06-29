const jwt = require('jsonwebtoken');

// Middleware function to validate JWT token and user authorization
function validateToken(req, res, next) {
  console.log('Incoming Request:', req.method, req.path);

  // Get token from request headers, query string, or request body
  let token = req.headers.authorization || req.query.token || req.body.token;
console.log(token ,'Token ');
  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Extract Bearer token if it's present
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  // Validate token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {

    console.log(token, 'Token');
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Token is valid, store decoded payload in request object for later use
    req.user = decoded;

    // Check if user is authorized (example: user role check)
    // if (decoded.role !== 'admin') {
    //   return res.status(403).json({ error: 'Unauthorized' });
    // }

    // console.log('Decoded Payload:', decoded);
    
    // Proceed to the next middleware/controller
    next();
  });
}

module.exports = validateToken;
