const { chromium } = require('playwright');

/**
 * Search YouTube for a video and return the first Video ID
 */
async function searchYouTube(query) {
    let browser;
    try {
        console.log(`[YouTube] Searching for: ${query}`);
        browser = await chromium.launch({ headless: true });
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();

        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

        // Wait for results to load
        try {
            await page.waitForSelector('ytd-video-renderer', { timeout: 10000 });
        } catch (e) {
            console.warn("[YouTube] No ytd-video-renderer found, trying backup...");
        }

        // Extract the first video link with multiple selector fallback
        const firstVideo = await page.evaluate(() => {
            const selectors = ['a#video-title', 'a#video-title-link', 'ytd-video-renderer a#thumbnail'];
            for (const selector of selectors) {
                const link = document.querySelector(selector);
                if (link) {
                    const href = link.getAttribute('href');
                    if (href && (href.includes('/watch?v=') || href.includes('v='))) {
                        const match = href.match(/v=([^&]+)/);
                        return {
                            id: match ? match[1] : null,
                            title: link.innerText.trim() || "YouTube Video"
                        };
                    }
                }
            }
            return null;
        });

        if (!firstVideo || !firstVideo.id) {
            throw new Error("No videos found for this query.");
        }

        console.log(`[YouTube] Found: ${firstVideo.title} (ID: ${firstVideo.id})`);
        return firstVideo;
    } catch (e) {
        console.error("[YouTube] Search failed:", e.message);
        throw e;
    } finally {
        if (browser) await browser.close();
    }
}

module.exports = { searchYouTube };
