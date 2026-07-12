import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { C } from '../kit/tokens';
import { LogoMark } from '../kit/primitives';

const LINKS = [
  { to: '/guide', label: '가이드' },
  { to: '/design', label: '디자인 시스템' },
  { to: '/brand', label: '브랜드' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-in">
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 9 }}>
          <LogoMark size={32} radius={10} iconSize={18} />
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: 0.4, color: C.text }}>COMUS</span>
          <span
            className="hide-mobile"
            style={{
              fontFamily: C.mono, fontSize: 10.5, letterSpacing: 1, textTransform: 'uppercase',
              color: C.ph, fontWeight: 700, marginLeft: 2, paddingTop: 3,
            }}
          >
            Docs
          </span>
        </Link>
        <nav className="site-nav" style={{ marginLeft: 'auto' }}>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'on' : '')}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
