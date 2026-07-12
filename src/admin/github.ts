// GitHub Contents API 헬퍼 — 관리자 편집분을 저장소에 커밋한다.
// 인증: 관리자의 GitHub 토큰(fine-grained PAT, contents read/write).
// 토큰은 브라우저에만 저장되고 api.github.com 외로 전송되지 않는다.

export const REPO = 'comus-im/docs';
const API = `https://api.github.com/repos/${REPO}`;
export const BRANCH = 'main';

/** comus-im 조직 OAuth 앱의 Client ID (Device Flow 로그인용).
 *  비어 있으면 로그인 모달이 토큰 직접 입력 방식으로 동작한다. */
export const OAUTH_CLIENT_ID = '';

// ── GitHub Device Flow ───────────────────────────────────────
// 관리자는 토큰 발급 없이 "GitHub로 로그인" → 코드 입력만 하면 된다.
// github.com의 device flow 엔드포인트는 CORS를 지원한다.

export interface DeviceCode {
  device_code: string;
  user_code: string;
  verification_uri: string;
  interval: number;
  expires_in: number;
}

export async function startDeviceFlow(): Promise<DeviceCode> {
  const res = await fetch('https://github.com/login/device/code', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: OAUTH_CLIENT_ID, scope: 'repo' }),
  });
  if (!res.ok) throw new Error(`로그인 시작 실패 (${res.status})`);
  return res.json();
}

export type DevicePoll =
  | { status: 'ok'; token: string }
  | { status: 'pending' }
  | { status: 'slow_down' }
  | { status: 'error'; message: string };

export async function pollDeviceToken(deviceCode: string): Promise<DevicePoll> {
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: OAUTH_CLIENT_ID,
      device_code: deviceCode,
      grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (data.access_token) return { status: 'ok', token: data.access_token };
  if (data.error === 'authorization_pending') return { status: 'pending' };
  if (data.error === 'slow_down') return { status: 'slow_down' };
  if (data.error === 'expired_token') return { status: 'error', message: '코드가 만료됐습니다. 다시 시도해 주세요.' };
  if (data.error === 'access_denied') return { status: 'error', message: '로그인이 거부됐습니다.' };
  return { status: 'error', message: data.error_description ?? '로그인에 실패했습니다.' };
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

/** 토큰 검증: 저장소 push 권한이 있어야 관리자다. */
export async function validateToken(token: string): Promise<{ ok: boolean; login?: string; error?: string }> {
  try {
    const res = await fetch(API, { headers: headers(token) });
    if (!res.ok) return { ok: false, error: `저장소 접근 실패 (${res.status})` };
    const repo = await res.json();
    if (!repo.permissions?.push) return { ok: false, error: '이 토큰에는 저장소 쓰기 권한이 없습니다.' };
    const me = await fetch('https://api.github.com/user', { headers: headers(token) });
    const user = me.ok ? await me.json() : {};
    return { ok: true, login: user.login };
  } catch {
    return { ok: false, error: '네트워크 오류 — 다시 시도해 주세요.' };
  }
}

async function getSha(token: string, path: string): Promise<string | null> {
  const res = await fetch(`${API}/contents/${encodeURIComponent(path)}?ref=${BRANCH}`, { headers: headers(token) });
  if (!res.ok) return null;
  const data = await res.json();
  return data.sha ?? null;
}

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

/** 파일 커밋 (텍스트). 존재하면 갱신, 없으면 생성. */
export async function putTextFile(token: string, path: string, content: string, message: string): Promise<void> {
  const sha = await getSha(token, path);
  const res = await fetch(`${API}/contents/${encodeURIComponent(path)}`, {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content: utf8ToBase64(content), branch: BRANCH, ...(sha ? { sha } : {}) }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`커밋 실패 (${res.status}): ${err.message ?? path}`);
  }
}

/** 이미지 커밋 (base64 데이터 — data URL의 콤마 뒤 부분). */
export async function putBinaryFile(token: string, path: string, base64: string, message: string): Promise<void> {
  const sha = await getSha(token, path);
  const res = await fetch(`${API}/contents/${encodeURIComponent(path)}`, {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content: base64, branch: BRANCH, ...(sha ? { sha } : {}) }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`업로드 실패 (${res.status}): ${err.message ?? path}`);
  }
}
