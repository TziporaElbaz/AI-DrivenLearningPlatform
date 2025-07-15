import request from 'supertest';
import app from '../src/app';

describe('SubCategory API', () => {
  let categoryId: number;
  let subCategoryId: number;
  let token: string;
  const adminId = '888888888';

  beforeAll(async () => {
    // צור משתמש אדמין
    await request(app)
      .post(`/api/users/register?id=${adminId}&name=admin&phone=0500000001`);
    const User = require('../src/models/User').default;
    await User.update({ is_admin: true }, { where: { id: adminId } });
    const loginRes = await request(app)
      .post(`/api/users/login?id=${adminId}`);
    token = loginRes.body.token;
    // צור קטגוריה
    const res = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'היסטוריה' });
    categoryId = res.body.id;
  });

  it('should create a new subcategory', async () => {
    const res = await request(app)
      .post('/api/subcategories')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'ימי הביניים', category_id: categoryId });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'ימי הביניים');
    subCategoryId = res.body.id;
  });

  it('should get all subcategories for category', async () => {
    const res = await request(app).get(`/api/subcategories/category/${categoryId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update subcategory', async () => {
    const res = await request(app)
      .put(`/api/subcategories/${subCategoryId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'היסטוריה עתיקה', category_id: categoryId });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'היסטוריה עתיקה');
  });

  it('should get subcategory by id', async () => {
    const res = await request(app).get(`/api/subcategories/${subCategoryId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', subCategoryId);
  });

  it('should delete subcategory', async () => {
    const res = await request(app)
      .delete(`/api/subcategories/${subCategoryId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  it('should return 404 for deleted subcategory', async () => {
    const res = await request(app).get(`/api/subcategories/${subCategoryId}`);
    expect(res.statusCode).toBe(404);
  });
});
