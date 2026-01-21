import { defineConfig } from 'vite'
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    configFile: false,
    preprocess: vitePreprocess()
  })],
  root: 'frontend',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      $lib: join(process.cwd(), 'frontend/src/lib')
    }
  }
})
