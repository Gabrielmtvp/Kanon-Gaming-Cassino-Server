"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
module.exports = (req, res, next) => {
    try {
        // Getting headers
        const authHeader = req.headers.authorization;
        // Verifying if exists a header
        if (!authHeader)
            return res.status(401).send({ error: 'No token provided' });
        // Split token header to validate the both parts
        const parts = authHeader.split(' ');
        // Verifying if the String array has 2 parts
        if (parts.length < 2)
            return res.status(401).send({ error: 'Token error' });
        // Destructuring const parts
        const [scheme, token] = parts;
        // Verifying if the scheme has the same pattern that we expect
        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).send({ error: 'Token malformatted' });
        }
        // Finally, using jwt I'm verifying if the token is valid or not
        jwt.verify(token, authConfig.secret, (err) => {
            if (err)
                return res.status(401).send({ error: 'Token invalid' });
            return next();
        });
        return next();
    }
    catch (err) {
        return res.status(400).send({ error: 'Middleware Failed' });
    }
};
