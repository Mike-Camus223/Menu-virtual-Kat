import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import legacy from '@vitejs/plugin-legacy';

// https://vite.dev/config/
export default defineConfig({
  base: "/", 
  plugins: [
    react(),
    tailwindcss(),
    legacy({
      targets: [
        'defaults',
        'Android >= 5',
        'Chrome >= 49',
        'iOS >= 10'
      ],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 2100,
  },
})
