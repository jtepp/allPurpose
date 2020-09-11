import fetch from "node-fetch";

exports.handler = async (event, context) => {
    const verify = event.queryStringParameters["verify"] 
    const offset = event.queryStringParameters["offset"] || 0
    const limit = event.queryStringParameters["limit"] || 1
const sub = event.queryStringParameters["sub"]
const sort = event.queryStringParameters["sort"].replace('!','?').split('?')
// const firstImg = event.queryStringParameters["firstImg"]
    const API_ENDPOINT = "https://reddit.com/r/"+sub+"/"+sort[0]+".json?"+sort[1]
    
    return fetch(API_ENDPOINT, { headers: {} })
    .then(response => response.json())
    .then(data => {
        // console.log(firstImg)
        var posts = []
        var d = data["data"]
        if (verify) return ({ //checks if subreddit returns more than 0 children
            statusCode: 200,
            body: `${d["dist"] != 0}`
        })
        var r = d["children"]
        var fImg = undefined;
            for (let i = offset; i<d["dist"]; i++){
                if (posts.length >= limit && fImg != undefined) {
                    posts.unshift(fImg)
                    return ({
                    statusCode: 200,
                    body: JSON.stringify(posts)
                })}

               const p = r[i]["data"]
               const post = new Post(p.title, p["author"], p.subreddit, String(p.ups), p.selftext, p.url, String(p.url.includes('.jpg') || p.url.includes('.png') || p.url.includes('.gif')))
               
                if ((p.url.includes('.jpg') || p.url.includes('.png') || p.url.includes('.gif')) && fImg == undefined)
                    fImg = post
               if(!r.pinned) posts.push(post)
            //    if (firstImg && (p.url.includes('.jpg') || p.url.includes('.png') || p.url.includes('.gif'))) return ({
            //     statusCode: 200,
            //     body: JSON.stringify([post])
            // })
            if(i == d["dist"]-1) return ({
                statusCode: 200,
                body: JSON.stringify([fImg,post])
            }) 
           }
        return ({
            statusCode: 200,
            body: JSON.stringify(posts)
        })
    }
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