# Back Node (Elysian Interview Project)

## Overview
Express app structured with router -> controller -> service, centralized error handling, and tests. The `/get-intro` endpoint generates random text using the OpenAI SDK (Responses API) directly from this service.

## Structure
- `routes/` – Express routers
- `src/controllers/` – Route controllers
- `src/services/` – Business logic (calls OpenAI via SDK)
- `src/middleware/` – Error handling
- `src/errors/` – Custom error classes
- `tests/` – Jest tests

## Setup
1. Create `.env` in project root:
```
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
OPENAI_TEMPERATURE=0.9
OPENAI_TIMEOUT_MS=10000

PORT=3000
NODE_ENV=development
```
2. Install deps
```
npm install
```
3. Run
```
npm start
```

## Endpoint
- `GET /get-intro` – returns `{ "output": string }` generated via OpenAI Responses API.

## Testing
```
npm test
```