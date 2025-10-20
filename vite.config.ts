import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimización básica para producción
    minify: 'esbuild',
    // Configuración simplificada para evitar errores de rollup
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Reportar tamaño de bundles
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },
  // Headers de seguridad para desarrollo
  preview: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
}));
