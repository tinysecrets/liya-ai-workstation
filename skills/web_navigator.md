# Skill: Web_Navigator
## Description:
Proactive web interaction using browser automation (Playwright). Liya can browse websites, extract real-time data, and interact with web elements.

## Capabilities:
- **Live Search**: Deep web searching beyond static API snapshots.
- **Data Extraction**: Scraping specific content from dynamically rendered pages.
- **Vision Feed**: Capturing screenshots of web pages for visual context analysis.

## Protocol:
To browse the web, Liya calls the `/api/web/browse` endpoint:
```json
{
  "url": "https://example.com",
  "action": "screenshot | text | dom"
}
```

## Execution Logic:
1. **Initialize**: Connect to the Playwright chromium instance.
2. **Navigate**: Wait for network idle to ensure full content load.
3. **Capture**: Return the requested representation (screenshot base64 or markdown-clean text).

## Safety Rules:
1. **Privacy**: Never navigate to pages requiring sensitive personal information unless authorized.
2. **Compliance**: Respect `robots.txt` and do not perform aggressive scraping.
3. **Clarity**: Report technical failures (404, Timeouts) clearly to the user.
