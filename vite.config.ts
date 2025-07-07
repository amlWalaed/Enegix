import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'node:path'
import fs from 'node:fs'

function getUIComponentFolders() {
  const uiDirectory = path.resolve('./src/components/ui') // Change this to your UI components directory path
  const folders = fs
    .readdirSync(uiDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
  return folders
}
const uiComponents = getUIComponentFolders()

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      include: [/\.[tj]sx?$/],
      dirs: ['./src/utils', './src/composables'],
      vueTemplate: true,
      dts: true,
    }),
    Components({
      dts: './auto-components.d.ts',
      resolvers: [
        {
          resolve: (componentName) => {
            if (['RouterLink'].includes(componentName)) {
              return {
                name: componentName,
                from: 'vue-router',
              }
            }
          },
          type: 'component',
        },
      ],

      directoryAsNamespace: true,
      collapseSamePrefixes: true,
      globalNamespaces: [
        'src',
        'views',
        'Layouts',
        'layouts',
        'Partials',
        'partials',
        'Components',
        'components',
        'ui',
        'app',
        ...uiComponents,
      ],
      dirs: ['./src/'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
