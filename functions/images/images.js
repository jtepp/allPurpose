import fetch from "node-fetch";
import { CookieJar } from "tough-cookie";
import fetchCookie from "fetch-cookie";

// Helper to fetch HTML with cookies (handles redirects and session state)
async function fetchWithCookies(url) {
    const jar = new CookieJar();
    const fetchWithJar = fetchCookie(fetch, jar);

    const browserHeaders = {
        "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        Referer: "https://www.google.com/",
        "Upgrade-Insecure-Requests": "1",
    };

    const response = await fetchWithJar(url, {
        headers: browserHeaders,
    });
    return await response.text();
}

exports.handler = async (event, context) => {
    const API_ENDPOINT =
        "https://www.google.com/search?q=" +
        event.queryStringParameters["q"] +
        "&tbm=isch&safe=active";
    var slyce = 0;
    var offset = 0;
    if (event.queryStringParameters["offset"] !== undefined) {
        if (event.queryStringParameters["offset"] < 0) {
            offset = 0;
            slyce = -1;
        } else offset = event.queryStringParameters["offset"];
    }

    //         //give img
    //     if (event.queryStringParameters["img"]!==undefined)
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

    if (event.queryStringParameters["debug"] !== undefined) {
        // Debug mode: return raw HTML snippet
        try {
            const html = await fetchWithCookies(API_ENDPOINT);
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    snippet: html,
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
    if (event.queryStringParameters["b64"] !== undefined) {
        //give b64
        try {
            const data = await fetchWithCookies(API_ENDPOINT);
            const matches = data.match(
                /(?<=data:image\/jpeg;base64,).+?(?='|")/g,
            );
            if (!matches || matches.length === 0) {
                return {
                    statusCode: 404,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify({
                        error: "No base64 images found",
                        data,
                    }),
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
            body: "Please specify output as ?b64",
        };
    }
};
//repush

// if (event.queryStringParameters["url"] !== undefined) {
//     //give url
//     try {
//         const data = await fetchWithCookies(API_ENDPOINT);
//         const matches = data.match(/(?<=<img.+?alt.+?src=").+?(?='|")/g);
//         if (!matches || matches.length === 0) {
//             return {
//                 statusCode: 404,
//                 headers: {
//                     "Access-Control-Allow-Origin": "*",
//                     "Access-Control-Allow-Credentials": true,
//                 },
//                 body: "No images found",
//             };
//         }
//         offset %= matches.length;
//         return {
//             statusCode: 200,
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Credentials": true,
//             },
//             body: matches[offset],
//         };
//     } catch (error) {
//         return {
//             statusCode: 422,
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Credentials": true,
//             },
//             body: String(error),
//         };
//     }
// }
