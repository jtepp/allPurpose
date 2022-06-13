import fetch from "node-fetch"
const matchAll = require('string.prototype.matchall');

const blacklist = [`https://m.media-amazon.com/images/I/216-OX9rBaL._SS200_.png`, `https://m.media-amazon.com/images/I/31DkPH3h2nL._SS200_.png`]

exports.handler = async (event) => {
    return fetch("https://www.amazon.com/s?k=" + event.queryStringParameters["q"])
        .then(res => res.text())
        .then(html => {
            let images = {
                images: [...matchAll(JSON.stringify(html), /\\\"s-image\\\".+?src=\\\"(.+?)\\\".+?srcset/g)].map(x => x[1]).filter(x => !blacklist.includes(x)),
            }

            return ({
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
                },
                body: JSON.stringify(images)
            })
        })
        .catch(error => ({
            statusCode: 422,
            body: String(error)
        }))



}