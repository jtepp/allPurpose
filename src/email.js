
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export async function handler(event, context) {
  try {
    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "group724a@outlook.com",
            pass: "icons724A"
        }
    })

    const options = {
        from :"group724a@outlook.com",
        to: "jtepp@icloud.com",
        subject: "TEST",
        text: "SDFOIDSJF"
    }

    transporter.sendMail(options, (err, info)=>{
        if (err) {
           console.log(err)
            return
        }
        console.log("Sent: "+info.response)
    })


return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
    },
    body: JSON.stringify(info.messageId)
  }}
  catch (err) {
    return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        },
        body: JSON.stringify(err)
      }
  }
}
