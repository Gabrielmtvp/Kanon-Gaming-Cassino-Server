"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express = require('express');
const bcrypt = require('bcryptjs');
const jwtToken = require('../helpers/token');
const routes = express.Router();
const prisma = new client_1.PrismaClient();
routes.get('/user', (req, res) => res.send({ ok: 'true' }));
// Route responsible to handle with the register of the user
routes.post('register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, } = req.body;
    const hash = yield bcrypt.hash(password, 10);
    try {
        if (yield prisma.user.findFirst({ where: { email } })) {
            return res.status(400).send({ error: 'User already exists' });
        }
        const user = yield prisma.user.create({
            data: {
                name,
                email,
                password: hash,
            },
        });
        yield prisma.cassino.create({
            data: {
                userId: user.id,
                coins: 20,
            },
        });
        user.password = 'undefined';
        return res.send({ user });
    }
    catch (err) {
        return res.status(400).send({ error: 'Registration Failed' });
    }
}));
// Route responsible to handle with the authentication of the user
routes.post('/authenticate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log('1');
    try {
        if (!email || !password) {
            return res.status(400).send();
        }
        console.log('2');
        const user = yield prisma.user.findFirst({
            where: { email },
            include: { Cassino: true },
        });
        console.log('3');
        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }
        if (!(yield bcrypt.compare(password, user.password))) {
            return res.status(400).send({ error: 'Invalid password' });
        }
        user.password = 'undefined';
        console.log('4');
        const userFormatted = {
            user: {
                name: user.name,
                email: user.email,
                coins: user.Cassino.coins,
            },
            jwtToken,
        };
        console.log('antes token');
        const token = jwtToken(userFormatted);
        console.log('depois token');
        return res.send({ userFormatted, token });
    }
    catch (err) {
        return res.status(400).send({ error: 'Authenticate Failed' });
    }
}));
module.exports = routes;
