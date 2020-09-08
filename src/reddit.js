import fetch from "node-fetch";

exports.handler = async (event, context) => {
    
    const limit = event.queryStringParameters["limit"] || 1
const sub = event.queryStringParameters["sub"]
const sort = event.queryStringParameters["sort"]
    const API_ENDPOINT = "https://reddit.com/r/"+sub+"/"+sort+".json"
    
    return fetch(API_ENDPOINT, { headers: {} })
    .then(response => response.json())
    .then(data => {
        var posts = []
        var r = data["data"]["children"]
            for (let i = 0; i<limit; i++){
               const p = r[i]["data"]
               posts.push(new Post(p.title, p["author"], p.subreddit, String(p.ups), p.selftext, p.url, String(p.url.includes('.jpg') || p.url.includes('.png') || p.url.includes('.gif'))))
           }
        return ({
            statusCode: 200,
            body: JSON.stringify(posts)
        })}
            )
    .catch(error => ({ statusCode: 422, body: String(error) }));
};

class Post {
    constructor(title, author, sub, ups, text, url, image){
        this.title = title
        this.author = author
        this.sub = sub
        this.ups = ups
        this.text = text
        this.url = url
        this.image = image
    }

}