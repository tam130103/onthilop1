import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/styles/theme.css';
import { HomePage } from '@/pages/HomePage';
import { PresentPage } from '@/pages/PresentPage';
import { PresenterPage } from '@/pages/PresenterPage';
import { initAuth } from '@/core/auth-service';

// Lazy-load secondary pages for code splitting & faster initial load
const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const HardwareTestPage = lazy(() => import('@/pages/HardwareTest').then((m) => ({ default: m.HardwareTestPage })));
const LessonEditorPage = lazy(() => import('@/pages/LessonEditorPage').then((m) => ({ default: m.LessonEditorPage })));
const WorksheetPrintPage = lazy(() => import('@/pages/WorksheetPrintPage').then((m) => ({ default: m.WorksheetPrintPage })));
const ExamPage = lazy(() => import('@/pages/ExamPage').then((m) => ({ default: m.ExamPage })));
const AdminPage = lazy(() => import('@/pages/AdminPage').then((m) => ({ default: m.AdminPage })));

// Initialize Authentication state
initAuth().catch(() => {});

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', color: '#64748b' }}>Đang tải giao diện...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hardware-test" element={<HardwareTestPage />} />
          <Route path="/present" element={<PresentPage />} />
          <Route path="/presenter" element={<PresenterPage />} />
          <Route path="/editor" element={<LessonEditorPage />} />
          <Route path="/print-worksheet" element={<WorksheetPrintPage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/exam/:examId" element={<ExamPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);

// Register PWA service worker (chỉ đăng ký trong production để tránh 404 khi dev)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('SW registration failed:', err);
    });
  });
}
