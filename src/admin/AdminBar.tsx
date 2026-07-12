// 관리자 플로팅 바 — 로그인(토큰), 편집 모드 토글, 게시(커밋), 초안 관리.
import React, { useEffect, useRef, useState } from 'react';
import { C } from '../kit/tokens';
import { Icon } from '../kit/Icon';
import { useAdmin } from './AdminContext';
import { useContent } from '../content/store';
import { putTextFile, putBinaryFile, REPO, DEVICE_LOGIN_ENABLED, startDeviceFlow, pollDeviceToken, DeviceCode } from './github';
import { DocSection } from '../content/types';

const btn: React.CSSProperties = {
  border: 'none', cursor: 'pointer', borderRadius: 10, padding: '9px 14px',
  fontSize: 13, fontWeight: 700, fontFamily: C.font, letterSpacing: -0.2,
  display: 'inline-flex', alignItems: 'center', gap: 6,
};

/** data URL 이미지 블록을 저장소 업로드로 치환한 새 guide를 돌려준다. */
async function uploadPendingImages(token: string, guide: DocSection[]): Promise<DocSection[]> {
  const next: DocSection[] = JSON.parse(JSON.stringify(guide));
  let n = 0;
  for (const sec of next) {
    for (const page of sec.pages) {
      for (const b of page.blocks) {
        if (b.t === 'img' && b.src.startsWith('data:')) {
          const m = b.src.match(/^data:image\/(png|jpeg|jpg|gif|webp);base64,(.+)$/);
          if (!m) throw new Error('지원하지 않는 이미지 형식입니다. (png/jpg/gif/webp)');
          const ext = m[1] === 'jpeg' ? 'jpg' : m[1];
          const name = `uploads/${Date.now()}-${n++}.${ext}`;
          await putBinaryFile(token, `public/${name}`, m[2], `docs: 이미지 업로드 (${page.title})`);
          b.src = name;
        }
      }
    }
  }
  return next;
}

function LoginModal({ onClose }: { onClose: () => void }) {
  const { signIn } = useAdmin();
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  // Device Flow 상태
  const [device, setDevice] = useState<DeviceCode | null>(null);
  const [copied, setCopied] = useState(false);
  const pollRef = useRef<number | null>(null);
  // 토큰 직접 입력 (폴백)
  const [showToken, setShowToken] = useState(!DEVICE_LOGIN_ENABLED);
  const [t, setT] = useState('');

  const stopPolling = () => {
    if (pollRef.current !== null) {
      window.clearTimeout(pollRef.current);
      pollRef.current = null;
    }
  };
  useEffect(() => stopPolling, []);

  const startLogin = async () => {
    setErr(null);
    setBusy(true);
    try {
      const dc = await startDeviceFlow();
      setDevice(dc);
      setBusy(false);
      let interval = Math.max(dc.interval, 5);
      const tick = async () => {
        const r = await pollDeviceToken(dc.device_code);
        if (r.status === 'ok') {
          const e = await signIn(r.token);
          if (e) {
            setErr(e);
            setDevice(null);
          } else {
            onClose();
          }
          return;
        }
        if (r.status === 'error') {
          setErr(r.message);
          setDevice(null);
          return;
        }
        if (r.status === 'slow_down') interval += 5;
        pollRef.current = window.setTimeout(tick, interval * 1000);
      };
      pollRef.current = window.setTimeout(tick, interval * 1000);
    } catch (e) {
      setBusy(false);
      setErr(e instanceof Error ? e.message : '로그인 시작에 실패했습니다.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(34,34,34,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
      onClick={() => {
        stopPolling();
        onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: 22, padding: 28, width: 440, maxWidth: '100%', boxShadow: C.shadowCard }}
      >
        <div style={{ fontSize: 18, fontWeight: 800, color: C.text, letterSpacing: -0.4 }}>관리자 로그인</div>
        <p style={{ margin: '10px 0 18px', fontSize: 13.5, lineHeight: 1.65, color: C.sub, fontWeight: 500 }}>
          <code style={{ fontFamily: C.mono, fontSize: 12, background: C.blueSoft, color: C.blue, padding: '1px 6px', borderRadius: 5 }}>{REPO}</code>{' '}
          저장소에 쓰기 권한이 있는 GitHub 계정으로 로그인합니다. 인증 정보는 이 브라우저에만 저장됩니다.
        </p>

        {DEVICE_LOGIN_ENABLED && !device && (
          <button
            style={{
              ...btn, width: '100%', justifyContent: 'center', height: 50, fontSize: 15,
              background: C.text, color: '#fff', opacity: busy ? 0.6 : 1,
            }}
            disabled={busy}
            onClick={startLogin}
          >
            <Icon name="shield" size={18} color="#fff" sw={2} />
            {busy ? '준비 중…' : 'GitHub로 로그인'}
          </button>
        )}

        {device && (
          <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 16, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: C.sub, marginBottom: 10 }}>
              아래 코드를 GitHub 인증 페이지에 입력하세요
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(device.user_code);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1500);
              }}
              title="클릭해서 복사"
              style={{
                border: `1.5px dashed ${C.orangeSoft2}`, background: '#fff', cursor: 'pointer',
                borderRadius: 12, padding: '10px 18px', fontFamily: C.mono, fontSize: 24,
                fontWeight: 700, letterSpacing: 3, color: C.text,
              }}
            >
              {device.user_code}
            </button>
            <div style={{ fontSize: 11.5, color: copied ? C.green : C.ph, fontWeight: 600, marginTop: 7 }}>
              {copied ? '복사됨!' : '클릭하면 복사됩니다'}
            </div>
            <a
              href={device.verification_uri}
              target="_blank"
              rel="noreferrer"
              style={{
                ...btn, background: C.orange, color: '#fff', textDecoration: 'none',
                justifyContent: 'center', marginTop: 14, display: 'flex',
              }}
            >
              GitHub에서 코드 입력하기
            </a>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12 }}>
              <span
                style={{
                  width: 8, height: 8, borderRadius: 999, background: C.orange,
                  animation: 'comusPulse 1.2s ease-in-out infinite',
                }}
              />
              <span style={{ fontSize: 12, color: C.sub, fontWeight: 600 }}>인증 완료를 기다리는 중…</span>
            </div>
          </div>
        )}

        {err && <div style={{ marginTop: 12, fontSize: 12.5, color: '#D92D20', fontWeight: 600 }}>{err}</div>}

        {/* 토큰 직접 입력 (폴백) */}
        {!device && (
          <div style={{ marginTop: 16 }}>
            {DEVICE_LOGIN_ENABLED && (
              <button
                style={{
                  border: 'none', background: 'none', cursor: 'pointer', padding: 0,
                  fontSize: 12, fontWeight: 600, color: C.ph, fontFamily: C.font, textDecoration: 'underline',
                }}
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? '토큰 입력 숨기기' : '토큰으로 직접 로그인'}
              </button>
            )}
            {showToken && (
              <div style={{ marginTop: DEVICE_LOGIN_ENABLED ? 10 : 0 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="password"
                    value={t}
                    onChange={(e) => setT(e.target.value)}
                    placeholder="github_pat_… 또는 ghp_…"
                    style={{
                      flex: 1, height: 44, borderRadius: 12, border: `1px solid ${C.line}`, padding: '0 14px',
                      fontFamily: C.mono, fontSize: 13, outline: 'none', color: C.text,
                    }}
                  />
                  <button
                    style={{ ...btn, background: C.orange, color: '#fff', opacity: busy ? 0.6 : 1 }}
                    disabled={busy || !t.trim()}
                    onClick={async () => {
                      setBusy(true);
                      const e = await signIn(t);
                      setBusy(false);
                      if (e) setErr(e);
                      else onClose();
                    }}
                  >
                    로그인
                  </button>
                </div>
                <p style={{ margin: '10px 0 0', fontSize: 11.5, lineHeight: 1.6, color: C.ph, fontWeight: 500 }}>
                  <a
                    href="https://github.com/settings/tokens/new?scopes=repo&description=COMUS%20Docs%20Admin"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontWeight: 700 }}
                  >
                    토큰 만들기
                  </a>
                  {' '}— repo 권한이 미리 선택된 페이지가 열립니다. Generate 후 복사해 붙여넣으세요.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function AdminBar() {
  const { token, login, editMode, setEditMode, signOut } = useAdmin();
  const { guide, hasDraft, update, discardDraft } = useContent();
  const [modal, setModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const publish = async () => {
    if (!token) return;
    setBusy(true);
    setMsg(null);
    try {
      const resolved = await uploadPendingImages(token, guide);
      await putTextFile(token, 'src/content/guide-data.json', JSON.stringify(resolved, null, 2), 'docs: 가이드 콘텐츠 수정 (관리자 편집)');
      update(resolved);
      setMsg('게시 완료 — 배포까지 1~2분 걸립니다.');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : '게시에 실패했습니다.');
    }
    setBusy(false);
  };

  return (
    <>
      {modal && <LoginModal onClose={() => setModal(false)} />}
      <div
        style={{
          position: 'fixed', right: 18, bottom: 18, zIndex: 90,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8,
        }}
      >
        {msg && (
          <div
            style={{
              background: '#fff', border: `1px solid ${C.line}`, borderRadius: 12, padding: '10px 14px',
              fontSize: 12.5, fontWeight: 600, color: C.text, boxShadow: C.shadowSoft, maxWidth: 300,
            }}
          >
            {msg}
          </div>
        )}
        {!token ? (
          <button
            onClick={() => setModal(true)}
            title="관리자 로그인"
            style={{
              ...btn, background: '#fff', color: C.sub, border: `1px solid ${C.line}`,
              borderRadius: 999, boxShadow: C.shadowSoft, padding: '10px 16px',
            }}
          >
            <Icon name="shield" size={15} color={C.sub} sw={1.9} />
            관리자
          </button>
        ) : (
          <div
            style={{
              background: '#fff', border: `1px solid ${C.line}`, borderRadius: 16, padding: 10,
              display: 'flex', alignItems: 'center', gap: 8, boxShadow: C.shadowCard, flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: C.sub, padding: '0 4px', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Icon name="shield" size={14} color={C.green} sw={2} />
              {login ?? '관리자'}
            </span>
            <button
              style={{ ...btn, background: editMode ? C.orange : C.orangeSoft, color: editMode ? '#fff' : C.orange }}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? '편집 중' : '편집 모드'}
            </button>
            <button
              style={{ ...btn, background: hasDraft ? C.text : C.bg, color: hasDraft ? '#fff' : C.ph, opacity: busy ? 0.6 : 1 }}
              disabled={!hasDraft || busy}
              onClick={publish}
            >
              {busy ? '게시 중…' : '게시'}
            </button>
            {hasDraft && (
              <button
                style={{ ...btn, background: C.bg, color: C.sub }}
                onClick={() => {
                  if (confirm('로컬 초안을 버리고 게시된 버전으로 되돌릴까요?')) discardDraft();
                }}
              >
                되돌리기
              </button>
            )}
            <button style={{ ...btn, background: 'none', color: C.ph, padding: '9px 6px' }} onClick={signOut} title="로그아웃">
              <Icon name="x" size={14} color={C.ph} sw={2.2} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
