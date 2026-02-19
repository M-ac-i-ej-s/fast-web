export interface Env {
  ANTHROPIC_API_KEY: string
  ALLOWED_ORIGIN?: string
}

const DEFAULT_ORIGIN = '*'

function withCors (response: Response, origin: string) {
  const headers = new Headers(response.headers)
  headers.set('access-control-allow-origin', origin)
  headers.set('access-control-allow-methods', 'POST, OPTIONS')
  headers.set('access-control-allow-headers', 'content-type')
  headers.set('access-control-max-age', '86400')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export default {
  async fetch (request: Request, env: Env): Promise<Response> {
    const originHeader = request.headers.get('origin')
    const allowedOrigin = env.ALLOWED_ORIGIN || DEFAULT_ORIGIN
    const corsOrigin = allowedOrigin === '*' ? '*' : (originHeader || allowedOrigin)

    if (request.method === 'OPTIONS') {
      return withCors(new Response(null, { status: 204 }), corsOrigin)
    }

    if (request.method !== 'POST') {
      return withCors(new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'content-type': 'application/json' },
      }), corsOrigin)
    }

    if (!env.ANTHROPIC_API_KEY) {
      return withCors(new Response(JSON.stringify({ error: 'Missing ANTHROPIC_API_KEY' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      }), corsOrigin)
    }

    const body = await request.text()

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body,
    })

    const responseText = await response.text()
    return withCors(new Response(responseText, {
      status: response.status,
      headers: { 'content-type': 'application/json' },
    }), corsOrigin)
  },
}
