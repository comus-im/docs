// COMUS 디자인 토큰 — 디자인 시스템 원본(tokens/*.css)과 동일한 값.
export const C = {
  orange: '#FE5C00',
  orangePress: '#E24F00',
  orangeSoft: '#FFF1E9',
  orangeSoft2: '#FFE5D6',
  blue: '#4E6274',
  blueSoft: '#EEF2F6',
  bg: '#F8F9FB',
  surface: '#FFFFFF',
  text: '#222222',
  sub: '#6B7280',
  line: '#EDF0F3',
  green: '#16A34A',
  greenSoft: '#E7F6EC',
  star: '#FFB020',
  ph: '#9AA5B1',
  font: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  mono: "ui-monospace, 'SF Mono', Menlo, monospace",
  glowOrange: '0 8px 20px rgba(254,92,0,0.28)',
  shadowSoft: '0 6px 14px rgba(34,34,34,0.06)',
  shadowCard: '0 18px 34px rgba(34,34,34,0.08)',
} as const;

// 12430000 → "12,430,000"
export const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
