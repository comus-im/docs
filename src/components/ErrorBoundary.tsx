// 런타임 에러 복구 바운더리.
// 브라우저 번역·확장 프로그램이 DOM을 건드리면 라우트 전환 시 React 재조정이
// 실패할 수 있다. URL이 소스 오브 트루스이므로 onRecover(루트 재마운트)로
// 자동 복구하고, 짧은 시간 안에 반복 실패할 때만 안내 화면을 보여준다.
import React from 'react';

interface State { error: Error | null }

const RETRY_COOLDOWN_MS = 3000;
// 모듈 스코프에 두어 루트 재마운트 후에도 쿨다운이 유지되게 한다 (무한 복구 루프 방지).
let lastRecoverAt = 0;

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onRecover?: () => void },
  State
> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[COMUS] 렌더 에러:', error, info.componentStack);
    const now = Date.now();
    if (this.props.onRecover && now - lastRecoverAt > RETRY_COOLDOWN_MS) {
      lastRecoverAt = now;
      this.props.onRecover();
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24,
            background: 'var(--comus-bg)', textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--comus-text)' }}>
            페이지를 불러오지 못했습니다
          </div>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--comus-sub)', fontWeight: 500 }}>
            일시적인 오류일 수 있습니다. 새로고침하면 대부분 해결됩니다.
            <br />
            문제가 반복되면 브라우저의 자동 번역·확장 프로그램을 꺼보세요.
          </p>
          <button
            onClick={() => location.reload()}
            style={{
              border: 'none', cursor: 'pointer', background: 'var(--comus-orange)', color: '#fff',
              fontSize: 15, fontWeight: 700, padding: '12px 28px', borderRadius: 12,
              boxShadow: 'var(--comus-glow-orange)',
            }}
          >
            새로고침
          </button>
          <code
            style={{
              fontFamily: 'var(--comus-font-mono)', fontSize: 11, color: 'var(--comus-placeholder)',
              maxWidth: 560, wordBreak: 'break-all',
            }}
          >
            {String(this.state.error)}
          </code>
        </div>
      );
    }
    return this.props.children;
  }
}
