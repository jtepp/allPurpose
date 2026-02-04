import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

exports.handler = async (event, context) => {
    const API_ENDPOINT =
        "https://www.google.com/search?q=" +
        event.queryStringParameters["q"] +
        "&tbm=isch&safe=active";
    var slyce = 0;
    var offset = 0;
    if (event.queryStringParameters["offset"] != undefined) {
        if (event.queryStringParameters["offset"] < 0) {
            offset = 0;
            slyce = -1;
        } else offset = event.queryStringParameters["offset"];
    }

    //         //give img
    //     if (event.queryStringParameters["img"]!=undefined)
    //   return fetch(API_ENDPOINT, { headers: {} })
    //     .then(response => response.text())
    //     .then(data => {
    //         return fetch(data.match(/(?<=<img.+?alt.+?src=").+?(?=")/g)[0])
    //         .then(res => res.text())
    //         .then(data => ({
    //             statusCode: 200,
    //             body: data}))
    //         })
    //     .catch(error => ({ statusCode: 422, body: String(error) }));

    // Helper to fetch HTML with a real browser (handles cookies, JS, redirects)
    async function fetchWithBrowser(url) {
        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });
        try {
            const page = await browser.newPage();
            await page.setUserAgent(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
            );
            await page.goto(url, { waitUntil: "networkidle2" });
            const html = await page.content();
            return html;
        } finally {
            await browser.close();
        }
    }

    if (event.queryStringParameters["debug"] != undefined) {
        // Debug mode: return raw HTML snippet
        try {
            const html = await fetchWithBrowser(API_ENDPOINT);
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    snippet: html.slice(0, 500),
                    length: html.length,
                }),
            };
        } catch (error) {
            return {
                statusCode: 422,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: String(error),
            };
        }
    }

    if (event.queryStringParameters["url"] != undefined) {
        //give url
        try {
            const data = await fetchWithBrowser(API_ENDPOINT);
            const matches = data.match(/(?<=<img.+?alt.+?src=").+?(?='|")/g);
            if (!matches || matches.length === 0) {
                return {
                    statusCode: 404,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: "No images found",
                };
            }
            offset %= matches.length;
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: matches[offset],
            };
        } catch (error) {
            return {
                statusCode: 422,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: String(error),
            };
        }
    } else if (event.queryStringParameters["b64"] != undefined) {
        //give b64
        try {
            const data = await fetchWithBrowser(
                "https://www.google.com/search?q=" +
                    event.queryStringParameters["q"],
            );
            const matches = data.match(
                /(?<=data:image\/jpeg\;base64,).+?(?='|")/g,
            );
            if (!matches || matches.length === 0) {
                return {
                    statusCode: 404,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: "No base64 images found",
                };
            }
            offset %= matches.length;
            const cleanedB64 = matches
                .slice(slyce)
                [offset].split("\\x3d")
                .join("")
                .split("\\")
                .join("");
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: cleanedB64,
            };
        } catch (error) {
            return {
                statusCode: 422,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: String(error),
            };
        }
    } else {
        return {
            statusCode: 422,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: "Please specify output as ?b64 or ?url",
        };
    }
};
//repush
