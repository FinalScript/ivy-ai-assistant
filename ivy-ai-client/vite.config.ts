import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    allowedHosts: ['localhost', '127.0.0.1', 'roynul.hopto.org'],
  },
})
