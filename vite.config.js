import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // change the host based on your needs, this is set for the demo of todo app
  server: {
    proxy: {
      '/api': {
        target: 'http://yollstudentapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});
