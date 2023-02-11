import { Request, Response, NextFunction } from 'express';

const { verifyToken } = require('../helpers/jwtToken');

module.exports = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Getting headers
    const authHeader = req.headers.authorization;

    // Verifying if exists a header
    if (!authHeader) return res.status(401).send({ error: 'No token provided' });

    // Split token header to validate the both parts
    const parts = authHeader.split(' ');

    // Verifying if the String array has 2 parts
    if (parts.length < 2) return res.status(401).send({ error: 'Token error' });

    // Destructuring const parts
    const [scheme, token] = parts;

    // Verifying if the scheme has the same pattern that we expect
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send({ error: 'Token malformatted' });
    }

    // Finally, using jwt I'm verifying if the token is valid or not
    const isTokenInvalid = verifyToken(token);

    if (isTokenInvalid) {
      return res.status(401).send({ error: 'Token invalid' });
    }
    return next();
  } catch (err) {
    return res.status(400).send({ error: 'Middleware Failed' });
  }
};
