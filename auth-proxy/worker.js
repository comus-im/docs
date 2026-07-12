// COMUS Docs — GitHub Device Flow 인증 프록시 (Cloudflare Worker)
//
// GitHub의 device flow 엔드포인트(github.com/login/*)는 CORS를 지원하지
// 않아 브라우저에서 직접 호출할 수 없다. 이 Worker는 그 두 엔드포인트만
// 그대로 중계하면서 CORS 헤더를 붙여준다. 토큰을 저장하거나 기록하지 않는다.
//
// 배포: dash.cloudflare.com → Workers → Create Worker(이름: comus-docs-auth)
//       → Edit code → 이 파일 내용 붙여넣기 → Deploy

const ALLOWED_ORIGINS = [
  'https://comus-im.github.io',
  'http://localhost:5173', // vite dev
  'http://localhost:4173', // vite preview
];

// comus-im 조직의 "COMUS Docs Admin" OAuth 앱만 중계한다.
const CLIENT_ID = 'Ov23liDT3zZIyt0xBSvp';

const TARGETS = {
  '/device/code': 'https://github.com/login/device/code',
  '/oauth/access_token': 'https://github.com/login/oauth/access_token',
};

export default {
  async fetch(request) {
    const origin = request.headers.get('Origin') || '';
    const allowed = ALLOWED_ORIGINS.includes(origin);
    const cors = {
      'Access-Control-Allow-Origin': allowed ? origin : 'null',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      Vary: 'Origin',
    };

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (!allowed) return new Response('forbidden origin', { status: 403 });

    const target = TARGETS[new URL(request.url).pathname];
    if (!target || request.method !== 'POST') return new Response('not found', { status: 404, headers: cors });

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('bad request', { status: 400, headers: cors });
    }
    if (body.client_id !== CLIENT_ID) return new Response('forbidden client', { status: 403, headers: cors });

    const gh = await fetch(target, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return new Response(await gh.text(), {
      status: gh.status,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  },
};
