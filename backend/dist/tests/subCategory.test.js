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
describe('SubCategory API', () => {
    let categoryId;
    let subCategoryId;
    let token;
    const adminId = '888888888';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // צור משתמש אדמין
        yield (0, supertest_1.default)(app_1.default)
            .post(`/api/users/register?id=${adminId}&name=admin&phone=0500000001`);
        const User = require('../src/models/User').default;
        yield User.update({ is_admin: true }, { where: { id: adminId } });
        const loginRes = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/users/login?id=${adminId}`);
        token = loginRes.body.token;
        // צור קטגוריה
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/categories')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'היסטוריה' });
        categoryId = res.body.id;
    }));
    it('should create a new subcategory', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/subcategories')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'ימי הביניים', category_id: categoryId });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name', 'ימי הביניים');
        subCategoryId = res.body.id;
    }));
    it('should get all subcategories for category', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get(`/api/subcategories/category/${categoryId}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
    it('should update subcategory', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/subcategories/${subCategoryId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'היסטוריה עתיקה', category_id: categoryId });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('name', 'היסטוריה עתיקה');
    }));
    it('should get subcategory by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get(`/api/subcategories/${subCategoryId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', subCategoryId);
    }));
    it('should delete subcategory', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/subcategories/${subCategoryId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
    }));
    it('should return 404 for deleted subcategory', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get(`/api/subcategories/${subCategoryId}`);
        expect(res.statusCode).toBe(404);
    }));
});
