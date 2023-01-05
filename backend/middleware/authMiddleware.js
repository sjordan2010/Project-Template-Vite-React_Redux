const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Need to check if the user has a token in the headers, token will
  //start resemble 'Bearer ;alkdjf;lakdjf;alkdfj' where everything after Bearer
  //is the token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from the token, but we don't want the password for security
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
