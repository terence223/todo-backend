/* Check is login or not and record which user */
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authorization = req.get('Authorization');
  let decodedToken;
  const NOT_LOGIN_MSG = 'Not Login';

  if (!authorization) {
    const error = new Error(NOT_LOGIN_MSG);
    error.statusCode = 401;
    throw error;
  }

  const token = authorization.replace('Bearer ', '');

  try {
    decodedToken = jwt.verify(token, process.env.DB_JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error(NOT_LOGIN_MSG);
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
