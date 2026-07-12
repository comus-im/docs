// GitHub Contents API 헬퍼 — 관리자 편집분을 저장소에 커밋한다.
// 인증: 관리자의 GitHub 토큰(fine-grained PAT, contents read/write).
// 토큰은 브라우저에만 저장되고 api.github.com 외로 전송되지 않는다.

export const REPO = 'comus-im/docs';
const API = `https://api.github.com/repos/${REPO}`;
export const BRANCH = 'main';

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
