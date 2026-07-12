import React from 'react';
import { Link } from 'react-router-dom';
import { C } from '../kit/tokens';
import { LogoMark } from '../kit/primitives';

export function SiteFooter() {
  const cols: { h: string; items: { label: string; to: string }[] }[] = [
    {
      h: '문서',
      items: [
        { label: 'COMUS 소개', to: '/guide/intro/what-is-comus' },
        { label: '사용자 가이드', to: '/guide/users/getting-started' },
        { label: '입점 안내', to: '/guide/sellers/onboarding' },
        { label: '기관 등록', to: '/guide/orgs/registration' },
      ],
    },
    {
      h: '리소스',
      items: [
        { label: '디자인 시스템', to: '/design' },
        { label: '브랜드 스토리', to: '/brand' },
        { label: '투자자 정보', to: '/guide/investors/why-comus' },
        { label: '제휴 문의', to: '/guide/partners/process' },
      ],
    },
  ];
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, background: C.surface }}>
      <div
        style={{
          maxWidth: 1280, margin: '0 auto', padding: '48px 24px',
          display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <LogoMark size={32} radius={10} iconSize={18} />
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: 0.4, color: C.text }}>COMUS</span>
          </div>
          <p style={{ margin: '14px 0 0', fontSize: 14, lineHeight: 1.7, color: C.sub, maxWidth: 300, fontWeight: 500 }}>
            소비가 나눔이 되는 플랫폼. 구매하고, 포인트를 적립하고, 원하는 곳에 기부하세요.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
          {cols.map((col) => (
            <div key={col.h}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 14 }}>{col.h}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {col.items.map((it) => (
                  <Link key={it.label} to={it.to} style={{ textDecoration: 'none', fontSize: 14, color: C.sub, fontWeight: 500 }}>
                    {it.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          borderTop: `1px solid ${C.line}`, maxWidth: 1280, margin: '0 auto', padding: '20px 24px',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
        }}
      >
        <span style={{ fontSize: 12.5, color: C.ph, fontFamily: C.mono }}>© 2026 COMUS · Connecting Commerce with Community</span>
        <span style={{ fontSize: 12.5, color: C.ph }}>www.comus.im · talentmarket2420@gmail.com</span>
      </div>
    </footer>
  );
}
