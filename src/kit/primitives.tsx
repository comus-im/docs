// COMUS 공유 프리미티브 — comus-kit.jsx 이식 (배지, CTA, 탭바, 플레이스홀더 등)
import React from 'react';
import { C, fmt } from './tokens';
import { Icon, IconName } from './Icon';

// ── 로고 마크 (오렌지 타일 + gift) ──────────────────────────
export function LogoMark({ size = 36, radius = 11, iconSize = 21 }: { size?: number; radius?: number; iconSize?: number }) {
  return (
    <div
      style={{
        width: size, height: size, borderRadius: radius, background: C.orange,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 14px rgba(254,92,0,0.28)', flexShrink: 0,
      }}
    >
      <Icon name="gift" size={iconSize} color="#fff" sw={1.9} />
    </div>
  );
}

// ── 스트라이프 이미지 플레이스홀더 ───────────────────────────
export function Ph({
  label, h = 120, r = 16, tone = 'neutral', style = {},
}: { label: string; h?: number; r?: number; tone?: 'neutral' | 'warm' | 'cool'; style?: React.CSSProperties }) {
  const tones = {
    neutral: ['#EEF1F4', '#E5EAEF'],
    warm: ['#FFEFE6', '#FFE2D2'],
    cool: ['#EAF0F5', '#DEE7EF'],
  };
  const [a, b] = tones[tone] || tones.neutral;
  return (
    <div
      style={{
        position: 'relative', height: h, borderRadius: r, overflow: 'hidden',
        background: `repeating-linear-gradient(135deg, ${a}, ${a} 9px, ${b} 9px, ${b} 18px)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
      }}
    >
      <span
        style={{
          fontFamily: C.mono, fontSize: 10.5, color: C.ph,
          letterSpacing: 0.2, background: 'rgba(255,255,255,0.72)',
          padding: '3px 7px', borderRadius: 5,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ── 기부 포인트 배지 (오렌지) ────────────────────────────────
export function PointBadge({ children, size = 'sm' }: { children: React.ReactNode; size?: 'sm' | 'lg' }) {
  const big = size === 'lg';
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        background: C.orangeSoft, color: C.orange,
        fontWeight: 700, fontSize: big ? 13 : 11.5, lineHeight: 1,
        padding: big ? '7px 11px' : '5px 8px', borderRadius: 999,
        letterSpacing: -0.2, whiteSpace: 'nowrap',
      }}
    >
      <Icon name="gift" size={big ? 15 : 13} color={C.orange} sw={1.9} />
      {children}
    </span>
  );
}

// ── 판매처 신뢰 배지 (블루그레이) ────────────────────────────
export function TrustBadge({ children = '인증 판매처' }: { children?: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 3,
        color: C.blue, fontWeight: 600, fontSize: 11, letterSpacing: -0.2,
      }}
    >
      <Icon name="shield" size={13} color={C.blue} sw={1.7} />
      {children}
    </span>
  );
}

// ── 주요 CTA 버튼 (오렌지) ───────────────────────────────────
export function CTA({ children, icon, style = {} }: { children: React.ReactNode; icon?: IconName; style?: React.CSSProperties }) {
  return (
    <button
      style={{
        width: '100%', border: 'none', cursor: 'pointer',
        background: C.orange, color: '#fff',
        fontFamily: C.font, fontWeight: 700, fontSize: 17, letterSpacing: -0.3,
        height: 56, borderRadius: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        whiteSpace: 'nowrap',
        boxShadow: '0 8px 20px rgba(254,92,0,0.28)', ...style,
      }}
    >
      {icon && <Icon name={icon} size={20} color="#fff" sw={2} />}
      {children}
    </button>
  );
}

// ── 앱 바텀 탭바 ─────────────────────────────────────────────
export function TabBar({ active = '홈' }: { active?: string }) {
  const items: { k: string; icon: IconName }[] = [
    { k: '홈', icon: 'home' },
    { k: '쇼핑', icon: 'bag' },
    { k: '기부', icon: 'gift' },
    { k: '커뮤니티', icon: 'chat' },
    { k: '마이', icon: 'user' },
  ];
  return (
    <div
      style={{
        flexShrink: 0, background: 'rgba(255,255,255,0.94)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderTop: `1px solid ${C.line}`,
        padding: '9px 8px 26px', display: 'flex',
      }}
    >
      {items.map((it) => {
        const on = it.k === active;
        const col = on ? C.orange : '#AEB6C0';
        return (
          <div key={it.k} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Icon name={it.icon} size={25} color={col} sw={on ? 2 : 1.8} fill={on ? 'current' : 'none'} />
            <span style={{ fontFamily: C.font, fontSize: 10.5, fontWeight: on ? 700 : 500, color: col, letterSpacing: -0.3 }}>
              {it.k}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── 앱 섹션 헤더 ─────────────────────────────────────────────
export function SectionHead({ title, action = '전체보기' }: { title: string; action?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 0 12px' }}>
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, letterSpacing: -0.5, color: C.text, whiteSpace: 'nowrap' }}>
        {title}
      </h3>
      {action && (
        <button
          style={{
            border: 'none', background: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'nowrap',
            color: C.sub, fontFamily: C.font, fontSize: 13, fontWeight: 600,
          }}
        >
          {action}
          <Icon name="chevR" size={15} color={C.sub} sw={2} />
        </button>
      )}
    </div>
  );
}

// ── 상품 카드 (웹) — comus-web-shared.jsx 이식 ───────────────
export interface Product {
  img: string;
  tone: 'neutral' | 'warm' | 'cool';
  point: number;
  seller: string;
  name: string;
  score: number;
  count: number;
  disc: number;
  price: number;
}

export function WebProductCard({ p }: { p: Product }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      style={{
        textDecoration: 'none', display: 'block',
        background: C.surface, borderRadius: 20, overflow: 'hidden',
        border: `1px solid ${C.line}`, transition: 'transform .18s ease, box-shadow .18s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 18px 34px rgba(34,34,34,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ position: 'relative' }}>
        <Ph label={p.img} tone={p.tone} h={186} r={0} />
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <PointBadge>구매 시 {p.point}P 기부</PointBadge>
        </div>
      </div>
      <div style={{ padding: '15px 16px 17px' }}>
        <TrustBadge>{p.seller}</TrustBadge>
        <div
          style={{
            margin: '8px 0 9px', fontSize: 15.5, fontWeight: 600, lineHeight: 1.4,
            color: C.text, letterSpacing: -0.3, height: 44, overflow: 'hidden',
          }}
        >
          {p.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Icon name="star" size={14} color={C.star} fill="current" sw={0} />
          <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{p.score}</span>
          <span style={{ fontSize: 13, color: C.sub }}>({p.count})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 9 }}>
          <span style={{ color: C.orange, fontWeight: 800, fontSize: 17 }}>{p.disc}%</span>
          <span style={{ fontWeight: 800, fontSize: 18, color: C.text }}>{fmt(p.price)}원</span>
        </div>
      </div>
    </a>
  );
}
