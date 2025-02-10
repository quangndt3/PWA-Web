  import { VitePWA } from 'vite-plugin-pwa';
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',

        manifest: {
          name: 'my-react-app',
          short_name: 'my-react-app',
          description: 'giao diện',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          start_url: '/',
          display: 'standalone',
          orientation: 'portrait',
          icons: [
            {
              src: '/icons/logo2.jpg',
              sizes: '512x512',
              type: 'image/jpg',
            },
            {
              src: "/logo/mark.svg",
              sizes: "176x150",
              type: "image/svg+xml",
            },
          ],
          screenshots: [
            {
              src: "/screenshots/screenshot-mobile.jpg",
              sizes: "1080x1920",
              type: "image/jpg",
              form_factor: "narrow"
            },
            {
              src: "/screenshots/screenshot-wide.jpg",
              sizes: "1600x900",
              type: "image/jpg",
              form_factor: "wide"
            }
          ]
        },

        workbox: {
          // globDirectory: "dev-dist", 
          globPatterns: ['**/*.{js,css,html,svg,png,ico,json,webmanifest}'],
          globIgnores: ['vite.svg', '**/@vite/**', '**/src/**', '**/node_modules/**'],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          navigateFallback: '/index.html',
          runtimeCaching: [
            {
              urlPattern: /\/data\.json$/,
              handler: 'NetworkFirst', 
              options: {
                cacheName: 'json-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24, 
                },
              },
            },
            {
              urlPattern: /^http:\/\/localhost:5000\/users$/,
              handler: "NetworkFirst",
              options: {
                cacheName: "api-cache",
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 24 * 60 * 60, // Cache 1 ngày
                },
                networkTimeoutSeconds: 5,
              },
            },
          ],
        },

        devOptions: {
          enabled: false, 
          type: 'module',
          navigateFallback: 'index.html',
        },
      }),
    ],
    base: "https://github.com/quangndt3/PWA-Web.git", 
  });
