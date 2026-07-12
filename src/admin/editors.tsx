// 문서 편집 UI — 페이지 메타·블록 편집기와 목차(섹션/페이지) 조작 헬퍼.
import React, { useState } from 'react';
import { C } from '../kit/tokens';
import { Icon } from '../kit/Icon';
import { Block, DocPage, DocSection } from '../content/types';
import { DocBlocks } from '../components/DocBlocks';

// ── 불변 목차 조작 헬퍼 ──────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 7);

export function updatePageIn(guide: DocSection[], sectionId: string, pageId: string, patch: Partial<DocPage>): DocSection[] {
  return guide.map((s) =>
    s.id !== sectionId ? s : { ...s, pages: s.pages.map((p) => (p.id !== pageId ? p : { ...p, ...patch })) },
  );
}

export function addPageIn(guide: DocSection[], sectionId: string): { guide: DocSection[]; pageId: string } {
  const pageId = `new-${uid()}`;
  const page: DocPage = {
    id: pageId,
    title: '새 문서',
    summary: '문서 요약을 입력하세요.',
    blocks: [{ t: 'p', text: '본문을 입력하세요.' }],
  };
  return { guide: guide.map((s) => (s.id !== sectionId ? s : { ...s, pages: [...s.pages, page] })), pageId };
}

export function deletePageIn(guide: DocSection[], sectionId: string, pageId: string): DocSection[] {
  return guide.map((s) => (s.id !== sectionId ? s : { ...s, pages: s.pages.filter((p) => p.id !== pageId) }));
}

export function movePageIn(guide: DocSection[], sectionId: string, pageId: string, dir: -1 | 1): DocSection[] {
  return guide.map((s) => {
    if (s.id !== sectionId) return s;
    const pages = [...s.pages];
    const i = pages.findIndex((p) => p.id === pageId);
    const j = i + dir;
    if (i === -1 || j < 0 || j >= pages.length) return s;
    [pages[i], pages[j]] = [pages[j], pages[i]];
    return { ...s, pages };
  });
}

export function renameSectionIn(guide: DocSection[], sectionId: string, label: string, desc?: string): DocSection[] {
  return guide.map((s) => (s.id !== sectionId ? s : { ...s, label, ...(desc !== undefined ? { desc } : {}) }));
}

export function addSectionIn(guide: DocSection[]): DocSection[] {
  return [
    ...guide,
    { id: `sec-${uid()}`, label: '새 대상', icon: 'book', desc: '이 대상에 대한 소개를 입력하세요.', pages: [] },
  ];
}

export function deleteSectionIn(guide: DocSection[], sectionId: string): DocSection[] {
  return guide.filter((s) => s.id !== sectionId);
}

// ── 블록 템플릿 ──────────────────────────────────────────────
export const BLOCK_TEMPLATES: { label: string; make: () => Block }[] = [
  { label: '문단', make: () => ({ t: 'p', text: '본문을 입력하세요.' }) },
  { label: '소제목', make: () => ({ t: 'h2', text: '소제목' }) },
  { label: '사진', make: () => ({ t: 'img', src: '', alt: '', caption: '' }) },
  { label: '안내 박스', make: () => ({ t: 'callout', icon: 'check', title: '안내', body: '내용을 입력하세요.', tone: 'orange' }) },
  { label: '단계', make: () => ({ t: 'steps', items: [{ title: '1단계', body: '설명' }, { title: '2단계', body: '설명' }] }) },
  { label: '카드 그리드', make: () => ({ t: 'cards', cols: 2, items: [{ icon: 'spark', title: '제목', body: '설명' }] }) },
  { label: '플로우', make: () => ({ t: 'flow', items: [{ label: 'A' }, { label: 'B' }] }) },
  { label: '표', make: () => ({ t: 'table', head: ['항목', '내용'], rows: [['', '']] }) },
  { label: '인용', make: () => ({ t: 'quote', text: '인용문', cite: 'COMUS' }) },
  { label: '지표', make: () => ({ t: 'stats', items: [{ k: 'KEY', v: '값', d: '설명' }] }) },
];

// ── 공용 입력 스타일 ─────────────────────────────────────────
const input: React.CSSProperties = {
  width: '100%', borderRadius: 10, border: `1px solid ${C.line}`, padding: '9px 12px',
  fontFamily: C.font, fontSize: 13.5, color: C.text, outline: 'none', fontWeight: 500,
};
const smallBtn: React.CSSProperties = {
  border: `1px solid ${C.line}`, background: '#fff', cursor: 'pointer', borderRadius: 8,
  padding: '4px 8px', fontSize: 11.5, fontWeight: 700, color: C.sub, fontFamily: C.font,
  display: 'inline-flex', alignItems: 'center', gap: 4,
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', marginBottom: 10 }}>
      <span style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: C.sub, marginBottom: 5 }}>{label}</span>
      {children}
    </label>
  );
}

// ── 블록별 편집 폼 ───────────────────────────────────────────
function BlockForm({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  const [jsonErr, setJsonErr] = useState<string | null>(null);

  if (block.t === 'p' || block.t === 'h2') {
    return (
      <Field label={block.t === 'p' ? '문단 내용' : '소제목'}>
        <textarea
          rows={block.t === 'p' ? 4 : 1}
          style={{ ...input, resize: 'vertical' }}
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
        />
      </Field>
    );
  }

  if (block.t === 'quote') {
    return (
      <>
        <Field label="인용문">
          <textarea rows={3} style={{ ...input, resize: 'vertical' }} value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })} />
        </Field>
        <Field label="출처">
          <input style={input} value={block.cite ?? ''} onChange={(e) => onChange({ ...block, cite: e.target.value })} />
        </Field>
      </>
    );
  }

  if (block.t === 'img') {
    return (
      <>
        <Field label="사진 파일">
          <input
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            style={{ fontSize: 12.5, fontFamily: C.font }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const reader = new FileReader();
              reader.onload = () => onChange({ ...block, src: String(reader.result) });
              reader.readAsDataURL(f);
            }}
          />
          {block.src && !block.src.startsWith('data:') && (
            <div style={{ fontFamily: C.mono, fontSize: 11, color: C.ph, marginTop: 5 }}>{block.src}</div>
          )}
          {block.src.startsWith('data:') && (
            <div style={{ fontSize: 11.5, color: C.orange, fontWeight: 600, marginTop: 5 }}>게시 시 저장소에 업로드됩니다.</div>
          )}
        </Field>
        <Field label="대체 텍스트">
          <input style={input} value={block.alt ?? ''} onChange={(e) => onChange({ ...block, alt: e.target.value })} />
        </Field>
        <Field label="캡션">
          <input style={input} value={block.caption ?? ''} onChange={(e) => onChange({ ...block, caption: e.target.value })} />
        </Field>
      </>
    );
  }

  // 구조 블록(callout/steps/cards/flow/table/stats/shot)은 JSON으로 편집
  return (
    <Field label={`${block.t} 블록 (JSON)`}>
      <textarea
        rows={8}
        style={{ ...input, resize: 'vertical', fontFamily: C.mono, fontSize: 12 }}
        defaultValue={JSON.stringify(block, null, 2)}
        onBlur={(e) => {
          try {
            const parsed = JSON.parse(e.target.value);
            if (parsed.t !== block.t) throw new Error('블록 타입(t)은 바꿀 수 없습니다.');
            setJsonErr(null);
            onChange(parsed);
          } catch (err) {
            setJsonErr(err instanceof Error ? err.message : 'JSON 형식이 올바르지 않습니다.');
          }
        }}
      />
      {jsonErr && <div style={{ fontSize: 12, color: '#D92D20', fontWeight: 600, marginTop: 5 }}>{jsonErr}</div>}
    </Field>
  );
}

// ── 블록 카드 (미리보기 + 컨트롤 + 폼) ───────────────────────
export function BlockEditorCard({
  block, onChange, onDelete, onMove,
}: { block: Block; onChange: (b: Block) => void; onDelete: () => void; onMove: (dir: -1 | 1) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1.5px dashed ${open ? C.orange : C.orangeSoft2}`, borderRadius: 16, padding: '14px 14px 0', marginBottom: 18 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, alignItems: 'center' }}>
        <span style={{ fontFamily: C.mono, fontSize: 10.5, color: C.orange, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          {block.t}
        </span>
        <span style={{ flex: 1 }} />
        <button style={smallBtn} onClick={() => onMove(-1)} title="위로">↑</button>
        <button style={smallBtn} onClick={() => onMove(1)} title="아래로">↓</button>
        <button style={{ ...smallBtn, color: open ? '#fff' : C.orange, background: open ? C.orange : '#fff', borderColor: open ? C.orange : C.line }} onClick={() => setOpen(!open)}>
          {open ? '완료' : '편집'}
        </button>
        <button
          style={{ ...smallBtn, color: '#D92D20' }}
          onClick={() => {
            if (confirm('이 블록을 삭제할까요?')) onDelete();
          }}
        >
          삭제
        </button>
      </div>
      {open && (
        <div style={{ background: C.bg, borderRadius: 12, padding: '14px 14px 4px', marginBottom: 14 }}>
          <BlockForm block={block} onChange={onChange} />
        </div>
      )}
      <DocBlocks blocks={[block]} />
    </div>
  );
}

// ── 블록 추가 메뉴 ───────────────────────────────────────────
export function AddBlockMenu({ onAdd }: { onAdd: (b: Block) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative', margin: '4px 0 24px' }}>
      <button
        style={{
          ...smallBtn, width: '100%', justifyContent: 'center', padding: '12px 0',
          borderStyle: 'dashed', borderColor: C.orangeSoft2, color: C.orange, fontSize: 13, borderRadius: 14,
        }}
        onClick={() => setOpen(!open)}
      >
        <Icon name="plus" size={15} color={C.orange} sw={2.2} /> 블록 추가
      </button>
      {open && (
        <div
          style={{
            position: 'absolute', top: 48, left: 0, right: 0, zIndex: 40, background: '#fff',
            border: `1px solid ${C.line}`, borderRadius: 14, boxShadow: C.shadowCard,
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 6, padding: 10,
          }}
        >
          {BLOCK_TEMPLATES.map((tpl) => (
            <button
              key={tpl.label}
              style={{ ...smallBtn, justifyContent: 'center', padding: '9px 4px', fontSize: 12.5 }}
              onClick={() => {
                onAdd(tpl.make());
                setOpen(false);
              }}
            >
              {tpl.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const editorInput = input;
export const editorSmallBtn = smallBtn;
