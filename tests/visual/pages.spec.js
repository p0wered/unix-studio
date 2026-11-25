// Visual regression tests: every page is captured viewport by viewport at several widths.
// Run `npm run test:visual`; to (re)create the baseline run `npm run test:visual:update`.
import {test, expect} from '@playwright/test';

const PAGES = [
    {name: 'home', path: '/'},
    {name: 'cases', path: '/cases'},
    {name: 'about', path: '/about'},
    {name: 'services', path: '/services'},
    {name: 'contact', path: '/contact'},
];

const VIEWPORTS = [
    {name: 'mobile', width: 375, height: 812},
    {name: 'tablet', width: 860, height: 1000},
    {name: 'laptop', width: 1280, height: 800},
    {name: 'desktop', width: 1600, height: 900},
    // ultrawide 34" (3440x1440): backgrounds scaled by width get cropped differently
    {name: 'ultrawide', width: 3440, height: 1440},
];

// Things whose position depends on time or on when the layout was measured (marquee, rotating badge text,
// react-scroll-parallax image layers) are frozen, and the custom cursor is hidden, so the shots are stable.
// Component classes are CSS-module hashes, so the app marks these with data-testid.
const FREEZE_CSS = `
  [data-testid="marquee"], [data-testid="parallax-layer"], .circular-text__ring { transform: none !important; }
  /* react-animated-cursor (no class names): follows the mouse and animates on hover */
  #root > div[style*="z-index: 999"][style*="pointer-events: none"] { display: none !important; }
`;

async function settle(page) {
    await page.waitForLoadState('networkidle');
    await page.evaluate(async () => {
        await document.fonts.ready;
        // lazy images far from the viewport (or hidden with display:none) never start loading,
        // so only wait for the visible ones
        const nearViewport = (img) => {
            const r = img.getBoundingClientRect();
            return r.width > 0 && r.bottom > -innerHeight && r.top < innerHeight * 2;
        };
        const visible = [...document.images].filter(nearViewport);
        const pending = visible.filter((img) => !img.complete)
            .map((img) => new Promise((resolve) => { img.onload = img.onerror = resolve; }));
        await Promise.race([Promise.all(pending), new Promise((resolve) => setTimeout(resolve, 5000))]);
        // fully decoded, not just downloaded (decoding="async" images can paint a frame later).
        // Only loaded ones: a lazy image that never starts loading (e.g. a carousel card off to the side)
        // would keep decode() pending forever.
        const decoded = visible.filter((img) => img.complete && img.naturalWidth > 0).map((img) => img.decode().catch(() => {}));
        await Promise.race([Promise.all(decoded), new Promise((resolve) => setTimeout(resolve, 3000))]);
    });
    await page.waitForLoadState('networkidle');
    // IntersectionObserver callbacks + motion frames, and time for Chrome to re-raster images in full
    // quality after the scroll (it uses cheaper image filtering while scrolling)
    await page.waitForTimeout(700);
}

// the home page is ~10 screens long, each settled for ~1s
test.describe.configure({timeout: 90_000});

for (const vp of VIEWPORTS) {
    test.describe(vp.name, () => {
        test.use({viewport: {width: vp.width, height: vp.height}});

        for (const p of PAGES) {
            test(p.name, async ({page}) => {
                await page.addInitScript(() => { window.__VISUAL_TEST__ = true; });
                await page.goto(p.path);
                await page.addStyleTag({content: FREEZE_CSS});
                await settle(page);

                const total = await page.evaluate(() => document.documentElement.scrollHeight);
                const steps = Math.ceil(total / vp.height);
                for (let i = 0; i < steps; i++) {
                    await page.evaluate((y) => window.scrollTo({top: y, behavior: 'instant'}), i * vp.height);
                    await settle(page);
                    await expect.soft(page).toHaveScreenshot(`${vp.name}/${p.name}-${String(i).padStart(2, '0')}.png`);
                }
            });
        }

        if (vp.width < 720) {
            test('mobile-menu', async ({page}) => {
                await page.addInitScript(() => { window.__VISUAL_TEST__ = true; });
                await page.goto('/');
                await page.addStyleTag({content: FREEZE_CSS});
                await settle(page);
                await page.locator('.hamburger-react').click();
                await settle(page);
                await expect.soft(page).toHaveScreenshot(`${vp.name}/menu-open.png`);
            });
        }
    });
}
