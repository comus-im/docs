// 런타임 에러 시 흰 화면 대신 복구 안내를 보여주는 최상위 에러 바운더리.
import React from 'react';

interface State { hasError: boolean }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;
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
      </div>
    );
  }
}
