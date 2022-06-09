import fetch from "node-fetch"


exports.handler = async (event, context) => {
    return fetch("https://www.amazon.com/s?k=" + event.queryStringParameters["q"])
        .then(res => res.text())
        .then(html => {
            return ({
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
                },
                body: html
            })
        })
        .catch(error => ({
            statusCode: 422,
            body: String(error)
        }))



}