const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();

const User = require('../models/user');
const authController = require('../controllers/auth');

const PASS_LENGTH_LIMIT = 8;

router.post(
  '/signup',
  [
    body('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Please enter legal email')
      .custom(email => {
        return User.findOne({ email }).then(user => {
          if (user) {
            return Promise.reject('E-Mail already exists!');
          }
        });
      }),
    body('password').trim().isLength({ min: PASS_LENGTH_LIMIT }),
    body('name').trim().not().isEmpty(),
  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;
