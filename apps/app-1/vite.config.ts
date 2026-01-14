/// <reference types='vitest' />
import { workspaceRoot } from '@nx/devkit';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load env file from workspace root
  const env = loadEnv(mode, workspaceRoot, '');
  const appPort = parseInt(env.VITE_APP_PORT || '4200', 10);
  const appHost = env.VITE_APP_HOST || 'localhost';

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/app-1',
    server: {
      port: appPort,
      host: appHost,
    },
    preview: {
      port: appPort,
      host: appHost,
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
      alias: [
        {
          find: '@btg/shared-ui/styles',
          replacement: `${workspaceRoot}/packages/react-shared/src/lib/styles/theme.css`,
        },
        {
          find: '@btg/shared-ui',
          replacement: `${workspaceRoot}/packages/react-shared/src/index.ts`,
        },
      ],
    },

    plugins: [react()],

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
        include: [
          '{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ],
        reportsDirectory: './test-output/vitest/coverage',
        provider: 'v8' as const,
      },
    },
  };
});
