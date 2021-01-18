const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {
    const pageToScreenshot = "https://jacobtepperman.com"
    const browser = await puppeteer.launch({
        // Required
        executablePath: await chromium.executablePath,

        // Optional
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless
    });
    const page = await browser.newPage();

    await page.goto(pageToScreenshot);

    const screenshot = await page.screenshot({ encoding: 'binary' });

    await browser.close();
  
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        },
        body: JSON.stringify({ 
            message: `Complete screenshot of ${pageToScreenshot}`, 
            buffer: screenshot 
        })
    }
}