export async function handler(event, context) {
    var eee = "success"
const Email = require('email').Email
var msg = new Email({
    from: "jtepp@icloud.com",
    to: "jptepp@gmail.com",
    subject: "TEST",
    body: "DFLD:SFJDSL:KFJDLFKJ"
})

msg.send(function(err){
    console.log(err)
    eee = err
})


return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
    },
    body: eee
  }
}