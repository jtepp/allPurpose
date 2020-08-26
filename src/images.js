import fetch from "node-fetch";

exports.handler = async (event, context) => {

    const API_ENDPOINT = "https://www.google.com/search?q="+event.queryStringParameters["q"]+"&tbm=isch&safe=active";
    var slyce = 0
    var offset = 0
    if (event.queryStringParameters["offset"]!=undefined) {
        if (event.queryStringParameters["offset"]<0)
        {
            offset = 0
            slyce = -1
        }
        else 
        offset = event.queryStringParameters["offset"]
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
    
    if (event.queryStringParameters["url"]!=undefined)//give url
    return fetch(API_ENDPOINT, { headers: {} })
    .then(response => response.text())
    .then(data => {
        offset %= [...data.matchAll(/(?<=<img.+?alt.+?src=").+?(?=")/g)][0].slice(slyce)[offset].length
        return ({
            statusCode: 200,
            body: [...data.matchAll(/(?<=<img.+?alt.+?src=").+?(?=")/g)][0].slice(slyce)[offset]})}
            )
    .catch(error => ({ statusCode: 422, body: String(error) }));
    
    else if (event.queryStringParameters["b64"]!=undefined)//give b64
    return fetch('https://www.google.com/search?q='+event.queryStringParameters["q"], { headers: {} })
    .then(response => response.text())
    .then(data => {
        
            offset %= [...data.matchAll(/(?<=data:image\/jpeg\;base64,).+?(?='|")/g)].length
        return ({
            statusCode: 200,
            body: [...data.matchAll(/(?<=data:image\/jpeg\;base64,).+?(?='|")/g)].slice(slyce)[offset][0].split('\\').join('')})}
            )
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
//repush