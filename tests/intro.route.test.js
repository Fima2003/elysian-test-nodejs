const request = require('supertest');
jest.mock('../src/services/aiService', () => ({
  getRandomText: jest.fn().mockResolvedValue('random text')
}));

const app = require('../app');
const { getRandomText } = require('../src/services/aiService');

describe('GET /get-intro', () => {
  it('returns 200 and output from service', async () => {
    getRandomText.mockResolvedValueOnce('hello world');
    const res = await request(app).get('/get-intro');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ output: 'hello world' });
  });

  it('propagates service errors as structured JSON', async () => {
    getRandomText.mockRejectedValueOnce(Object.assign(new Error('fail'), { statusCode: 502 }));
    const res = await request(app).get('/get-intro');
    expect(res.status).toBe(502);
    expect(res.body).toHaveProperty('message');
  });
});
