import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { HardwareTestPage } from '@/pages/HardwareTest';
import { PresentPage } from '@/pages/PresentPage';
import { PresenterPage } from '@/pages/PresenterPage';
import { LessonEditorPage } from '@/pages/LessonEditorPage';
import { WorksheetPrintPage } from '@/pages/WorksheetPrintPage';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hardware-test" element={<HardwareTestPage />} />
        <Route path="/present" element={<PresentPage />} />
        <Route path="/presenter" element={<PresenterPage />} />
        <Route path="/editor" element={<LessonEditorPage />} />
        <Route path="/print-worksheet" element={<WorksheetPrintPage />} />
      </Routes>
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
