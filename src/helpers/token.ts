const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const generateToken = (user: {}): string => jwt.sign({ ...user }, authConfig.secret, {
  expiresIn: 86400,
});

module.exports = generateToken;
