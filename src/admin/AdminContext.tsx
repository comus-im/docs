// 관리자 세션 — GitHub 토큰 로그인 + 편집 모드 상태.
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { validateToken } from './github';

const TOKEN_KEY = 'comus-docs-admin-token';

interface AdminCtx {
  token: string | null;
  login: string | null;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  signIn: (token: string) => Promise<string | null>; // 에러 메시지 또는 null
  signOut: () => void;
}

const Ctx = createContext<AdminCtx>({
  token: null, login: null, editMode: false,
  setEditMode: () => {}, signIn: async () => null, signOut: () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [login, setLogin] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const signIn = useCallback(async (t: string) => {
    const res = await validateToken(t.trim());
    if (!res.ok) return res.error ?? '인증에 실패했습니다.';
    localStorage.setItem(TOKEN_KEY, t.trim());
    setToken(t.trim());
    setLogin(res.login ?? null);
    return null;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setLogin(null);
    setEditMode(false);
  }, []);

  const value = useMemo(
    () => ({ token, login, editMode, setEditMode, signIn, signOut }),
    [token, login, editMode, signIn, signOut],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAdmin = () => useContext(Ctx);
