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
describe('Prompt API', () => {
    let userId = '123456789';
    let categoryId;
    let subCategoryId;
    let promptId;
    let token;
    const adminId = '777777777';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // צור משתמש אדמין
        yield (0, supertest_1.default)(app_1.default)
            .post(`/api/users/register?id=${adminId}&name=admin&phone=0500000002`);
        const User = require('../src/models/User').default;
        yield User.update({ is_admin: true }, { where: { id: adminId } });
        const loginRes = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/users/login?id=${adminId}`);
        token = loginRes.body.token;
        // צור קטגוריה ותת-קטגוריה
        const catRes = yield (0, supertest_1.default)(app_1.default).post('/api/categories').set('Authorization', `Bearer ${token}`).send({ name: 'AI' });
        categoryId = catRes.body.id;
        const subCatRes = yield (0, supertest_1.default)(app_1.default).post('/api/subcategories').set('Authorization', `Bearer ${token}`).send({ name: 'צ׳אטבוטים', category_id: categoryId });
        subCategoryId = subCatRes.body.id;
        // צור משתמש רגיל
        yield (0, supertest_1.default)(app_1.default).post(`/api/users/register?id=${userId}&name=ישראל&phone=0501234567`);
    }));
    it('should create a new prompt', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/prompts')
            .set('Authorization', `Bearer ${token}`)
            .send({ user_id: userId, category_id: categoryId, sub_category_id: subCategoryId, prompt: 'מה זה GPT?' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('response');
        promptId = res.body.id;
    }));
    it('should get user prompts', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get(`/api/prompts/user/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
    it('should get all prompts (admin)', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/api/prompts/all').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
});
