const jwt = require('jsonwebtoken');

const secretKey = require('../config/key');

const generateToken = (user: {}): string =>
  jwt.sign({ ...user }, secretKey, {
    expiresIn: 86400,
  });

const verifyToken = (token: string): string =>
  jwt.verify(token, secretKey, (err: any) => err);

module.exports = { generateToken, verifyToken };
