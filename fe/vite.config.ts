import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@@': fileURLToPath(new URL('./src/components', import.meta.url))
    }
  },
  server: {
    port: 8888,
    host: '0.0.0.0',
    proxy: {
      '/api/v1': 'http://0.0.0.0:4000'
    }
  }
})
