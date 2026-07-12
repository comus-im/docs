import React from 'react';
import { Link } from 'react-router-dom';
import { C } from '../kit/tokens';
import { Icon } from '../kit/Icon';
import { LogoMark } from '../kit/primitives';
import { useContent } from '../content/store';

const FLOW = [
  { label: '구매', sub: '가치 있는 소비' },
  { label: '포인트', sub: '자동 적립' },
  { label: '기부', sub: '원하는 곳에' },
  { label: '후원이야기', sub: '결과 확인' },
  { label: '지역사회', sub: '지속 가능한 변화' },
];

export function Home() {
  const { guide: GUIDE } = useContent();
  return (
    <div>
      {/* 히어로 */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 24px 64px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <LogoMark size={64} radius={20} iconSize={34} />
        </div>
        <div
          style={{
            fontFamily: C.mono, fontSize: 12.5, letterSpacing: 1.5, textTransform: 'uppercase',
            color: C.orange, fontWeight: 700, marginBottom: 18,
          }}
        >
          Connecting Commerce with Community
        </div>
        <h1 style={{ margin: 0, fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 800, letterSpacing: -2, lineHeight: 1.1, color: C.text }}>
          소비가 나눔이 되는
          <br />
          플랫폼, <span style={{ color: C.orange }}>COMUS</span>
        </h1>
        <p style={{ margin: '22px auto 0', fontSize: 18, lineHeight: 1.7, color: C.sub, maxWidth: 560, fontWeight: 500 }}>
          COMUS 공식 문서입니다. 플랫폼이 어떻게 소비를 가치로 연결하는지,
          그리고 각 참여자가 무엇을 할 수 있는지 안내합니다.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 34, flexWrap: 'wrap' }}>
          <Link
            to="/guide/intro/what-is-comus"
            style={{
              textDecoration: 'none', background: C.orange, color: '#fff', fontWeight: 700, fontSize: 16,
              letterSpacing: -0.3, height: 52, padding: '0 26px', borderRadius: 16,
              display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: C.glowOrange,
            }}
          >
            <Icon name="book" size={19} color="#fff" sw={2} />
            가이드 시작하기
          </Link>
          <Link
            to="/design"
            style={{
              textDecoration: 'none', background: '#fff', color: C.text, fontWeight: 700, fontSize: 16,
              letterSpacing: -0.3, height: 52, padding: '0 26px', borderRadius: 16,
              display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${C.line}`,
              boxShadow: C.shadowSoft,
            }}
          >
            <Icon name="spark" size={19} color={C.orange} sw={2} />
            디자인 시스템
          </Link>
        </div>
      </section>

      {/* 가치 순환 플로우 */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 72px' }}>
        <div
          style={{
            background: '#fff', border: `1px solid ${C.line}`, borderRadius: 28, padding: '36px 28px',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 14,
          }}
        >
          {FLOW.map((f, i) => (
            <React.Fragment key={f.label}>
              <div style={{ textAlign: 'center', minWidth: 108 }}>
                <div
                  style={{
                    width: 52, height: 52, borderRadius: 16, background: i === FLOW.length - 1 ? C.orange : C.orangeSoft,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px',
                  }}
                >
                  <Icon
                    name={(['bag', 'coin', 'gift', 'chat', 'people'] as const)[i]}
                    size={25}
                    color={i === FLOW.length - 1 ? '#fff' : C.orange}
                    sw={1.9}
                  />
                </div>
                <div style={{ fontSize: 15.5, fontWeight: 800, color: C.text, letterSpacing: -0.3 }}>{f.label}</div>
                <div style={{ fontSize: 12, color: C.sub, marginTop: 3, fontWeight: 600 }}>{f.sub}</div>
              </div>
              {i !== FLOW.length - 1 && <Icon name="arrowR" size={20} color={C.orangeSoft2} sw={2.4} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 대상별 가이드 */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 800, letterSpacing: -0.8, color: C.text }}>대상별 가이드</h2>
        <p style={{ margin: '0 0 24px', fontSize: 15.5, color: C.sub, fontWeight: 500 }}>
          COMUS를 함께 만드는 모든 참여자를 위해, 대상별로 문서를 준비했습니다.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {GUIDE.map((s) => (
            <Link
              key={s.id}
              to={s.pages[0] ? `/guide/${s.id}/${s.pages[0].id}` : '/guide'}
              style={{
                textDecoration: 'none', background: '#fff', border: `1px solid ${C.line}`,
                borderRadius: 20, padding: 24, transition: 'transform .18s ease, box-shadow .18s ease',
                display: 'block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = C.shadowCard;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: 44, height: 44, borderRadius: 13, background: C.orangeSoft,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}
              >
                <Icon name={s.icon} size={23} color={C.orange} sw={1.9} />
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, color: C.text, letterSpacing: -0.4 }}>{s.label}</div>
              <p style={{ margin: '8px 0 14px', fontSize: 13.5, lineHeight: 1.6, color: C.sub, fontWeight: 500 }}>{s.desc}</p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 13, fontWeight: 700, color: C.orange }}>
                문서 보기 <Icon name="chevR" size={14} color={C.orange} sw={2.2} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 매니페스토 */}
      <section style={{ background: '#fff', borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '72px 24px', textAlign: 'center' }}>
          <div
            style={{
              fontFamily: C.mono, fontSize: 11.5, letterSpacing: 1.5, textTransform: 'uppercase',
              color: C.orange, fontWeight: 700, marginBottom: 18,
            }}
          >
            COMUS Manifesto
          </div>
          <p style={{ margin: 0, fontSize: 'clamp(19px, 3vw, 24px)', fontWeight: 700, lineHeight: 1.6, letterSpacing: -0.6, color: C.text }}>
            우리는 소비가 단순한 거래로 끝나지 않는 세상을 꿈꿉니다.
            사람과 기업, 그리고 지역사회가 함께 성장할 수 있는 연결을 만듭니다.
            COMUS는 더 나은 소비를 통해 더 나은 공동체를 만들어갑니다.
          </p>
          <Link
            to="/brand"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 26,
              textDecoration: 'none', fontSize: 14.5, fontWeight: 700, color: C.orange,
            }}
          >
            브랜드 스토리 읽기 <Icon name="arrowR" size={16} color={C.orange} sw={2.2} />
          </Link>
        </div>
      </section>
    </div>
  );
}
