import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const browser = await chromium.launch({
  executablePath: '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});

async function runAudit(name, viewport, isMobile = false) {
  const context = await browser.newContext({ viewport, isMobile, hasTouch: isMobile });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  try {
    await page.waitForFunction(() => document.body.innerText.includes('Secure form ready'), null, { timeout: 45000 });
  } catch {
    // The third-party HubSpot script may be slow in headless CI; audit the available DOM regardless.
  }
  await page.evaluate(() => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible')));
  await page.waitForTimeout(1800);
  const results = await new AxeBuilder({ page }).analyze();
  await context.close();
  return {
    name,
    viewport,
    violations: results.violations.map((item) => ({
      id: item.id,
      impact: item.impact,
      help: item.help,
      helpUrl: item.helpUrl,
      nodes: item.nodes.map((node) => ({ target: node.target, html: node.html, failureSummary: node.failureSummary })),
    })),
    passes: results.passes.length,
    incomplete: results.incomplete.length,
  };
}

const report = [
  await runAudit('desktop', { width: 1440, height: 1000 }),
  await runAudit('mobile', { width: 390, height: 844 }, true),
];

await browser.close();
await fs.writeFile('/home/ubuntu/bussell-landing/qa/accessibility-results.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report.map((item) => ({ name: item.name, violations: item.violations.length, passes: item.passes, incomplete: item.incomplete })), null, 2));
