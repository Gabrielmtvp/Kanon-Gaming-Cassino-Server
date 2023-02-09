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
const authMiddleware = require('../middlewares/auth');
const routes = express.Router();
const prisma = new client_1.PrismaClient();
routes.use(authMiddleware);
function getHandleFruit(fruits) {
    const randomOption = Math.floor(Math.random() * fruits.length);
    return fruits[randomOption];
}
routes.put('/decreaseCoins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, coins } = req.body;
    try {
        const userCassino = yield prisma.cassino.update({
            where: {
                userId: '32d7185d-d25c-4c7f-bcde-2df1842ccd19',
            },
            data: {
                coins: 15,
            },
        });
        return res.json(userCassino);
    }
    catch (err) {
        return res.status(400).send({ error: err });
    }
}));
routes.get('/', (req, res) => {
    const rell1 = ['🍒', '🍋', '🍎', '🍋', '🍌', '🍌', '🍋', '🍋'];
    const rell2 = ['🍋', '🍎', '🍋', '🍋', '🍒', '🍎', '🍌', '🍋'];
    const rell3 = ['🍋', '🍎', '🍋', '🍎', '🍒', '🍋', '🍌', '🍋'];
    let points = 0;
    const slot1 = getHandleFruit(rell1);
    const slot2 = getHandleFruit(rell2);
    const slot3 = getHandleFruit(rell3);
    if (slot1 === slot2 && slot2 === slot3) {
        if (slot1 === '🍒') {
            points = 50;
        }
        else if (slot1 === '🍎') {
            points = 20;
        }
        else if (slot1 === '🍌') {
            points = 15;
        }
        else {
            points = 3;
        }
    }
    else if (slot1 === slot2) {
        if (slot1 === '🍒') {
            points = 40;
        }
        else if (slot1 === '🍎') {
            points = 10;
        }
        else if (slot1 === '🍌') {
            points = 5;
        }
        else {
            points = 3;
        }
    }
    else if (slot2 === slot3) {
        if (slot2 === '🍒') {
            points = 40;
        }
        else if (slot2 === '🍎') {
            points = 10;
        }
        else if (slot2 === '🍌') {
            points = 5;
        }
        else {
            points = 3;
        }
    }
    const allSlots = {
        slot1,
        slot2,
        slot3,
        points,
        result: points > 0 ? 'WIN' : 'LOSE',
    };
    return res.send({ allSlots });
});
module.exports = routes;
