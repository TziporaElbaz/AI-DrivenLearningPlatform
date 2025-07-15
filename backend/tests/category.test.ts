import request from 'supertest';
import app from '../src/app';

describe('Category API', () => {
  let categoryId: number;
  let token: string;
  const adminId = '999999999';

  beforeAll(async () => {
    // צור משתמש אדמין
    await request(app)
      .post(`/api/users/register?id=${adminId}&name=admin&phone=0500000000`);
    // עדכן אותו לאדמין ישירות במסד הנתונים (אם אין הרשמה כאדמין)
    const User = require('../src/models/User').default;
    await User.update({ is_admin: true }, { where: { id: adminId } });
    // התחברות וקבלת טוקן
    const loginRes = await request(app)
      .post(`/api/users/login?id=${adminId}`);
    token = loginRes.body.token;
  });

  function randomName() {
    return 'קטגוריה-' + Math.random().toString(36).substring(2, 8);
  }

  it('should create a new category', async () => {
    const name = randomName();
    const res = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({ name });
    console.log('Create category response:', res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', name);
    categoryId = res.body.id;
  });

  it('should get all categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });


  it('should update category', async () => {
    const res = await request(app)
      .put(`/api/categories/${categoryId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'פיזיקה' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'פיזיקה');
  });

  it('should delete category', async () => {
    const res = await request(app)
      .delete(`/api/categories/${categoryId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  it('should return 404 for deleted category', async () => {
    const res = await request(app).get(`/api/categories/${categoryId}`);
    expect(res.statusCode).toBe(404);
  });
});
