const AppError = require('../errors/AppError');
const config = require('../config');
const OpenAI = require('openai');

// Lazily create client so tests can stub env more easily
function getClient() {
    if (!config.openaiKey) {
        throw new AppError('OPENAI_API_KEY not configured', 500);
    }
    return new OpenAI({ apiKey: config.openaiKey, timeout: config.openaiTimeoutMs });
}

async function getRandomText() {
    try {
        const client = getClient();
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), config.openaiTimeoutMs);
        try {
            const response = await client.responses.create(
                {
                    model: config.openaiModel,
                    input: 'Return a single, whimsical one-sentence random message. Do not include explanations.',
                    temperature: config.openaiTemperature,
                },
                {
                    signal: controller.signal,
                }
            );
            const text = response?.output_text;
            if (!text || typeof text !== 'string') {
                throw new AppError('OpenAI empty response', 502);
            }
            return text;
        } finally {
            // best-effort cleanup of timer
            clearTimeout(timeout);
        }
    } catch (e) {
        if (e.name === 'AbortError') {
            throw new AppError('OpenAI timeout', 504);
        }
        if (e instanceof AppError) throw e;
        // Map OpenAI SDK errors to a gateway error
        const status = e?.status || e?.statusCode || 502;
        throw new AppError('OpenAI request failed', status, { error: e.message });
    }
}

module.exports = { getRandomText };
