// import fetch from 'node-fetch'
// import puppeteer from "puppeteer";

const handler = async (event) => {
    try {
        // const browser = await puppeteer.launch();
        // const page = await browser.newPage();
        // await page.goto("https://pubdash.ezoic.com/dashboard");
        // await page.waitForSelector("button#LOGIN_BUTTON");
        console.log("found 2 button");

        const subject = event.queryStringParameters.name || "World";
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Hello ${subject}` }),
            // // more keys you can return:
            // headers: { "headerName": "headerValue", ... },
            // isBase64Encoded: true,
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};

module.exports = { handler };
