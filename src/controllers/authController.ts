// Express - Biblioteca para criar o servidor
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const express = require('express');
const bcrypt = require('bcryptjs');
const jwtToken = require('../helpers/token');

const routes = express.Router();
const prisma = new PrismaClient();

// Route responsible to handle with the register of the user
routes.post('/register', async (req: Request, res: Response) => {
  const {
    name, email, password,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);

  try {
    if (await prisma.user.findFirst({ where: { email } })) {
      return res.status(400).send({ error: 'User already exists' });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });

    await prisma.cassino.create({
      data: {
        userId: user.id,
        coins: 20,
      },
    });

    user.password = 'undefined';
    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: 'Registration Failed' });
  }
});

// Route responsible to handle with the authentication of the user
routes.post('/authenticate', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send();
    }

    const user = await prisma.user.findFirst({
      where: { email },
      include: { Cassino: true },
    });

    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).send({ error: 'Invalid password' });
    }
    user.password = 'undefined';

    const userFormatted = {
      user: {
        name: user.name,
        email: user.email,
        coins: user.Cassino!.coins,
      },
      jwtToken,
    };

    const token: string = jwtToken(userFormatted);

    return res.send({ userFormatted, token });
  } catch (err) {
    return res.status(400).send({ error: 'Authenticate Failed' });
  }
});

module.exports = routes;
