import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Navigate, useNavigate, useParams } from 'react-router-dom';
import { C } from '../kit/tokens';
import { Icon } from '../kit/Icon';
import { useContent, flatPages, findPage, searchPages } from '../content/store';
import { Block } from '../content/types';
import { DocBlocks } from '../components/DocBlocks';
import { useAdmin } from '../admin/AdminContext';
import {
  AddBlockMenu, BlockEditorCard, editorInput,
  addPageIn, addSectionIn, deletePageIn, deleteSectionIn, movePageIn, renameSectionIn, updatePageIn,
} from '../admin/editors';

function SearchBox({ onNavigate }: { onNavigate: () => void }) {
  const { guide } = useContent();
  const [q, setQ] = useState('');
  const results = useMemo(() => searchPages(guide, q), [guide, q]);
  return (
    <div style={{ position: 'relative', marginBottom: 22 }}>
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 8, height: 40,
          background: '#fff', border: `1px solid ${C.line}`, borderRadius: 12, padding: '0 12px',
        }}
      >
        <Icon name="search" size={16} color={C.ph} sw={1.9} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="문서 검색…"
          style={{
            border: 'none', outline: 'none', background: 'none', flex: 1, minWidth: 0,
            fontFamily: C.font, fontSize: 13.5, color: C.text, fontWeight: 500,
          }}
        />
        {q && (
          <button onClick={() => setQ('')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <Icon name="x" size={14} color={C.ph} sw={2} />
          </button>
        )}
      </div>
      {q.trim() && (
        <div
          style={{
            position: 'absolute', top: 46, left: 0, right: 0, zIndex: 30,
            background: '#fff', border: `1px solid ${C.line}`, borderRadius: 14,
            boxShadow: C.shadowCard, overflow: 'hidden',
          }}
        >
          {results.length === 0 && (
            <div style={{ padding: '14px 16px', fontSize: 13, color: C.sub, fontWeight: 500 }}>검색 결과가 없습니다.</div>
          )}
          {results.map((r) => (
            <Link
              key={r.path}
              to={r.path}
              onClick={() => {
                setQ('');
                onNavigate();
              }}
              style={{ display: 'block', padding: '11px 16px', textDecoration: 'none', borderBottom: `1px solid ${C.line}` }}
            >
              <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>{r.page.title}</div>
              <div style={{ fontSize: 11.5, color: C.sub, marginTop: 2, fontWeight: 600 }}>{r.section.label}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const tocBtn: React.CSSProperties = {
  border: 'none', background: 'none', cursor: 'pointer', padding: 2,
  display: 'inline-flex', alignItems: 'center', color: C.ph,
};

export function GuidePage() {
  const { sectionId, pageId } = useParams();
  const navigate = useNavigate();
  const { guide, update } = useContent();
  const { editMode } = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);
  const found = findPage(guide, sectionId, pageId);
  const flat = flatPages(guide);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [sectionId, pageId]);

  if (!found) {
    const sec = guide.find((s) => s.id === sectionId);
    const fallback = sec && sec.pages.length > 0 ? `/guide/${sec.id}/${sec.pages[0].id}` : flat[0]?.path ?? '/';
    return <Navigate to={fallback} replace />;
  }

  const { section, page, prev, next } = found;

  const patchPage = (patch: Partial<typeof page>) => update(updatePageIn(guide, section.id, page.id, patch));
  const setBlocks = (blocks: Block[]) => patchPage({ blocks });

  return (
    <div className="doc-shell">
      <button className="doc-mobile-toggle" onClick={() => setMenuOpen((v) => !v)}>
        <Icon name={menuOpen ? 'x' : 'menu'} size={17} color={C.text} sw={2} />
        {menuOpen ? '목차 닫기' : '목차 보기'}
        <span style={{ marginLeft: 'auto', color: C.sub, fontWeight: 600, fontSize: 12.5 }}>
          {section.label} · {page.title}
        </span>
      </button>

      {/* 사이드바 */}
      <aside className={`doc-side ${menuOpen ? '' : 'closed'}`}>
        <SearchBox onNavigate={() => setMenuOpen(false)} />
        {guide.map((grp) => (
          <div key={grp.id} style={{ marginBottom: 22 }}>
            <div className="doc-side-grp">
              <Icon name={grp.icon} size={13} color={C.ph} sw={1.9} />
              {grp.label}
              {editMode && (
                <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 2 }}>
                  <button
                    style={tocBtn}
                    title="그룹 이름 바꾸기"
                    onClick={() => {
                      const label = prompt('그룹 이름', grp.label);
                      if (label) update(renameSectionIn(guide, grp.id, label));
                    }}
                  >
                    <Icon name="plus" size={12} color="transparent" sw={0} />✎
                  </button>
                  <button
                    style={tocBtn}
                    title="문서 추가"
                    onClick={() => {
                      const { guide: g, pageId: pid } = addPageIn(guide, grp.id);
                      update(g);
                      navigate(`/guide/${grp.id}/${pid}`);
                    }}
                  >
                    <Icon name="plus" size={13} color={C.orange} sw={2.4} />
                  </button>
                  {grp.pages.length === 0 && (
                    <button
                      style={tocBtn}
                      title="그룹 삭제"
                      onClick={() => {
                        if (confirm(`'${grp.label}' 그룹을 삭제할까요?`)) update(deleteSectionIn(guide, grp.id));
                      }}
                    >
                      <Icon name="x" size={12} color="#D92D20" sw={2.4} />
                    </button>
                  )}
                </span>
              )}
            </div>
            {grp.pages.map((p, pi) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <NavLink
                  to={`/guide/${grp.id}/${p.id}`}
                  className={({ isActive }) => `doc-side-link${isActive ? ' on' : ''}`}
                  style={{ flex: 1, minWidth: 0 }}
                >
                  {p.title}
                </NavLink>
                {editMode && (
                  <span style={{ display: 'inline-flex', gap: 0, flexShrink: 0 }}>
                    <button style={tocBtn} title="위로" disabled={pi === 0} onClick={() => update(movePageIn(guide, grp.id, p.id, -1))}>↑</button>
                    <button style={tocBtn} title="아래로" disabled={pi === grp.pages.length - 1} onClick={() => update(movePageIn(guide, grp.id, p.id, 1))}>↓</button>
                    <button
                      style={tocBtn}
                      title="문서 삭제"
                      onClick={() => {
                        if (confirm(`'${p.title}' 문서를 삭제할까요?`)) {
                          const g = deletePageIn(guide, grp.id, p.id);
                          update(g);
                          if (p.id === page.id) navigate(flatPages(g)[0]?.path ?? '/');
                        }
                      }}
                    >
                      <Icon name="x" size={12} color="#D92D20" sw={2.4} />
                    </button>
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
        {editMode && (
          <button
            style={{
              border: `1.5px dashed ${C.orangeSoft2}`, background: 'none', cursor: 'pointer', borderRadius: 12,
              padding: '10px 0', width: '100%', fontSize: 12.5, fontWeight: 700, color: C.orange, fontFamily: C.font,
            }}
            onClick={() => update(addSectionIn(guide))}
          >
            + 대상 그룹 추가
          </button>
        )}
      </aside>

      {/* 본문 */}
      <main className="doc-main">
        {/* 브레드크럼 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: C.sub, fontWeight: 600 }}>가이드</span>
          <Icon name="chevR" size={13} color={C.ph} sw={2} />
          <span style={{ fontSize: 13, color: C.sub, fontWeight: 600 }}>{section.label}</span>
          <Icon name="chevR" size={13} color={C.ph} sw={2} />
          <span style={{ fontSize: 13, color: C.orange, fontWeight: 700 }}>{page.title}</span>
        </div>

        {editMode ? (
          <div style={{ marginBottom: 36 }}>
            <input
              value={page.title}
              onChange={(e) => patchPage({ title: e.target.value })}
              style={{
                ...editorInput, fontSize: 32, fontWeight: 800, letterSpacing: -1, padding: '12px 16px',
                border: `1.5px dashed ${C.orangeSoft2}`, borderRadius: 14, marginBottom: 12,
              }}
            />
            <textarea
              value={page.summary}
              onChange={(e) => patchPage({ summary: e.target.value })}
              rows={3}
              style={{
                ...editorInput, fontSize: 15.5, lineHeight: 1.6, resize: 'vertical',
                border: `1.5px dashed ${C.orangeSoft2}`, borderRadius: 14,
              }}
            />
          </div>
        ) : (
          <>
            <h1 style={{ margin: 0, fontSize: 36, fontWeight: 800, letterSpacing: -1.2, lineHeight: 1.15, color: C.text }}>
              {page.title}
            </h1>
            <p style={{ margin: '16px 0 36px', fontSize: 16.5, lineHeight: 1.7, color: C.sub, fontWeight: 500 }}>{page.summary}</p>
          </>
        )}

        {editMode ? (
          <>
            {page.blocks.map((b, i) => (
              <BlockEditorCard
                key={i}
                block={b}
                onChange={(nb) => setBlocks(page.blocks.map((x, xi) => (xi === i ? nb : x)))}
                onDelete={() => setBlocks(page.blocks.filter((_, xi) => xi !== i))}
                onMove={(dir) => {
                  const j = i + dir;
                  if (j < 0 || j >= page.blocks.length) return;
                  const arr = [...page.blocks];
                  [arr[i], arr[j]] = [arr[j], arr[i]];
                  setBlocks(arr);
                }}
              />
            ))}
            <AddBlockMenu onAdd={(b) => setBlocks([...page.blocks, b])} />
          </>
        ) : (
          <DocBlocks blocks={page.blocks} />
        )}

        {/* 이전 / 다음 */}
        <div
          style={{
            marginTop: 56, paddingTop: 24, borderTop: `1px solid ${C.line}`,
            display: 'flex', justifyContent: 'space-between', gap: 12,
          }}
        >
          {prev ? (
            <Link to={prev.path} style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: 11.5, color: C.ph, display: 'flex', alignItems: 'center', gap: 3, fontWeight: 600 }}>
                <Icon name="chevL" size={13} color={C.ph} sw={2} /> 이전 문서
              </span>
              <span style={{ fontSize: 14.5, fontWeight: 800, color: C.text, display: 'block', marginTop: 4 }}>{prev.page.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={next.path} style={{ textDecoration: 'none', textAlign: 'right' }}>
              <span
                style={{
                  fontSize: 11.5, color: C.ph, display: 'flex', alignItems: 'center', gap: 3,
                  justifyContent: 'flex-end', fontWeight: 600,
                }}
              >
                다음 문서 <Icon name="chevR" size={13} color={C.ph} sw={2} />
              </span>
              <span style={{ fontSize: 14.5, fontWeight: 800, color: C.text, display: 'block', marginTop: 4 }}>{next.page.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </main>
    </div>
  );
}
