import request from 'supertest';
import app from '../src/app'; // ודא שזה הנתיב הנכון לאובייקט ה-Express שלך

describe('User API', () => {

  function randomDigits(length: number) {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  }

  it('should register a new user', async () => {
    const id = randomDigits(9);
    const phone = '05' + randomDigits(8);
    const res = await request(app)
      .post(`/api/users/register?id=${id}&name=ישראל&phone=${phone}`);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id', id);
    expect(res.body).toHaveProperty('name', 'ישראל');
    expect(res.body).toHaveProperty('phone', phone);
  });

  it('should not register with invalid phone', async () => {
    const res = await request(app)
      .post('/api/users/register?id=123456789&name=ישראל&phone=123');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should login with valid id', async () => {
    // נניח שהמשתמש כבר קיים
    const res = await request(app)
      .post('/api/users/login?id=123456789');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
  });

  it('should not login with invalid id', async () => {
    const res = await request(app)
      .post('/api/users/login?id=000000000');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
