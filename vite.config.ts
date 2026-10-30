import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

// Plugin to copy content/lessons to dist/content/lessons before SW generation
function copyContentPlugin() {
  return {
    name: 'copy-content-plugin',
    generateBundle() {
      const srcDir = resolve(rootDir, 'content/lessons');
      const destDir = resolve(rootDir, 'dist/content/lessons');
      if (existsSync(srcDir)) {
        mkdirSync(destDir, { recursive: true });
        cpSync(srcDir, destDir, { recursive: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    copyContentPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,mp3,json}'],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 50MB for audio
        runtimeCaching: [
          {
            urlPattern: /\/media\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'trinh-chieu-media-v1',
              expiration: { maxEntries: 500 },
            },
          },
          {
            urlPattern: /\/content\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'trinh-chieu-content-v1',
              expiration: { maxEntries: 100 },
            },
          },
        ],
      },
      manifest: {
        name: 'Trình Chiếu Lớp 1',
        short_name: 'TrinhChieu',
        description: 'Công cụ trình chiếu giảng dạy Lớp 1 - Offline PWA',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'landscape',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
});
