"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authController = require('./controllers/authController');
const slotMachineController = require('./controllers/slotMachineController');
const app = (0, express_1.default)();
// Express will handle with json requests
app.use(express_1.default.json());
// Inserting cors configuration in my express app
app.use((0, cors_1.default)());
// Importing routes and inserting in my express app
app.use('/user', authController);
app.use('/slotMachine', slotMachineController);
// Configured port that the server will run
const port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
exports.default = app;
