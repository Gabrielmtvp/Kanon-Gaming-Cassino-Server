"use strict";
const jwt = require('jsonwebtoken');
const authConfig = '383dd481b031715027fcb6094026dd54';
const generateToken = (user) => jwt.sign(Object.assign({}, user), authConfig, {
    expiresIn: 86400,
});
module.exports = generateToken;
