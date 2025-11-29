import request from 'supertest';
import app from '../../App';

describe('Customers API', () => {
  it('GET /api/v1/customers responds 200', async () => {
    const res = await request(app).get('/api/v1/customers');
    expect(res.status).toBe(200);
  });
});
