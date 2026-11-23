/// <reference types="vitest/config" />
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        extends: true,
        // Runs every story as a test (renders + play functions + a11y checks).
        plugins: [storybookTest({ configDir: path.join(import.meta.dirname, '.storybook') })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            // Set PLAYWRIGHT_CHROMIUM_PATH to reuse an existing Chromium instead of `npx playwright install chromium`.
            provider: playwright({
              launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
                ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
                : {},
            }),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
