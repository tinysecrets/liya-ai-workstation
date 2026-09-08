/* global require, process */
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent('<h1>ok</h1>');
    await page.title().catch(() => { });
    console.log('[smoke-browser] chromium launched OK. version:', browser.version());
    await browser.close().catch(() => { });
    process.exit(0);
})().catch((err) => {
    console.error('[smoke-browser] FAILED to launch chromium:', err.message);
    process.exit(1);
});