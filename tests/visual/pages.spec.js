// Visual regression tests: every page is captured viewport by viewport at several widths.
// Run `npm run test:visual`; to (re)create the baseline run `npm run test:visual:update`.
const {test, expect} = require('@playwright/test');

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
];

// Things whose position depends on time or on when the layout was measured (marquee, rotating badge,
// react-scroll-parallax image layers) are frozen so the shots are stable.
const FREEZE_CSS = `
  .parallax .scroller, .get-in-touch img,
  .home-cases .image > div, .footer-bg > div { transform: none !important; }
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
        const pending = [...document.images].filter((img) => !img.complete && nearViewport(img))
            .map((img) => new Promise((resolve) => { img.onload = img.onerror = resolve; }));
        await Promise.race([Promise.all(pending), new Promise((resolve) => setTimeout(resolve, 5000))]);
    });
    await page.waitForLoadState('networkidle');
    // IntersectionObserver callbacks + one framer-motion frame
    await page.waitForTimeout(400);
}

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
                await page.locator('.menu-icon .hamburger-react').click();
                await settle(page);
                await expect.soft(page).toHaveScreenshot(`${vp.name}/menu-open.png`);
            });
        }
    });
}
