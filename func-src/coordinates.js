import fetch from "node-fetch";

exports.handler = async (event, context) => {

    const API_ENDPOINT = "https://api.opencagedata.com/geocode/v1/json?key=9d61707dc7d9479491196d53aba7251f&q="+event.queryStringParameters["a"]+"&pretty=0&no_annotations=1";
    
    return fetch(API_ENDPOINT, { headers: {} })
    .then(response => response.json())
    .then(data => {
        var r = data.results[0].geometry
           
        return ({
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
            },
            body: `${r.lat},${r.lng}`})}
            )
    .catch(error => ({ statusCode: 422, body: String(error) }));
};