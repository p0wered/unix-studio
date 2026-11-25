import {defineConfig} from '@playwright/test';

const PORT = 4173;
// which build to serve: CI first serves the base branch's build to record the baseline, then this one
const DIST = process.env.VISUAL_DIST ?? 'dist';

export default defineConfig({
    testDir: './tests',
    snapshotPathTemplate: '{testDir}/visual/__screenshots__/{arg}{ext}',
    fullyParallel: true,
    // one retry absorbs rare GPU raster noise in image filtering; a real change fails both attempts
    retries: 1,
    reporter: [['list'], ['html', {open: 'never', outputFolder: 'tests/report'}]],
    outputDir: 'tests/results',
    use: {
        baseURL: `http://localhost:${PORT}`,
        browserName: 'chromium',
        deviceScaleFactor: 1,
    },
    expect: {
        // strict: up to 100 changed pixels is GPU raster noise on images; real changes seen so far were
        // hundreds (a changed word) to tens of thousands (a colour) of pixels.
        // threshold 0.01 (default 0.2) also catches subtle colour changes, e.g. one shade of dark grey for another
        toHaveScreenshot: {maxDiffPixels: 100, threshold: 0.01, animations: 'disabled', caret: 'hide'},
    },
    webServer: {
        command: `node tests/serve.mjs ${DIST} ${PORT}`,
        port: PORT,
        reuseExistingServer: !process.env.CI,
    },
});
