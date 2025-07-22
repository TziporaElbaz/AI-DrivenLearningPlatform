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
const app_1 = __importDefault(require("../src/app")); // ודא שזה הנתיב הנכון לאובייקט ה-Express שלך
describe('User API', () => {
    function randomDigits(length) {
        return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
    }
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = randomDigits(9);
        const phone = '05' + randomDigits(8);
        const res = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/users/register?id=${id}&name=ישראל&phone=${phone}`);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id', id);
        expect(res.body).toHaveProperty('name', 'ישראל');
        expect(res.body).toHaveProperty('phone', phone);
    }));
    it('should not register with invalid phone', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/users/register?id=123456789&name=ישראל&phone=123');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    }));
    it('should login with valid id', () => __awaiter(void 0, void 0, void 0, function* () {
        // נניח שהמשתמש כבר קיים
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/users/login?id=123456789');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('user');
    }));
    it('should not login with invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/users/login?id=000000000');
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error');
    }));
});
