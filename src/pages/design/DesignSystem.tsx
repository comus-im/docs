// 디자인 시스템 페이지 — comus-ds.jsx 이식 (개요·원칙 + 전 섹션 조립 + 스크롤 스파이)
import React, { useEffect, useState } from 'react';
import { C } from '../../kit/tokens';
import { Icon, IconName } from '../../kit/Icon';
import { LogoMark } from '../../kit/primitives';
import { DsSidebar, Section, DS_NAV } from './chrome';
import { ColorSection, TypeSection, SpaceSection, RadiusSection, ShadowSection, IconSection } from './foundations';
import { BadgeSection, ButtonSection, CardSection, AppNavSection, TopNavSection, WebCardSection, FooterSection } from './components';

function Hero() {
  return (
    <section id="intro" className="ds-section" style={{ paddingTop: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
        <LogoMark size={56} radius={18} iconSize={30} />
        <div
          style={{
            fontFamily: C.mono, fontSize: 12.5, letterSpacing: 1.5, textTransform: 'uppercase',
            color: C.orange, fontWeight: 700,
          }}
        >
          Social Impact Commerce · v1.0
        </div>
      </div>
      <h1 style={{ margin: 0, fontSize: 56, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, color: C.text }}>
        COMUS
        <br />
        Design System
      </h1>
      <p style={{ margin: '20px 0 0', fontSize: 18, lineHeight: 1.65, color: C.sub, maxWidth: 600, fontWeight: 500 }}>
        소비가 나눔이 되는 플랫폼 COMUS의 앱·웹을 관통하는 단일 시각 언어입니다. 토큰(색·타이포·간격·모서리·그림자)부터 실제
        화면에서 쓰이는 라이브 컴포넌트까지 한 곳에 정리했습니다.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 26 }}>
        {['Pretendard', 'Orange #FE5C00', 'Blue-Gray #4E6274', '4px grid', 'Rounded'].map((t) => (
          <span
            key={t}
            style={{
              fontFamily: C.mono, fontSize: 12.5, color: C.blue, background: C.blueSoft,
              padding: '7px 12px', borderRadius: 999, fontWeight: 600,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

const DS_PRINCIPLES: { icon: IconName; t: string; d: string }[] = [
  { icon: 'gift', t: '나눔은 오렌지로만', d: '오렌지는 오직 기부·주요 행동·포인트에만 씁니다. 남발하지 않기에 눈에 띕니다.' },
  { icon: 'shield', t: '신뢰는 구조로', d: '블루그레이와 헤어라인, 인증 배지로 신뢰를 조용히 쌓습니다. 화려함 대신 정돈.' },
  { icon: 'spark', t: '따뜻하고 둥글게', d: '넉넉한 여백, 둥근 모서리, 부드러운 그림자. 착한 소비의 정서를 형태로 옮깁니다.' },
  { icon: 'check', t: '한글 우선', d: 'Pretendard, 음수 자간, keep-all 줄바꿈. 한국어가 가장 읽기 좋게 세팅합니다.' },
];

function Principles() {
  return (
    <Section id="principles" eyebrow="시작" title="디자인 원칙" desc="모든 결정은 이 네 가지에서 출발합니다.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
        {DS_PRINCIPLES.map((p) => (
          <div key={p.t} style={{ background: '#fff', border: `1px solid ${C.line}`, borderRadius: 18, padding: 24 }}>
            <div
              style={{
                width: 44, height: 44, borderRadius: 13, background: C.orangeSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              }}
            >
              <Icon name={p.icon} size={23} color={C.orange} sw={1.9} />
            </div>
            <div style={{ fontSize: 16.5, fontWeight: 800, color: C.text, letterSpacing: -0.3 }}>{p.t}</div>
            <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.6, color: C.sub, fontWeight: 500 }}>{p.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const DS_SECTION_IDS = [
  'intro', 'principles', 'color', 'type', 'space', 'radius', 'shadow', 'icon',
  'c-badge', 'c-button', 'c-card', 'c-nav-app', 'c-topnav', 'c-webcard', 'c-footer',
];

export function DesignSystem() {
  const [active, setActive] = useState('intro');
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    DS_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  const activeLabel = DS_NAV.flatMap((g) => g.items).find((it) => it.id === active)?.label ?? '';
  return (
    <div className="doc-shell">
      <button className="doc-mobile-toggle" onClick={() => setMenuOpen((v) => !v)}>
        <Icon name={menuOpen ? 'x' : 'menu'} size={17} color={C.text} sw={2} />
        {menuOpen ? '목차 닫기' : '목차 보기'}
        <span style={{ marginLeft: 'auto', color: C.sub, fontWeight: 600, fontSize: 12.5 }}>
          디자인 시스템 · {activeLabel}
        </span>
      </button>
      <DsSidebar active={active} open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      <main className="doc-main" style={{ maxWidth: 940 }}>
        <Hero />
        <Principles />
        <ColorSection />
        <TypeSection />
        <SpaceSection />
        <RadiusSection />
        <ShadowSection />
        <IconSection />
        <BadgeSection />
        <ButtonSection />
        <CardSection />
        <AppNavSection />
        <TopNavSection />
        <WebCardSection />
        <FooterSection />
        <footer
          style={{
            padding: '60px 0 0', color: C.ph, fontSize: 13, fontFamily: C.mono,
            borderTop: `1px solid ${C.line}`, marginTop: 40,
          }}
        >
          © 2026 COMUS Design System · 소비가 나눔이 되는 플랫폼
        </footer>
      </main>
    </div>
  );
}
