import {defineConfig} from '@playwright/test';

const PORT = 4173;

export default defineConfig({
    testDir: './tests/visual',
    snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
    fullyParallel: true,
    reporter: [['list'], ['html', {open: 'never', outputFolder: 'tests/visual/report'}]],
    outputDir: 'tests/visual/results',
    use: {
        baseURL: `http://localhost:${PORT}`,
        browserName: 'chromium',
        deviceScaleFactor: 1,
    },
    expect: {
        // strict: renders are deterministic, so any changed pixel is a real change to review
        toHaveScreenshot: {maxDiffPixels: 0, animations: 'disabled', caret: 'hide'},
    },
    webServer: {
        command: `node tests/visual/serve.mjs dist ${PORT}`,
        port: PORT,
        reuseExistingServer: !process.env.CI,
    },
});
