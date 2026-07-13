import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/global.css';

const container = document.getElementById('root')!;

// 렌더 에러(주로 번역·확장 프로그램의 DOM 훼손) 발생 시 루트를 통째로
// 내리고 #root를 비운 뒤 현재 URL 기준으로 새로 마운트한다.
// 훼손된 DOM이 남지 않아 새로고침 없이 온전히 복구된다.
function mount() {
  const root = ReactDOM.createRoot(container);
  const recover = () => {
    try {
      root.unmount();
    } catch { /* 훼손된 DOM 제거 실패는 무시 — 아래에서 직접 비운다 */ }
    container.innerHTML = '';
    setTimeout(mount, 0);
  };
  root.render(
    <React.StrictMode>
      <ErrorBoundary onRecover={recover}>
        <BrowserRouter basename="/docs">
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>,
  );
}

mount();
