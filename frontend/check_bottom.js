const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('file://' + __dirname + '/main.html', { waitUntil: 'networkidle0' });
    
    // Evaluate the document to find what's at the very bottom
    const result = await page.evaluate(() => {
        const bodyRect = document.body.getBoundingClientRect();
        const htmlRect = document.documentElement.getBoundingClientRect();
        const footer = document.querySelector('footer');
        const footerRect = footer ? footer.getBoundingClientRect() : null;
        
        // Find elements with bottom > footerRect.bottom
        let lowerElements = [];
        if (footerRect) {
            const all = document.querySelectorAll('body *');
            for(let i=0; i<all.length; i++) {
                const el = all[i];
                if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'NOSCRIPT' || getComputedStyle(el).display === 'none') continue;
                const rect = el.getBoundingClientRect();
                if (rect.bottom > footerRect.bottom + 5) {
                    lowerElements.push({
                        tag: el.tagName,
                        id: el.id,
                        className: el.className,
                        bottom: rect.bottom,
                        height: rect.height,
                        footerBottom: footerRect.bottom
                    });
                }
            }
        }
        
        return {
            bodyBottom: bodyRect.bottom,
            htmlBottom: htmlRect.bottom,
            footerBottom: footerRect ? footerRect.bottom : null,
            lowerElements: lowerElements
        };
    });
    
    console.log(JSON.stringify(result, null, 2));
    await browser.close();
})();
