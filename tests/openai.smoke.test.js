const request = require('supertest');
const app = require('../app');

const shouldRun = process.env.OPENAI_SMOKE_TEST === '1' && !!process.env.OPENAI_API_KEY;
console.log(process.env.OPENAI_SMOKE_TEST, process.env.OPENAI_API_KEY);

const maybeDescribe = shouldRun ? describe : describe.skip;

maybeDescribe('OpenAI smoke test (optional)', () => {
  it('GET /get-intro returns a non-empty output when real OpenAI is configured', async () => {
    const res = await request(app).get('/get-intro');
    expect(res.status).toBe(200);
    expect(typeof res.body.output).toBe('string');
    expect(res.body.output.length).toBeGreaterThan(0);
  }, 20000);
});
