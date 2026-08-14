import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
      '@components': resolve(import.meta.dirname, './src/components'),
      '@sections': resolve(import.meta.dirname, './src/sections'),
      '@data': resolve(import.meta.dirname, './src/data'),
      '@hooks': resolve(import.meta.dirname, './src/hooks'),
      '@utils': resolve(import.meta.dirname, './src/utils'),
      '@store': resolve(import.meta.dirname, './src/store'),
      '@assets': resolve(import.meta.dirname, './src/assets'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor'
          }
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
            return 'three'
          }
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/gsap')) {
            return 'animation'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion', 'gsap'],
  },
})

