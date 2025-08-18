require('dotenv').config();

const cfg = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,

  openaiKey: process.env.OPENAI_API_KEY || '',
  openaiModel: process.env.OPENAI_MODEL || 'gpt-5-nano',
  openaiTemperature: Number.isNaN(parseFloat(process.env.OPENAI_TEMPERATURE)) ? 0.9 : parseFloat(process.env.OPENAI_TEMPERATURE),
  openaiTimeoutMs: Number.isNaN(parseInt(process.env.OPENAI_TIMEOUT_MS || '10000', 10)) ? 10000 : parseInt(process.env.OPENAI_TIMEOUT_MS || '10000', 10),
};

module.exports = cfg;
