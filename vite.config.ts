import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import wasm from 'vite-plugin-wasm';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [
    react(),
    wasm(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    allowedHosts: [
      '.gitpod.dev',
      '.gitpod.io',
    ],
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
  },
  build: {
    target: 'esnext',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        worker:
          'node_modules/@webzjs/webz-wallet/snippets/wasm-bindgen-rayon-3e04391371ad0a8e/src/workerHelpers.worker.js',
      },
    },
    manifest: true,
  },
  optimizeDeps: {
    exclude: ['@webzjs/webz-wallet', '@webzjs/webz-keys'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  worker: {
    format: 'es',
  },
});
