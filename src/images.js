import fetch from "node-fetch";

exports.handler = async (event, context) => {

    const API_ENDPOINT = "https://www.google.com/search?q="+event.queryStringParameters["q"]+"&tbm=isch&safe=active";

        //give img
    if (event.queryStringParameters["img"]!=undefined)
  return fetch(API_ENDPOINT, { headers: {} })
    .then(response => response.text())
    .then(data => {
        return fetch(data.match(/(?<=<img.+?alt.+?src=").+?(?=")/)[0])
        .then(res => res.text())
        .then(data => ({
            statusCode: 200,
            body: data}))
        })
    .catch(error => ({ statusCode: 422, body: String(error) }));
    
    else if (event.queryStringParameters["url"]!=undefined)//give url
    return fetch(API_ENDPOINT, { headers: {} })
    .then(response => response.text())
    .then(data => {
        return data.match(/(?<=<img.+?alt.+?src=").+?(?=")/)[0]})
    .catch(error => ({ statusCode: 422, body: String(error) }));
    
    else if (event.queryStringParameters["b64"]!=undefined)//give b64
    return fetch('https://www.google.com/search?q='+event.queryStringParameters["q"], { headers: {} })
    .then(response => response.text())
    .then(data => ({
            statusCode: 200,
            body: data.match(/(?<=data:image\/jpeg\;base64,).+?(?=')/)[0].split('\\').join('')}))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
