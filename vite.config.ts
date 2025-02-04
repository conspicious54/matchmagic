import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external connections
    port: parseInt(process.env.PORT || '8080'), // Use Google Cloud's port or default to 8080
    strictPort: true // Fail if port is in use
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '8080'),
    strictPort: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});