# BuildAI Claude Proxy (Cloudflare Worker)

Minimal Cloudflare Worker that proxies requests to Anthropic and adds CORS headers.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set the secret API key:

```bash
npx wrangler secret put ANTHROPIC_API_KEY
```

3. (Optional) Update allowed origin in `wrangler.toml`:

```toml
[vars]
ALLOWED_ORIGIN = "http://localhost:3000"
```

## Run locally

```bash
npm run dev
```

## Deploy

```bash
npm run deploy
```

## Request shape

Send a POST to the worker URL with the same body you’d send to Anthropic:

```json
{
  "model": "claude-3-5-sonnet-2024-10-22",
  "max_tokens": 3000,
  "temperature": 0.7,
  "messages": [{ "role": "user", "content": "Hello" }]
}
```
