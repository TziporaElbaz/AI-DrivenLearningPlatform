import request from 'supertest';
import app from '../src/app';

describe('Prompt API', () => {
  let userId = '123456789';
  let categoryId: number;
  let subCategoryId: number;
  let promptId: number;
  let token: string;
  const adminId = '777777777';

  beforeAll(async () => {
    // צור משתמש אדמין
    await request(app)
      .post(`/api/users/register?id=${adminId}&name=admin&phone=0500000002`);
    const User = require('../src/models/User').default;
    await User.update({ is_admin: true }, { where: { id: adminId } });
    const loginRes = await request(app)
      .post(`/api/users/login?id=${adminId}`);
    token = loginRes.body.token;
    // צור קטגוריה ותת-קטגוריה
    const catRes = await request(app).post('/api/categories').set('Authorization', `Bearer ${token}`).send({ name: 'AI' });
    categoryId = catRes.body.id;
    const subCatRes = await request(app).post('/api/subcategories').set('Authorization', `Bearer ${token}`).send({ name: 'צ׳אטבוטים', category_id: categoryId });
    subCategoryId = subCatRes.body.id;
    // צור משתמש רגיל
    await request(app).post(`/api/users/register?id=${userId}&name=ישראל&phone=0501234567`);
  });

  it('should create a new prompt', async () => {
    const res = await request(app)
      .post('/api/prompts')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: userId, category_id: categoryId, sub_category_id: subCategoryId, prompt: 'מה זה GPT?' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('response');
    promptId = res.body.id;
  });

  it('should get user prompts', async () => {
    const res = await request(app).get(`/api/prompts/user/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get all prompts (admin)', async () => {
    const res = await request(app).get('/api/prompts/all').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
