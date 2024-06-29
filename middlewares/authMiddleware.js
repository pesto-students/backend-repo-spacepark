const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(process.env, "EEEEEEEEEEEEEEEEEEEEEEEE");
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
    next(error);
  }
};
