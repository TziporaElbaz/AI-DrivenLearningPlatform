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
const app_1 = __importDefault(require("../src/app"));
describe('Category API', () => {
    let categoryId;
    let token;
    const adminId = '999999999';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // צור משתמש אדמין
        yield (0, supertest_1.default)(app_1.default)
            .post(`/api/users/register?id=${adminId}&name=admin&phone=0500000000`);
        // עדכן אותו לאדמין ישירות במסד הנתונים (אם אין הרשמה כאדמין)
        const User = require('../src/models/User').default;
        yield User.update({ is_admin: true }, { where: { id: adminId } });
        // התחברות וקבלת טוקן
        const loginRes = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/users/login?id=${adminId}`);
        token = loginRes.body.token;
    }));
    function randomName() {
        return 'קטגוריה-' + Math.random().toString(36).substring(2, 8);
    }
    it('should create a new category', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = randomName();
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/categories')
            .set('Authorization', `Bearer ${token}`)
            .send({ name });
        console.log('Create category response:', res.body);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name', name);
        categoryId = res.body.id;
    }));
    it('should get all categories', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/api/categories');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
    it('should update category', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'פיזיקה' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('name', 'פיזיקה');
    }));
    it('should delete category', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
    }));
    it('should return 404 for deleted category', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get(`/api/categories/${categoryId}`);
        expect(res.statusCode).toBe(404);
    }));
});
