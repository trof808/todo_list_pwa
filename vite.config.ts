import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt',
    injectRegister: 'inline',

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'life_tracker_react_pwa',
      short_name: 'life_tracker_react_pwa',
      description: 'life_tracker_react_pwa',
      theme_color: '#242424',
      start_url: 'http://192.168.1.67:5173/',
      // scope: "/app/",
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})