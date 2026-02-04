import fetch from "node-fetch";

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

    const browserHeaders = {
        "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        Referer: "https://www.google.com/",
    };

    if (event.queryStringParameters["url"] != undefined) {
        //give url
        return fetch(API_ENDPOINT, { headers: browserHeaders })
            .then((response) => response.text())
            .then((data) => {
                offset %= [
                    ...data.match(/(?<=<img.+?alt.+?src=").+?(?='|")/g),
                ][0].slice(slyce)[offset].length;
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: [
                        ...data.match(/(?<=<img.+?alt.+?src=").+?(?='|")/g),
                    ][0].slice(slyce)[offset],
                };
            })
            .catch((error) => ({
                statusCode: 422,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: String(error),
            }));
    } else if (event.queryStringParameters["b64"] != undefined) {
        //give b64
        return fetch(
            "https://www.google.com/search?q=" +
                event.queryStringParameters["q"],
            { headers: browserHeaders },
        )
            .then((response) => response.text())
            .then((data) => {
                offset %= [
                    ...data.match(/(?<=data:image\/jpeg\;base64,).+?(?='|")/g),
                ].length;
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                    },
                    body: [
                        ...data.match(
                            /(?<=data:image\/jpeg\;base64,).+?(?='|")/g,
                        ),
                    ]
                        .slice(slyce)
                        [offset][0].split("\\x3d")
                        .join("")
                        .split("\\")
                        .join(""),
                };
            })
            .catch((error) => ({
                statusCode: 422,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: String(error),
            }));
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
