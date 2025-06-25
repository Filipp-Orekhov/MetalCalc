import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['metalcalc-react.onrender.com'],
  },
  base: '/MetalCalc/',
  server: {
    allowedHosts: ['metalcalc-react.onrender.com'],
  },
});
