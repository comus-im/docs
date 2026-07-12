// 브랜드 스토리 — COMUS Brand Magazine의 서사를 문서 페이지로 옮긴 것.
// "기능 소개"가 아니라 "왜 존재하는가"를 말하는 페이지.
import React from 'react';
import { Link } from 'react-router-dom';
import { C } from '../kit/tokens';
import { Icon, IconName } from '../kit/Icon';

const VALUES: { icon: IconName; en: string; ko: string; d: string }[] = [
  { icon: 'link', en: 'Connection', ko: '연결', d: '사람과 기업, 기관과 지역사회를 잇습니다.' },
  { icon: 'gift', en: 'Sharing', ko: '나눔', d: '소비의 일부가 자연스럽게 나눔이 됩니다.' },
  { icon: 'shield', en: 'Trust', ko: '신뢰', d: '과정과 결과를 투명하게 공개합니다.' },
  { icon: 'sprout', en: 'Growth', ko: '성장', d: '모두가 함께 성장하는 생태계를 만듭니다.' },
];

const FUTURE = ['Shopping', 'Donation', 'Community', 'ESG', 'Global'];

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: C.mono, fontSize: 11.5, letterSpacing: 1.5, textTransform: 'uppercase',
        color: C.orange, fontWeight: 700, marginBottom: 16,
      }}
    >
      {children}
    </div>
  );
}

export function Brand() {
  return (
    <div>
      {/* 커버 */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '96px 24px 72px', textAlign: 'center' }}>
        <Kicker>COMUS Brand Story</Kicker>
        <h1 style={{ margin: 0, fontSize: 'clamp(34px, 5.5vw, 54px)', fontWeight: 800, letterSpacing: -1.8, lineHeight: 1.15, color: C.text }}>
          Every Purchase
          <br />
          Has Meaning
        </h1>
        <p style={{ margin: '24px auto 0', fontSize: 18, lineHeight: 1.75, color: C.sub, maxWidth: 480, fontWeight: 500 }}>
          우리는 매일 소비를 합니다.
          <br />
          하지만 대부분의 소비는 나에서 끝납니다.
        </p>
        <p style={{ margin: '28px auto 0', fontSize: 22, fontWeight: 800, letterSpacing: -0.6, color: C.text }}>
          만약, 소비가 누군가의 <span style={{ color: C.orange }}>희망</span>이 될 수 있다면?
        </p>
      </section>

      {/* Why COMUS — 기존 소비 vs COMUS */}
      <section style={{ background: '#fff', borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>
          <Kicker>Why COMUS</Kicker>
          <h2 style={{ margin: '0 0 32px', fontSize: 30, fontWeight: 800, letterSpacing: -0.9, color: C.text }}>같은 소비, 다른 가치.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            <div style={{ border: `1px solid ${C.line}`, borderRadius: 20, padding: 28, background: C.bg }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.ph, marginBottom: 18, fontFamily: C.mono, letterSpacing: 1, textTransform: 'uppercase' }}>
                기존 소비
              </div>
              {['구매', '끝'].map((s, i, arr) => (
                <React.Fragment key={s}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: C.sub, letterSpacing: -0.3 }}>{s}</div>
                  {i !== arr.length - 1 && <div style={{ color: C.ph, margin: '8px 0', fontSize: 15 }}>↓</div>}
                </React.Fragment>
              ))}
            </div>
            <div style={{ border: `1.5px solid ${C.orangeSoft2}`, borderRadius: 20, padding: 28, background: C.orangeSoft }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.orange, marginBottom: 18, fontFamily: C.mono, letterSpacing: 1, textTransform: 'uppercase' }}>
                COMUS
              </div>
              {['구매', '포인트', '기부', '후원이야기', '지역사회'].map((s, i, arr) => (
                <React.Fragment key={s}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: C.text, letterSpacing: -0.3 }}>{s}</div>
                  {i !== arr.length - 1 && <div style={{ color: C.orange, margin: '8px 0', fontSize: 15 }}>↓</div>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <p style={{ margin: '28px 0 0', fontSize: 17, fontWeight: 700, color: C.text, letterSpacing: -0.4 }}>
            소비는 끝이 아니라 새로운 시작입니다.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '72px 24px' }}>
        <Kicker>Vision</Kicker>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 10 }}>
          {['People', 'Business', 'Community'].map((w, i, arr) => (
            <React.Fragment key={w}>
              <span style={{ fontSize: 'clamp(26px, 4.5vw, 40px)', fontWeight: 800, letterSpacing: -1.2, color: C.text }}>{w}</span>
              {i !== arr.length - 1 && <span style={{ color: C.orange, fontSize: 24, fontWeight: 800 }}>·</span>}
            </React.Fragment>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 16, color: C.sub, fontWeight: 500, lineHeight: 1.7 }}>
          사람과 기업, 그리고 지역사회. 그 가운데에 COMUS가 있습니다.
        </p>
        <div style={{ height: 44 }} />
        <Kicker>Mission</Kicker>
        <h2 style={{ margin: 0, fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.35, color: C.text }}>
          누구나, 더 쉽게,
          <br />
          좋은 소비를 할 수 있도록.
        </h2>
      </section>

      {/* Core Values */}
      <section style={{ background: '#fff', borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>
          <Kicker>Core Values</Kicker>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 }}>
            {VALUES.map((v) => (
              <div key={v.en} style={{ border: `1px solid ${C.line}`, borderRadius: 20, padding: 24 }}>
                <div
                  style={{
                    width: 44, height: 44, borderRadius: 13, background: C.orangeSoft,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                  }}
                >
                  <Icon name={v.icon} size={23} color={C.orange} sw={1.9} />
                </div>
                <div style={{ fontFamily: C.mono, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: C.orange, fontWeight: 700 }}>
                  {v.en}
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, color: C.text, marginTop: 5, letterSpacing: -0.3 }}>{v.ko}</div>
                <p style={{ margin: '7px 0 0', fontSize: 13.5, lineHeight: 1.6, color: C.sub, fontWeight: 500 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '72px 24px' }}>
        <Kicker>Future</Kicker>
        <h2 style={{ margin: '0 0 28px', fontSize: 28, fontWeight: 800, letterSpacing: -0.8, color: C.text }}>
          쇼핑에서 글로벌 나눔 네트워크까지
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          {FUTURE.map((f, i) => (
            <React.Fragment key={f}>
              <span
                style={{
                  fontFamily: C.mono, fontSize: 14.5, fontWeight: 700, letterSpacing: 0.3,
                  color: i === 0 ? '#fff' : C.blue,
                  background: i === 0 ? C.orange : C.blueSoft,
                  padding: '9px 16px', borderRadius: 999,
                }}
              >
                {f}
              </span>
              {i !== FUTURE.length - 1 && <Icon name="arrowR" size={16} color={C.ph} sw={2} />}
            </React.Fragment>
          ))}
        </div>
        <p style={{ margin: '26px 0 0', fontSize: 15, color: C.sub, fontWeight: 500, lineHeight: 1.7 }}>
          단계별 로드맵은 <Link to="/guide/investors/roadmap" style={{ fontWeight: 700 }}>투자자 가이드 · 로드맵</Link>에서 자세히 볼 수 있습니다.
        </p>
      </section>

      {/* Our Promise */}
      <section style={{ background: C.text }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '84px 24px', textAlign: 'center' }}>
          <div
            style={{
              fontFamily: C.mono, fontSize: 11.5, letterSpacing: 1.5, textTransform: 'uppercase',
              color: C.orange, fontWeight: 700, marginBottom: 20,
            }}
          >
            Our Promise
          </div>
          <p style={{ margin: 0, fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, lineHeight: 1.45, letterSpacing: -0.9, color: '#fff' }}>
            우리는 소비가
            <br />
            세상을 연결한다고 믿습니다.
          </p>
          <div style={{ marginTop: 30, fontFamily: C.mono, fontSize: 12.5, color: 'rgba(255,255,255,0.55)', letterSpacing: 0.5 }}>
            Connecting Commerce with Community
          </div>
        </div>
      </section>
    </div>
  );
}
