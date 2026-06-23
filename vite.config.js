import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/taskflow/' : '/',
  server: {
    port: 5500,
    open: true
  }
}));
