// Express - Biblioteca para criar o servidor
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import app from '../../index';

const express = require('express');
const bcrypt = require('bcryptjs');
const jwtToken = require('../helpers/token');

const routes = express.Router();
const prisma = new PrismaClient();

routes.get('/', (req: Request, res: Response) => res.send({ ok: 'true' }));

// Route responsible to handle with the register of the user
routes.post('/user/register', async (req: Request, res: Response) => {
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
routes.post('/user/authenticate', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log('1');
  try {
    if (!email || !password) {
      return res.status(400).send();
    }
    console.log('2');
    const user = await prisma.user.findFirst({
      where: { email },
      include: { Cassino: true },
    });
    console.log('3');
    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).send({ error: 'Invalid password' });
    }
    user.password = 'undefined';
    console.log('4');
    const userFormatted = {
      user: {
        name: user.name,
        email: user.email,
        coins: user.Cassino!.coins,
      },
      jwtToken,
    };
    console.log('antes token');
    const token: string = jwtToken(userFormatted);
    console.log('depois token');
    return res.send({ userFormatted, token });
  } catch (err) {
    return res.status(400).send({ error: 'Authenticate Failed' });
  }
});

module.exports = routes;
