// 디자인 시스템 문서 뼈대 — comus-ds-chrome.jsx 이식 (사이드바·섹션·스펙 카드)
import React from 'react';
import { C } from '../../kit/tokens';
import { Icon } from '../../kit/Icon';
import { LogoMark } from '../../kit/primitives';

export const DS_NAV = [
  { g: '시작', items: [
    { id: 'intro', label: '개요' },
    { id: 'principles', label: '디자인 원칙' },
  ] },
  { g: 'Foundations', items: [
    { id: 'color', label: '색상' },
    { id: 'type', label: '타이포그래피' },
    { id: 'space', label: '간격' },
    { id: 'radius', label: '모서리' },
    { id: 'shadow', label: '그림자' },
    { id: 'icon', label: '아이콘' },
  ] },
  { g: 'Components — 앱', items: [
    { id: 'c-badge', label: '배지' },
    { id: 'c-button', label: '버튼 / CTA' },
    { id: 'c-card', label: '카드' },
    { id: 'c-nav-app', label: '탭바 · 섹션헤더' },
  ] },
  { g: 'Components — 웹', items: [
    { id: 'c-topnav', label: '글로벌 내비' },
    { id: 'c-webcard', label: '상품 카드' },
    { id: 'c-footer', label: '푸터' },
  ] },
];

export function DsSidebar({ active }: { active: string }) {
  return (
    <aside className="ds-side">
      <a href="#intro" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 11, marginBottom: 26 }}>
        <LogoMark size={34} radius={11} iconSize={19} />
        <div style={{ lineHeight: 1.15 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text, letterSpacing: -0.2 }}>COMUS</div>
          <div style={{ fontSize: 11, color: C.sub, fontWeight: 600 }}>Design System</div>
        </div>
      </a>
      <nav>
        {DS_NAV.map((grp) => (
          <div key={grp.g} style={{ marginBottom: 18 }}>
            <div className="ds-side-grp">{grp.g}</div>
            {grp.items.map((it) => (
              <a key={it.id} href={'#' + it.id} className={'ds-side-link' + (active === it.id ? ' on' : '')}>
                {it.label}
              </a>
            ))}
          </div>
        ))}
      </nav>
      <div style={{ marginTop: 'auto', paddingTop: 20, fontSize: 11, color: C.ph, fontFamily: C.mono }}>v1.0 · 2026</div>
    </aside>
  );
}

export function Section({
  id, eyebrow, title, desc, children,
}: { id: string; eyebrow?: string; title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="ds-section">
      <header style={{ marginBottom: 28 }}>
        {eyebrow && (
          <div
            style={{
              fontFamily: C.mono, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase',
              color: C.orange, fontWeight: 700, marginBottom: 10,
            }}
          >
            {eyebrow}
          </div>
        )}
        <h2 style={{ margin: 0, fontSize: 34, fontWeight: 800, letterSpacing: -1, color: C.text }}>{title}</h2>
        {desc && (
          <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: 1.65, color: C.sub, maxWidth: 620, fontWeight: 500 }}>{desc}</p>
        )}
      </header>
      {children}
    </section>
  );
}

export function SubHead({ children, mt = 40 }: { children: React.ReactNode; mt?: number }) {
  return (
    <h3
      style={{
        margin: `${mt}px 0 16px`, fontSize: 15, fontWeight: 800, letterSpacing: -0.2,
        color: C.text, display: 'flex', alignItems: 'center', gap: 8,
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: 999, background: C.orange }} />
      {children}
    </h3>
  );
}

export function Stage({
  children, pad = 32, bg = C.bg, align = 'flex-start',
}: { children: React.ReactNode; pad?: number; bg?: string; align?: string }) {
  return (
    <div
      style={{
        background: bg, border: `1px solid ${C.line}`, borderRadius: 16,
        padding: pad, display: 'flex', flexWrap: 'wrap', gap: 20,
        alignItems: 'center', justifyContent: align as React.CSSProperties['justifyContent'],
      }}
    >
      {children}
    </div>
  );
}

export function Tok({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: C.mono, fontSize: 12, color: C.blue,
        background: C.blueSoft, padding: '2px 7px', borderRadius: 6,
        whiteSpace: 'nowrap', fontWeight: 600,
      }}
    >
      {children}
    </code>
  );
}

export function Spec({
  title, note, tokens = [], children, stageBg, pad, align,
}: {
  title?: string; note?: string; tokens?: string[]; children: React.ReactNode;
  stageBg?: string; pad?: number; align?: string;
}) {
  return (
    <div style={{ border: `1px solid ${C.line}`, borderRadius: 18, overflow: 'hidden', background: '#fff' }}>
      <Stage bg={stageBg} pad={pad} align={align}>{children}</Stage>
      {title || note || tokens.length ? (
        <div style={{ padding: '16px 18px', borderTop: `1px solid ${C.line}` }}>
          {title && <div style={{ fontSize: 14.5, fontWeight: 700, color: C.text }}>{title}</div>}
          {note && <div style={{ fontSize: 13.5, color: C.sub, marginTop: 4, lineHeight: 1.55 }}>{note}</div>}
          {tokens.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 11 }}>
              {tokens.map((t, i) => (
                <Tok key={i}>{t}</Tok>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
