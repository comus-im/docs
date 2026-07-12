// 가이드 콘텐츠 스토어.
// 소스 오브 트루스는 guide-data.json (빌드 시 번들). 관리자 편집 중에는
// localStorage 초안이 번들 데이터를 덮어쓰고, '게시'하면 GitHub API로
// guide-data.json이 커밋되어 자동 재배포된다.
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import guideData from './guide-data.json';
import { DocSection, DocPage } from './types';

const DRAFT_KEY = 'comus-docs-draft-v1';
export const BUNDLED: DocSection[] = guideData as DocSection[];

function loadDraft(): DocSection[] | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as DocSection[]) : null;
  } catch {
    return null;
  }
}

interface ContentCtx {
  guide: DocSection[];
  /** 초안 존재 여부 (번들과 다른 로컬 편집본) */
  hasDraft: boolean;
  update: (next: DocSection[]) => void;
  discardDraft: () => void;
}

const Ctx = createContext<ContentCtx>({
  guide: BUNDLED,
  hasDraft: false,
  update: () => {},
  discardDraft: () => {},
});

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [guide, setGuide] = useState<DocSection[]>(() => loadDraft() ?? BUNDLED);
  const [hasDraft, setHasDraft] = useState(() => loadDraft() !== null);

  const update = useCallback((next: DocSection[]) => {
    setGuide(next);
    setHasDraft(true);
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
    } catch { /* 저장 공간 초과 등 — 상태만 유지 */ }
  }, []);

  const discardDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_KEY);
    setGuide(BUNDLED);
    setHasDraft(false);
  }, []);

  const value = useMemo(() => ({ guide, hasDraft, update, discardDraft }), [guide, hasDraft, update, discardDraft]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useContent = () => useContext(Ctx);

// ── 파생 헬퍼 ────────────────────────────────────────────────
export interface FlatPage {
  section: DocSection;
  page: DocPage;
  path: string;
}

export function flatPages(guide: DocSection[]): FlatPage[] {
  return guide.flatMap((section) =>
    section.pages.map((page) => ({ section, page, path: `/guide/${section.id}/${page.id}` })),
  );
}

export function findPage(guide: DocSection[], sectionId?: string, pageId?: string) {
  const flat = flatPages(guide);
  const idx = flat.findIndex((f) => f.section.id === sectionId && f.page.id === pageId);
  if (idx === -1) return null;
  return {
    ...flat[idx],
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}

export function searchPages(guide: DocSection[], q: string): FlatPage[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  return flatPages(guide)
    .filter((f) => {
      const hay = [f.section.label, f.page.title, f.page.summary, ...f.page.blocks.map((b) => JSON.stringify(b))]
        .join(' ')
        .toLowerCase();
      return hay.includes(needle);
    })
    .slice(0, 8);
}
