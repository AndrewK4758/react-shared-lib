/// <reference types='vitest' />
import { workspaceRoot } from '@nx/devkit';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/app-1',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4200,
    host: 'localhost',
  },

  experimental: {
    enableNativePlugin: true,
  },

  css: {
    modules: {
      localsConvention: 'camelCase' as const,
    },
    transformer: 'lightningcss' as const,
  },

  resolve: {
    alias: {
      '@btg/shred-ui': `${workspaceRoot}/packages/react-shared/src/index.ts`,
      '@btg/shred-ui/styles': `${workspaceRoot}/packages/react-shared/dist/index.css`,
    },
  },

  plugins: [react()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },

  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    name: 'app-1',
    watch: false,
    globals: true,
    environment: 'jsdom',
    reporters: [['default', { summary: false }]],
    coverage: {
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
