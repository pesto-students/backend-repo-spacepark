// src/middleware/checkAction.js

const checkAction = (req, res, next) => {
    const { action } = req.query;
    if (action) {
      req.hasAction = true;
    } else {
      req.hasAction = false;
    }
  
    next();
  };
  
  module.exports = checkAction;
  