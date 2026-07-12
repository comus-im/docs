// 가이드 문서 블록 렌더러 — content 데이터(Block[])를 COMUS 스타일로 그린다.
import React from 'react';
import { C } from '../kit/tokens';
import { Icon } from '../kit/Icon';
import { Ph } from '../kit/primitives';
import { Block } from '../content/types';

const TONES = {
  orange: { bg: C.orangeSoft, border: C.orangeSoft2, accent: C.orange },
  blue: { bg: C.blueSoft, border: '#DDE6EE', accent: C.blue },
  green: { bg: C.greenSoft, border: '#D3EDDC', accent: C.green },
} as const;

export function DocBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <BlockView key={i} b={b} />
      ))}
    </>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case 'p':
      return <p style={{ margin: '0 0 20px', fontSize: 15.5, lineHeight: 1.75, color: '#3d434c', fontWeight: 500 }}>{b.text}</p>;

    case 'h2':
      return (
        <h2
          style={{
            margin: '40px 0 16px', fontSize: 22, fontWeight: 800, letterSpacing: -0.6, color: C.text,
            display: 'flex', alignItems: 'center', gap: 9,
          }}
        >
          <span style={{ width: 5, height: 22, borderRadius: 3, background: C.orange, flexShrink: 0 }} />
          {b.text}
        </h2>
      );

    case 'callout': {
      const tone = TONES[b.tone ?? 'orange'];
      return (
        <div
          style={{
            background: tone.bg, border: `1px solid ${tone.border}`, borderRadius: 18,
            padding: '20px 22px', margin: '0 0 24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: b.body || b.items ? 9 : 0 }}>
            {b.icon && <Icon name={b.icon} size={18} color={tone.accent} sw={1.9} />}
            <span style={{ fontSize: 15, fontWeight: 800, color: C.text, letterSpacing: -0.3 }}>{b.title}</span>
          </div>
          {b.body && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: '#4a5058', fontWeight: 500 }}>{b.body}</p>}
          {b.items && (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
              {b.items.map((it, i) => (
                <li key={i} style={{ display: 'flex', gap: 8, fontSize: 14, lineHeight: 1.6, color: '#4a5058', fontWeight: 500 }}>
                  <span style={{ paddingTop: 3 }}>
                    <Icon name="check" size={14} color={tone.accent} sw={2.2} />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    case 'steps':
      return (
        <ol style={{ margin: '0 0 24px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
          {b.items.map((s, i) => (
            <li key={i} style={{ display: 'flex', gap: 16, position: 'relative', paddingBottom: i === b.items.length - 1 ? 0 : 22 }}>
              {i !== b.items.length - 1 && (
                <span style={{ position: 'absolute', left: 15, top: 34, bottom: 0, width: 2, background: C.orangeSoft2 }} />
              )}
              <span
                style={{
                  width: 32, height: 32, borderRadius: 999, background: C.orangeSoft, color: C.orange,
                  fontSize: 13.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, zIndex: 1, border: `1.5px solid ${C.orangeSoft2}`,
                }}
              >
                {i + 1}
              </span>
              <div style={{ paddingTop: 4 }}>
                <div style={{ fontSize: 15.5, fontWeight: 800, color: C.text, letterSpacing: -0.3 }}>{s.title}</div>
                <p style={{ margin: '5px 0 0', fontSize: 14, lineHeight: 1.65, color: C.sub, fontWeight: 500 }}>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      );

    case 'cards':
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${b.cols === 3 ? 180 : 220}px, 1fr))`,
            gap: 14, margin: '0 0 24px',
          }}
        >
          {b.items.map((c, i) => (
            <div key={i} style={{ background: '#fff', border: `1px solid ${C.line}`, borderRadius: 18, padding: 20 }}>
              <div
                style={{
                  width: 40, height: 40, borderRadius: 12, background: C.orangeSoft,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
                }}
              >
                <Icon name={c.icon} size={21} color={C.orange} sw={1.9} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.text, letterSpacing: -0.3 }}>{c.title}</div>
              <p style={{ margin: '7px 0 0', fontSize: 13.5, lineHeight: 1.6, color: C.sub, fontWeight: 500 }}>{c.body}</p>
            </div>
          ))}
        </div>
      );

    case 'flow':
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, margin: '0 0 24px' }}>
          {b.items.map((f, i) => (
            <React.Fragment key={i}>
              <div
                style={{
                  background: '#fff', border: `1px solid ${C.line}`, borderRadius: 14,
                  padding: '12px 16px', textAlign: 'center', minWidth: 90,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 800, color: C.text, letterSpacing: -0.3 }}>{f.label}</div>
                {f.sub && <div style={{ fontSize: 11.5, color: C.sub, marginTop: 3, fontWeight: 600 }}>{f.sub}</div>}
              </div>
              {i !== b.items.length - 1 && <Icon name="arrowR" size={17} color={C.orange} sw={2} />}
            </React.Fragment>
          ))}
        </div>
      );

    case 'table':
      return (
        <div style={{ overflowX: 'auto', margin: '0 0 24px', border: `1px solid ${C.line}`, borderRadius: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, background: '#fff' }}>
            <thead>
              <tr>
                {b.head.map((h, i) => (
                  <th
                    key={i}
                    style={{
                      textAlign: 'left', padding: '12px 16px', background: C.bg,
                      color: C.sub, fontWeight: 700, fontSize: 12.5, letterSpacing: -0.2,
                      borderBottom: `1px solid ${C.line}`, whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: '13px 16px', color: ci === 0 ? C.text : '#4a5058',
                        fontWeight: ci === 0 ? 700 : 500, lineHeight: 1.55,
                        borderBottom: ri === b.rows.length - 1 ? 'none' : `1px solid ${C.line}`,
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'quote':
      return (
        <blockquote
          style={{
            margin: '0 0 24px', padding: '22px 26px', background: '#fff',
            borderLeft: `4px solid ${C.orange}`, borderRadius: '4px 18px 18px 4px',
            border: `1px solid ${C.line}`, borderLeftWidth: 4, borderLeftColor: C.orange,
          }}
        >
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: C.text, fontWeight: 700, letterSpacing: -0.3 }}>{b.text}</p>
          {b.cite && (
            <div style={{ marginTop: 10, fontFamily: C.mono, fontSize: 11.5, color: C.ph, letterSpacing: 0.5, textTransform: 'uppercase' }}>
              — {b.cite}
            </div>
          )}
        </blockquote>
      );

    case 'stats':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14, margin: '0 0 24px' }}>
          {b.items.map((s, i) => (
            <div key={i} style={{ background: '#fff', border: `1px solid ${C.line}`, borderRadius: 18, padding: '18px 20px' }}>
              <div style={{ fontFamily: C.mono, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: C.orange, fontWeight: 700 }}>
                {s.k}
              </div>
              <div style={{ fontSize: 21, fontWeight: 800, color: C.text, letterSpacing: -0.6, marginTop: 6 }}>{s.v}</div>
              {s.d && <div style={{ fontSize: 12.5, color: C.sub, marginTop: 5, lineHeight: 1.5, fontWeight: 500 }}>{s.d}</div>}
            </div>
          ))}
        </div>
      );

    case 'shot':
      return (
        <div style={{ margin: '0 0 24px' }}>
          <Ph label={b.label} tone={b.tone ?? 'neutral'} h={b.h ?? 200} r={18} />
        </div>
      );

    case 'img': {
      if (!b.src) {
        return (
          <div style={{ margin: '0 0 24px' }}>
            <Ph label="사진을 선택하세요" tone="warm" h={160} r={18} />
          </div>
        );
      }
      const src = b.src.startsWith('data:') || b.src.startsWith('http') ? b.src : import.meta.env.BASE_URL + b.src;
      return (
        <figure style={{ margin: '0 0 24px' }}>
          <img
            src={src}
            alt={b.alt ?? ''}
            style={{ maxWidth: '100%', borderRadius: 18, border: `1px solid ${C.line}`, display: 'block' }}
          />
          {b.caption && (
            <figcaption style={{ marginTop: 8, fontSize: 12.5, color: C.sub, fontWeight: 500 }}>{b.caption}</figcaption>
          )}
        </figure>
      );
    }
  }
}
