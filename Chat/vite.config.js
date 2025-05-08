// import path from "path"
// // import tailwindcss from "@tailwindcss/vite"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })


import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Ensure HMR (Hot Module Replacement) works correctly
    hmr: true,
    open: true, // Automatically open the browser when running the dev server
    watch: {
      usePolling: true, // Sometimes file changes don't trigger without polling (e.g., on some network file systems)
    },
  },
  build: {
    // This option is useful if you're using source maps in production
    sourcemap: true,
  },
});
