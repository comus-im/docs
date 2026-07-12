// Components 섹션 — comus-ds-components.jsx + comus-web-shared.jsx 이식 (앱 + 웹 라이브 스펙)
import React from 'react';
import { C } from '../../kit/tokens';
import { Icon } from '../../kit/Icon';
import {
  CTA, LogoMark, PointBadge, TabBar, TrustBadge, SectionHead, WebProductCard, Product,
} from '../../kit/primitives';
import { Section, Spec, Tok } from './chrome';

const DS_PROD: Product = {
  img: 'product', tone: 'warm', point: 120, seller: '착한농부 협동조합',
  name: '유기농 제철 과일 꾸러미 (주 1회 정기배송)', score: 4.9, count: 213, disc: 22, price: 18900,
};

// ── 웹 글로벌 내비 (프리뷰용, 링크 비활성) ───────────────────
function DemoTopNav({ active = '쇼핑' }: { active?: string }) {
  const links = ['홈', '쇼핑', '기부', '커뮤니티'];
  const stop = (e: React.MouseEvent) => e.preventDefault();
  return (
    <header
      style={{
        background: 'rgba(248,249,251,0.86)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${C.line}`,
      }}
    >
      <div className="cw-wrap" style={{ display: 'flex', alignItems: 'center', gap: 28, height: 72 }}>
        <a href="#" onClick={stop} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 9 }}>
          <LogoMark />
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 0.5, color: C.text }}>COMUS</span>
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map((k) => {
            const on = k === active;
            return (
              <a
                key={k}
                href="#"
                onClick={stop}
                style={{
                  textDecoration: 'none', padding: '8px 14px', borderRadius: 10,
                  fontSize: 15, fontWeight: on ? 700 : 600,
                  color: on ? C.orange : C.sub,
                  background: on ? C.orangeSoft : 'transparent',
                }}
              >
                {k}
              </a>
            );
          })}
        </nav>
        <div
          style={{
            flex: 1, maxWidth: 360, marginLeft: 'auto', height: 44,
            background: C.surface, border: `1px solid ${C.line}`, borderRadius: 12,
            display: 'flex', alignItems: 'center', gap: 9, padding: '0 14px',
          }}
        >
          <Icon name="search" size={19} color={C.ph} sw={1.9} />
          <span style={{ color: C.ph, fontSize: 14.5 }}>가치 있는 상품을 검색해보세요</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <PointBadge size="lg">2,140P</PointBadge>
          <span style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Icon name="bag" size={23} color={C.blue} sw={1.8} />
            <span
              style={{
                position: 'absolute', top: -5, right: -6, minWidth: 16, height: 16, padding: '0 4px',
                borderRadius: 999, background: C.orange, color: '#fff', fontSize: 10, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #F8F9FB',
              }}
            >
              2
            </span>
          </span>
          <span
            style={{
              width: 38, height: 38, borderRadius: 999, display: 'block',
              background: 'repeating-linear-gradient(135deg,#EAF0F5,#EAF0F5 9px,#DEE7EF 9px,#DEE7EF 18px)',
              border: `1px solid ${C.line}`,
            }}
          />
        </div>
      </div>
    </header>
  );
}

// ── 웹 푸터 (프리뷰용) ───────────────────────────────────────
function DemoFooter() {
  const stop = (e: React.MouseEvent) => e.preventDefault();
  const cols = [
    { h: '서비스', items: ['쇼핑', '기부', '커뮤니티', '임팩트 리포트'] },
    { h: '회사', items: ['소개', '인증 판매처', '제휴 문의', '채용'] },
    { h: '고객지원', items: ['공지사항', '자주 묻는 질문', '1:1 문의', '이용약관'] },
  ];
  return (
    <footer style={{ marginTop: 80, borderTop: `1px solid ${C.line}`, background: C.surface }}>
      <div className="cw-wrap" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32, padding: '48px 0' }}>
        <div>
          <a href="#" onClick={stop} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 9 }}>
            <LogoMark />
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 0.5, color: C.text }}>COMUS</span>
          </a>
          <p style={{ margin: '16px 0 0', fontSize: 14, lineHeight: 1.7, color: C.sub, maxWidth: 280, fontWeight: 500 }}>
            소비가 나눔이 되는 플랫폼. 구매하고, 포인트를 적립하고, 원하는 곳에 기부하세요.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.h}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 14 }}>{col.h}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {col.items.map((it) => (
                <a key={it} href="#" onClick={stop} style={{ textDecoration: 'none', fontSize: 14, color: C.sub, fontWeight: 500 }}>
                  {it}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        className="cw-wrap"
        style={{
          borderTop: `1px solid ${C.line}`, padding: '20px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 12.5, color: C.ph, fontFamily: C.mono }}>© 2026 COMUS · Social Impact Commerce</span>
        <span style={{ fontSize: 12.5, color: C.ph }}>대표 김영민 · 사업자등록번호 000-00-00000</span>
      </div>
    </footer>
  );
}

// ── 앱 · 배지 ────────────────────────────────────────────────
export function BadgeSection() {
  return (
    <Section
      id="c-badge"
      eyebrow="Components · 앱"
      title="배지"
      desc="포인트 배지(오렌지)는 '구매 = 기부'를 상시 상기시키는 핵심 시그널. 신뢰 배지(블루그레이)는 인증 판매처를 표시합니다."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        <Spec
          title="PointBadge — 기부 포인트"
          note="orangeSoft 배경 + 오렌지 텍스트, gift 아이콘. sm/lg 두 크기."
          tokens={['--comus-orange-soft', '--comus-orange', 'radius-pill']}
        >
          <PointBadge>구매 시 120P 기부</PointBadge>
          <PointBadge size="lg">2,140P</PointBadge>
        </Spec>
        <Spec title="TrustBadge — 인증 판매처" note="shield 아이콘 + 블루그레이. 배경 없이 라벨로만." tokens={['--comus-blue']}>
          <TrustBadge>착한농부 협동조합</TrustBadge>
        </Spec>
      </div>
    </Section>
  );
}

// ── 앱 · 버튼 ────────────────────────────────────────────────
export function ButtonSection() {
  return (
    <Section
      id="c-button"
      eyebrow="Components · 앱"
      title="버튼 / CTA"
      desc="주요 행동은 오렌지 풀와이드 CTA 하나로 통일. 높이 56px, radius 16px, 아래로 오렌지 글로우가 깔립니다. 아이콘은 선택."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        <Spec title="Primary CTA" note="화면 하단 고정 주요 행동." tokens={['--comus-orange', '--comus-glow-orange', 'radius-lg', 'h 56']}>
          <div style={{ width: 300 }}>
            <CTA icon="gift">결제하고 기부하기</CTA>
          </div>
        </Spec>
        <Spec title="Primary CTA — 아이콘 없이" tokens={['weight 700', 'fs-title 17']}>
          <div style={{ width: 300 }}>
            <CTA>장바구니 담기</CTA>
          </div>
        </Spec>
      </div>
    </Section>
  );
}

// ── 앱 · 카드 ────────────────────────────────────────────────
export function CardSection() {
  return (
    <Section
      id="c-card"
      eyebrow="Components · 앱"
      title="카드"
      desc="흰 표면 + 헤어라인 보더 + 20px radius. 이미지 위에 포인트 배지를 얹고, 판매처·평점·할인가 순으로 정보 위계를 잡습니다."
    >
      <Spec
        title="상품 카드"
        note="웹/앱 공통 상품 카드 구조. 이미지 상단 좌측 포인트 배지 오버레이."
        tokens={['--comus-surface', '--comus-line', 'radius-xl', 'shadow-card (hover)']}
        pad={28}
      >
        <div style={{ width: 300 }}>
          <WebProductCard p={DS_PROD} />
        </div>
      </Spec>
    </Section>
  );
}

// ── 앱 · 내비 (탭바 + 섹션헤더) ──────────────────────────────
export function AppNavSection() {
  return (
    <Section
      id="c-nav-app"
      eyebrow="Components · 앱"
      title="탭바 · 섹션 헤더"
      desc="5-탭 바텀 내비. 활성 탭은 오렌지 + fill, 비활성은 뉴트럴 그레이. 섹션 헤더는 좌측 800 타이틀 + 우측 '전체보기'."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        <Spec title="TabBar" note="블러 배경, 상단 헤어라인. 활성 오렌지." tokens={['--comus-orange', 'blur 12px', 'touch 44']} pad={0}>
          <div style={{ width: '100%' }}>
            <TabBar active="쇼핑" />
          </div>
        </Spec>
        <Spec title="SectionHead (앱)" note="fs-h3 800 + 전체보기 링크." tokens={['--comus-fs-h3', 'weight 800']}>
          <div style={{ width: 300 }}>
            <SectionHead title="인기 기부처" />
          </div>
        </Spec>
      </div>
    </Section>
  );
}

// ── 웹 · 글로벌 내비 ─────────────────────────────────────────
export function TopNavSection() {
  return (
    <Section
      id="c-topnav"
      eyebrow="Components · 웹"
      title="글로벌 내비게이션"
      desc="스티키 반투명 헤더 + 블러. 로고 · 탭 · 검색 · 포인트 · 장바구니 · 아바타. 활성 탭은 orangeSoft 알약 배경."
    >
      <div style={{ border: `1px solid ${C.line}`, borderRadius: 18, overflow: 'hidden', background: C.bg }}>
        <DemoTopNav active="쇼핑" />
        <div style={{ height: 40 }} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
        <Tok>sticky · blur 14px</Tok>
        <Tok>--comus-orange-soft</Tok>
        <Tok>web-wrap 1160</Tok>
      </div>
    </Section>
  );
}

// ── 웹 · 상품 카드 그리드 ────────────────────────────────────
export function WebCardSection() {
  const prods: Product[] = [
    { ...DS_PROD },
    { img: 'product', tone: 'cool', point: 80, seller: '리사이클 스튜디오', name: '업사이클 캔버스 에코백 · 자연염색', score: 4.8, count: 96, disc: 15, price: 24000 },
    { img: 'product', tone: 'neutral', point: 200, seller: '동행 소셜벤처', name: '공정무역 원두 드립백 30개입 선물세트', score: 5.0, count: 341, disc: 30, price: 32000 },
  ];
  return (
    <Section
      id="c-webcard"
      eyebrow="Components · 웹"
      title="상품 카드 (웹)"
      desc="hover 시 4px 부양 + shadow-card. 반응형 그리드에 배치. 카드 하단은 판매처 → 상품명 → 평점 → 할인·가격 위계."
    >
      <Spec note="hover 하면 카드가 살짝 떠오릅니다." pad={28} stageBg="#fff">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20, width: '100%' }}>
          {prods.map((p, i) => (
            <WebProductCard key={i} p={p} />
          ))}
        </div>
      </Spec>
    </Section>
  );
}

// ── 웹 · 푸터 ────────────────────────────────────────────────
export function FooterSection() {
  return (
    <Section
      id="c-footer"
      eyebrow="Components · 웹"
      title="푸터"
      desc="4-컬럼 링크 그룹 + 로고·소개 + 하단 저작권/사업자 정보. surface 배경에 상단 헤어라인."
    >
      <div style={{ border: `1px solid ${C.line}`, borderRadius: 18, overflow: 'hidden' }}>
        <div style={{ marginTop: -80 }}>
          <DemoFooter />
        </div>
      </div>
    </Section>
  );
}
