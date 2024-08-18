import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Lion App',
        short_name: 'App',
        description: 'Lion App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: '/lion-icon.png',
            sizes: '500x500',
            type: 'image/png',
          },
          {
            src: '/lion-icon.png',
            sizes: '500x500',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
