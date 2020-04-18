const puppeteer = require('puppeteer');

async function getPic() {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://google.com');
        await page.screenshot({ path: 'google.png' });
        page.waitFor(1000);
        await browser.close();
    } catch (e) {
        console.log(e);
    }
}

getPic();