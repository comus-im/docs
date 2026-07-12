import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { Home } from './pages/Home';
import { GuidePage } from './pages/GuidePage';
import { DesignSystem } from './pages/design/DesignSystem';
import { Brand } from './pages/Brand';
import { ContentProvider, useContent, flatPages } from './content/store';
import { AdminProvider } from './admin/AdminContext';
import { AdminBar } from './admin/AdminBar';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function GuideIndexRedirect() {
  const { guide } = useContent();
  return <Navigate to={flatPages(guide)[0]?.path ?? '/'} replace />;
}

export default function App() {
  return (
    <ContentProvider>
      <AdminProvider>
        <ScrollTop />
        <SiteHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<GuideIndexRedirect />} />
          <Route path="/guide/:sectionId" element={<GuidePage />} />
          <Route path="/guide/:sectionId/:pageId" element={<GuidePage />} />
          <Route path="/design" element={<DesignSystem />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <SiteFooter />
        <AdminBar />
      </AdminProvider>
    </ContentProvider>
  );
}
