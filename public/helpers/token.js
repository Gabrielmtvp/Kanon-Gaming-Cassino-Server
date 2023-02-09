"use strict";
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const generateToken = (user) => jwt.sign(Object.assign({}, user), authConfig.secret, {
    expiresIn: 86400,
});
module.exports = generateToken;
