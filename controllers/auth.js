const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Signup error!');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const name = req.body.name;
  const pass = req.body.password;

  bcrypt
    .hash(pass, 12)
    .then(password => {
      const user = new User({
        email,
        password,
        name,
        todolist: [],
      });
      return user.save();
    })
    .then(val => {
      res.status(201).json({ message: 'Signup success!', userId: val._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let userData;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        const error = new Error("User doesn't exist! Please signup first!");
        error.statusCode = 401;
        throw error;
      }
      userData = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isPasswordLegal => {
      if (!isPasswordLegal) {
        const error = new Error('Password Error!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: userData.email,
          userId: userData._id.toString(),
        },
        process.env.DB_JWT_SECRET,
        { expiresIn: '24h' }
      );
      res.status(200).json({ token });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
