import fetch from "node-fetch"


exports.handler = async (event, context) => {
    var html;

    await fetch("https://www.amazon.com/s?k=" + event.queryStringParameters["q"])
        .then(res => res.text())
        .then(body => html = body);

    return ({
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
            },
            body: html
        })
        .catch(error => ({
            statusCode: 422,
            body: String(error)
        }))
}