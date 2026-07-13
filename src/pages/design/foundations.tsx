// Foundations 섹션 — comus-ds-foundations.jsx 이식 (색·타이포·간격·모서리·그림자·아이콘)
import React from 'react';
import { C } from '../../kit/tokens';
import { Icon, IconName } from '../../kit/Icon';
import { Section, SubHead, Stage } from './chrome';

const INK = '#222222';

interface Color { name: string; hex: string; v: string; use: string; ink: string }

const DS_COLORS: Record<string, Color[]> = {
  brandOrange: [
    { name: 'Orange', hex: '#FE5C00', v: '--comus-orange', use: 'Primary · 모든 CTA', ink: '#fff' },
    { name: 'Orange Press', hex: '#E24F00', v: '--comus-orange-press', use: 'Pressed / hover', ink: '#fff' },
    { name: 'Orange Soft', hex: '#FFF1E9', v: '--comus-orange-soft', use: '포인트 배지 배경', ink: INK },
    { name: 'Orange Soft 2', hex: '#FFE5D6', v: '--comus-orange-soft-2', use: '강한 틴트 / 보더', ink: INK },
  ],
  brandBlue: [
    { name: 'Blue-Gray', hex: '#4E6274', v: '--comus-blue', use: '구조 텍스트 · 신뢰 · 보조', ink: '#fff' },
    { name: 'Blue Soft', hex: '#EEF2F6', v: '--comus-blue-soft', use: '틴트 표면', ink: INK },
  ],
  neutral: [
    { name: 'BG', hex: '#F8F9FB', v: '--comus-bg', use: '앱 / 페이지 배경', ink: INK },
    { name: 'Surface', hex: '#FFFFFF', v: '--comus-surface', use: '카드 · 시트 · 내비', ink: INK },
    { name: 'Text', hex: '#222222', v: '--comus-text', use: '기본 텍스트', ink: '#fff' },
    { name: 'Sub', hex: '#6B7280', v: '--comus-sub', use: '보조 텍스트', ink: '#fff' },
    { name: 'Placeholder', hex: '#9AA5B1', v: '--comus-placeholder', use: '플레이스홀더 / 비활성', ink: '#fff' },
    { name: 'Line', hex: '#EDF0F3', v: '--comus-line', use: '헤어라인 · 구분선', ink: INK },
  ],
  semantic: [
    { name: 'Success', hex: '#16A34A', v: '--comus-success', use: '완료 · 긍정', ink: '#fff' },
    { name: 'Success Soft', hex: '#E7F6EC', v: '--comus-success-soft', use: '완료 배경', ink: INK },
    { name: 'Star', hex: '#FFB020', v: '--comus-star', use: '평점 별', ink: '#fff' },
  ],
};

function Swatch({ c }: { c: Color }) {
  const border = ['#FFFFFF', '#F8F9FB'].includes(c.hex);
  return (
    <div style={{ width: 168 }}>
      <div
        style={{
          height: 96, borderRadius: 14, background: c.hex,
          border: border ? `1px solid ${C.line}` : 'none',
          display: 'flex', alignItems: 'flex-end', padding: 12,
        }}
      >
        <span style={{ fontFamily: C.mono, fontSize: 12, color: c.ink, fontWeight: 700 }}>{c.hex}</span>
      </div>
      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>{c.name}</div>
        <code style={{ fontFamily: C.mono, fontSize: 11, color: C.blue, display: 'block', marginTop: 3 }}>{c.v}</code>
        <div style={{ fontSize: 12, color: C.sub, marginTop: 5, lineHeight: 1.4 }}>{c.use}</div>
      </div>
    </div>
  );
}

export function ColorSection() {
  const grp = (label: string, arr: Color[]) => (
    <React.Fragment key={label}>
      <SubHead>{label}</SubHead>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22 }}>
        {arr.map((c) => (
          <Swatch key={c.v} c={c} />
        ))}
      </div>
    </React.Fragment>
  );
  return (
    <Section
      id="color"
      eyebrow="Foundations"
      title="색상"
      desc="따뜻한 오렌지(나눔·행동)와 차분한 블루그레이(신뢰·구조)가 두 축입니다. 오렌지는 오직 주요 행동과 포인트에만, 나머지는 중립 뉴트럴로 절제해 사용합니다."
    >
      {grp('Brand — Orange', DS_COLORS.brandOrange)}
      {grp('Brand — Blue-Gray', DS_COLORS.brandBlue)}
      {grp('Neutral', DS_COLORS.neutral)}
      {grp('Semantic', DS_COLORS.semantic)}
    </Section>
  );
}

const DS_TYPE = [
  { label: 'Hero', px: 44, w: 800, tr: -1, v: '--comus-fs-hero', sample: '소비가 나눔이 되다', use: '웹 히어로' },
  { label: 'H1', px: 32, w: 800, tr: -0.8, v: '--comus-fs-h1', sample: '가치 있는 소비', use: '페이지 타이틀' },
  { label: 'H2', px: 26, w: 800, tr: -0.7, v: '--comus-fs-h2', sample: '오늘의 추천 상품', use: '웹 섹션 헤더' },
  { label: 'H3', px: 18, w: 800, tr: -0.5, v: '--comus-fs-h3', sample: '인기 기부처', use: '앱 섹션 헤더' },
  { label: 'Title', px: 17, w: 700, tr: -0.3, v: '--comus-fs-title', sample: '결제하고 기부하기', use: 'CTA · 리스트 타이틀' },
  { label: 'Body', px: 15, w: 500, tr: -0.2, v: '--comus-fs-body', sample: '구매 금액의 일부가 포인트로 적립됩니다.', use: '본문' },
  { label: 'Sub', px: 13.5, w: 500, tr: -0.2, v: '--comus-fs-sub', sample: '2026년 7월 12일 · 인증 판매처', use: '보조 정보' },
  { label: 'Caption', px: 11.5, w: 600, tr: -0.2, v: '--comus-fs-caption', sample: '구매 시 120P 기부', use: '배지 · 캡션' },
];

export function TypeSection() {
  return (
    <Section
      id="type"
      eyebrow="Foundations"
      title="타이포그래피"
      desc="한글·라틴 모두 Pretendard 하나로 통일합니다. 헤딩은 800(ExtraBold), CTA·라벨은 700로 묵직하게. 한글 디스플레이는 음수 자간으로 조여주고 절대 단어 중간에서 줄바꿈하지 않습니다(word-break: keep-all)."
    >
      <div style={{ border: `1px solid ${C.line}`, borderRadius: 16, overflow: 'hidden' }}>
        {DS_TYPE.map((t, i) => (
          <div
            key={t.label}
            style={{
              display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 20, padding: '20px 22px',
              borderTop: i ? `1px solid ${C.line}` : 'none', background: '#fff',
            }}
          >
            <div style={{ width: 128, flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.text }}>{t.label}</div>
              <code style={{ fontFamily: C.mono, fontSize: 11, color: C.blue }}>
                {t.px}px · {t.w}
              </code>
              <div style={{ fontSize: 11.5, color: C.sub, marginTop: 3 }}>{t.use}</div>
            </div>
            <div
              style={{
                flex: '1 1 220px', minWidth: 0, fontSize: t.px, fontWeight: t.w, letterSpacing: t.tr,
                color: C.text, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}
            >
              {t.sample}
            </div>
          </div>
        ))}
      </div>
      <SubHead>Mono — 코드 · 타임스탬프 · ID</SubHead>
      <Stage>
        <span style={{ fontFamily: C.mono, fontSize: 15, color: C.text }}>ORD-2026-0712-8842 · 12,430,000P</span>
      </Stage>
    </Section>
  );
}

const DS_SPACE = [
  { v: '--comus-space-1', px: 4 }, { v: '--comus-space-2', px: 8 },
  { v: '--comus-space-3', px: 12 }, { v: '--comus-space-4', px: 16 },
  { v: '--comus-space-5', px: 20, tag: '앱 거터' }, { v: '--comus-space-6', px: 24 },
  { v: '--comus-space-8', px: 32 }, { v: '--comus-space-10', px: 40 },
  { v: '--comus-space-12', px: 48 }, { v: '--comus-space-16', px: 64 },
];

export function SpaceSection() {
  return (
    <Section
      id="space"
      eyebrow="Foundations"
      title="간격"
      desc="4px 기준 소프트 그리드. 모바일 페이지 거터는 20px, 카드 내부는 넉넉하게. 최소 터치 타깃은 44px입니다."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {DS_SPACE.map((s) => (
          <div key={s.v} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <code style={{ fontFamily: C.mono, fontSize: 12, color: C.blue, width: 150, flexShrink: 0 }}>{s.v}</code>
            <div style={{ height: 18, width: s.px, background: C.orange, borderRadius: 4, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: C.sub, fontWeight: 600 }}>
              {s.px}px{s.tag ? ` · ${s.tag}` : ''}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

const DS_RADIUS = [
  { v: '--comus-radius-sm', px: 8, use: '칩 · 소형 컨트롤' },
  { v: '--comus-radius-md', px: 12, use: '인풋 · 검색바' },
  { v: '--comus-radius-lg', px: 16, use: 'CTA · 앱 카드' },
  { v: '--comus-radius-xl', px: 20, use: '웹 상품 카드' },
  { v: '--comus-radius-2xl', px: 28, use: '대형 시트 · 패널' },
  { v: '--comus-radius-pill', px: 999, use: '배지 · 태그 · 아바타', pill: true },
];

export function RadiusSection() {
  return (
    <Section
      id="radius"
      eyebrow="Foundations"
      title="모서리"
      desc="친근하고 둥근 형태. 배지·CTA는 pill, 카드는 소프트 사각형, 아바타·로고 마크는 원형에 가깝게."
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22 }}>
        {DS_RADIUS.map((r) => (
          <div key={r.v} style={{ width: 150 }}>
            <div
              style={{
                height: 88, background: C.orangeSoft, border: `1.5px solid ${C.orangeSoft2}`,
                borderRadius: r.pill ? 999 : r.px,
              }}
            />
            <code style={{ fontFamily: C.mono, fontSize: 11, color: C.blue, display: 'block', marginTop: 10 }}>{r.v}</code>
            <div style={{ fontSize: 12.5, color: C.text, fontWeight: 700, marginTop: 3 }}>{r.pill ? '999px (pill)' : r.px + 'px'}</div>
            <div style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>{r.use}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const DS_SHADOW = [
  { v: '--comus-shadow-soft', css: '0 6px 14px rgba(34,34,34,0.06)', use: '은은한 부양', glow: false },
  { v: '--comus-shadow-card', css: '0 18px 34px rgba(34,34,34,0.08)', use: '웹 카드 hover 리프트', glow: false },
  { v: '--comus-shadow-sheet', css: '0 -8px 30px rgba(34,34,34,0.10)', use: '바텀 시트', glow: false },
  { v: '--comus-glow-orange', css: '0 8px 20px rgba(254,92,0,0.28)', use: '주요 CTA 글로우', glow: true },
];

export function ShadowSection() {
  return (
    <Section
      id="shadow"
      eyebrow="Foundations"
      title="그림자"
      desc="부드럽고 낮게 퍼지는 중립 그림자. 카드는 기본적으로 헤어라인 보더에 의존하고 hover에서만 살짝 뜹니다. 유일한 시그니처는 주요 CTA 아래 오렌지 글로우."
    >
      <Stage pad={40} align="center" bg="#fff">
        {DS_SHADOW.map((s) => (
          <div key={s.v} style={{ width: 200 }}>
            <div
              style={{
                height: 84, borderRadius: 16, background: s.glow ? C.orange : '#fff',
                boxShadow: s.css, border: s.glow ? 'none' : `1px solid ${C.line}`,
              }}
            />
            <code style={{ fontFamily: C.mono, fontSize: 11, color: C.blue, display: 'block', marginTop: 14 }}>{s.v}</code>
            <div style={{ fontSize: 12, color: C.sub, marginTop: 3 }}>{s.use}</div>
          </div>
        ))}
      </Stage>
    </Section>
  );
}

const DS_ICONS: IconName[] = [
  'home', 'bag', 'gift', 'chat', 'user', 'search', 'star', 'heart', 'bell', 'shield',
  'check', 'plus', 'x', 'chevL', 'chevR', 'arrowR', 'share', 'download', 'link', 'eye', 'clock', 'calendar',
  'spark', 'fire', 'leaf', 'sprout', 'paw', 'book', 'elder', 'people', 'walk', 'game', 'coin', 'megaphone',
  'play', 'repeat', 'trophy', 'crown', 'medal',
];

export function IconSection() {
  return (
    <Section
      id="icon"
      eyebrow="Foundations"
      title="아이콘"
      desc="단일 패스, 둥근 스트로크(strokeLinecap/Linejoin round)로 통일된 라인 아이콘 세트. 기본 stroke-width 1.8, 24px 그리드. 활성 상태에선 fill='current'로 채웁니다."
    >
      <div
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 2,
          border: `1px solid ${C.line}`, borderRadius: 16, overflow: 'hidden', background: C.line,
        }}
      >
        {DS_ICONS.map((n) => (
          <div
            key={n}
            style={{
              background: '#fff', padding: '18px 8px 12px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 9,
            }}
          >
            <Icon name={n} size={24} color={C.text} sw={1.8} />
            <code style={{ fontFamily: C.mono, fontSize: 10.5, color: C.sub }}>{n}</code>
          </div>
        ))}
      </div>
    </Section>
  );
}
