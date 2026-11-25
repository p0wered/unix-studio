// Accessibility checks on the prerendered build: an axe-core audit of every page (WCAG 2.1 AA + best
// practices) and a few keyboard / structure checks axe can't do. Run: npm run test:a11y
import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = ['/', '/cases', '/about', '/services', '/contact', '/no-such-page'];

const VIEWPORTS = [
    {name: 'desktop', width: 1440, height: 900},
    {name: 'mobile', width: 375, height: 812},
];

/** Scroll through the page so every "reveal on scroll" element has been shown at least once. */
async function revealAll(page) {
    await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight / 2) {
            scrollTo({top: y, behavior: 'instant'});
            await new Promise((resolve) => setTimeout(resolve, 60));
        }
        scrollTo({top: 0, behavior: 'instant'});
    });
}

for (const vp of VIEWPORTS) {
    test.describe(`a11y ${vp.name}`, () => {
        test.use({viewport: {width: vp.width, height: vp.height}});

        for (const path of PAGES) {
            test(`axe ${path}`, async ({page}) => {
                await page.addInitScript(() => {
                    window.__VISUAL_TEST__ = true; // animations finish instantly
                });
                await page.goto(path);
                await page.waitForLoadState('networkidle');
                await revealAll(page);

                const {violations} = await new AxeBuilder({page})
                    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
                    .analyze();
                const summary = violations.map(
                    (v) => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.length} element(s)`,
                );
                expect(summary, 'axe violations').toEqual([]);

                // exactly one top-level heading per page
                await expect(page.locator('h1')).toHaveCount(1);
            });
        }
    });
}

test('first Tab reaches "Skip to content", which moves focus to the main content', async ({page}) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', {name: 'Skip to content'});
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
});

test('mobile menu: opens from the keyboard, Escape closes it, closed menu is not focusable', async ({page}) => {
    await page.setViewportSize({width: 375, height: 812});
    await page.goto('/');
    const menu = page.getByRole('navigation', {name: 'Menu', includeHidden: true});
    await expect(menu).toHaveAttribute('inert', '');

    await page.getByRole('button', {name: 'Toggle menu'}).focus();
    await page.keyboard.press('Enter');
    await expect(menu).not.toHaveAttribute('inert');
    await expect(page.getByRole('button', {name: 'Toggle menu'})).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('inert', '');
});
