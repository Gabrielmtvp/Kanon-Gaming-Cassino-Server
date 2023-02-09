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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
// authController.ts Tests
describe('given a email and password', () => {
    test('Should respond with a json object contain user data', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/user/authenticate').send({
            email: 'gabriel@gmail.com',
            password: '123',
        });
        expect(response.body.user).toBeDefined();
    }));
    test('Should specify json in the content type header', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/user/register').send({
            name: 'Gabriel',
            email: 'gabrielmtvp@gmail.com',
            password: 'hash',
        });
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    }));
});
describe('when the username and password is missing', () => {
    test('Should respond with a status code 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/user/authenticate').send({
            email: 'email',
        });
        expect(response.statusCode).toBe(400);
    }));
});
// slotMachineController.ts Tests
describe('Requesting rolling the slot machine', () => {
    test('Should respond with a json object slots machine data', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/slotMachine');
        expect(response.type).toEqual('application/json');
    }));
});
