// middlewares/validate.js
const { check } = require('express-validator');

exports.validateSignup = [
  check('email').isEmail().normalizeEmail(),
  check('username').isLength({ min: 3 }),
  check('password').isLength({ min: 6 })
];