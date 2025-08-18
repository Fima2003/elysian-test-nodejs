const request = require('supertest');
const app = require('../app');
const { errorHandler } = require('../src/middleware/errorHandler');
const AppError = require('../src/errors/AppError');

describe('404 and error handler behavior', () => {
  it('returns JSON 404 for unknown routes via notFound -> errorHandler', async () => {
    const res = await request(app).get('/definitely-not-a-route');
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('message', 'Not Found');
  });

  it('errorHandler maps AppError status and message', () => {
    const err = new AppError('teapot', 418, { reason: 'short and stout' });
    const req = {};
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };
    errorHandler(err, req, res, () => {});
    expect(status).toHaveBeenCalledWith(418);
    expect(json).toHaveBeenCalled();
    const body = json.mock.calls[0][0];
    expect(body.message).toBe('teapot');
  });

  it('errorHandler defaults to 500 on generic errors', () => {
    const err = new Error('boom');
    const req = {};
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };
    errorHandler(err, req, res, () => {});
    expect(status).toHaveBeenCalledWith(500);
    const body = json.mock.calls[0][0];
    expect(body.message).toBe('boom');
  });
});
