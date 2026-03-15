import { chromium } from '@playwright/test';

const BASE = 'http://localhost:3000';
const DIR = '/Users/alienard/Code/bdi_2023/screenshots';

const pages = [
  { name: 'events', path: '/fr/events' },
  { name: 'bds', path: '/fr/bds' },
  { name: 'authors', path: '/fr/authors' },
];

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'desktop', width: 1280, height: 900 },
];

(async () => {
  const browser = await chromium.launch();

  for (const page of pages) {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
      });
      const p = await context.newPage();
      await p.goto(`${BASE}${page.path}`, { waitUntil: 'load', timeout: 30000 });
      await p.waitForTimeout(500);

      await p.screenshot({
        path: `${DIR}/${page.name}-${vp.name}.png`,
        fullPage: false,
      });

      await context.close();
      console.log(`✓ ${page.name}-${vp.name}`);
    }
  }

  await browser.close();
})();
