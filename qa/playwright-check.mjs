import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';

const baseUrl = 'http://127.0.0.1:4173/';
const browser = await chromium.launch({
  executablePath: '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});

async function settle(page) {
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  let formReady = true;
  try {
    await page.waitForFunction(() => document.body.innerText.includes('Secure form ready'), null, { timeout: 45000 });
  } catch {
    formReady = false;
  }
  await page.evaluate(async () => {
    const step = Math.max(400, window.innerHeight * 0.75);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 45));
    }
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = 'eager'; });
    await Promise.race([
      Promise.all([...document.images].map((img) => img.complete ? Promise.resolve() : new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      }))),
      new Promise((resolve) => setTimeout(resolve, 8000)),
    ]);
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  return formReady;
}

async function audit(page, label) {
  const data = await page.evaluate(() => {
    const images = [...document.images].map((img) => ({
      src: img.getAttribute('src'),
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }));
    const overflow = [...document.querySelectorAll('body *')]
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.right > document.documentElement.clientWidth + 1 || rect.left < -1;
      })
      .map((el) => ({ tag: el.tagName, className: el.className, right: Math.round(el.getBoundingClientRect().right), left: Math.round(el.getBoundingClientRect().left) }))
      .slice(0, 20);
    return {
      viewport: { width: innerWidth, height: innerHeight },
      document: {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
      },
      brokenImages: images.filter((img) => !img.complete || img.naturalWidth === 0),
      imageCount: images.length,
      hubspotForms: document.querySelectorAll('#hs-bussell-form form').length,
      primaryCtas: [...document.querySelectorAll('button')].filter((el) => el.textContent.toLowerCase().includes('get homes')).length,
      consentCheckedByDefault: Boolean(document.querySelector('#hs-bussell-form input[type=checkbox]:checked')),
      overflow,
      footerVisible: Boolean(document.querySelector('.site-footer')),
    };
  });
  return { label, ...data };
}

const results = [];

const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const desktopFormReady = await settle(desktop);
await desktop.screenshot({ path: '/home/ubuntu/bussell-landing/qa/desktop-full.png', fullPage: true });
results.push({ ...(await audit(desktop, 'desktop')), formReadyDuringAutomatedRun: desktopFormReady });
await desktop.locator('.filter-tabs button', { hasText: 'Valley Ridge' }).click();
results.push({ label: 'desktop-filter', visibleHomeCards: await desktop.locator('.home-card:visible').count() });
await desktop.close();

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
const mobileFormReady = await settle(mobile);
await mobile.screenshot({ path: '/home/ubuntu/bussell-landing/qa/mobile-full.png', fullPage: true });
results.push({ ...(await audit(mobile, 'mobile')), formReadyDuringAutomatedRun: mobileFormReady });
await mobile.locator('.menu-button').click();
results.push({ label: 'mobile-menu', open: await mobile.locator('.desktop-nav.open').isVisible() });
await mobile.locator('.menu-button').click();
await mobile.locator('.hero-actions button').first().click();
await mobile.waitForTimeout(700);
results.push({
  label: 'mobile-primary-cta',
  leadFormInViewport: await mobile.locator('#lead-form').evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < innerHeight && rect.bottom > 0;
  }),
});
await mobile.close();

await browser.close();
await fs.writeFile('/home/ubuntu/bussell-landing/qa/results.json', JSON.stringify(results, null, 2) + '\n');
console.log(JSON.stringify(results, null, 2));
