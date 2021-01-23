export async function handler(event, context) {

  const nodemailer = require('nodemailer');
  var msg = "a"
  let recipient = valid(event.queryStringParameters["r"]) ||  "jtepp@icloud.com"
  let sub = event.queryStringParameters["s"] || "no subject"
  let txt = event.queryStringParameters["t"] || ""
  let h = event.queryStringParameters["h"] || ""

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'iconsrequestservice@gmail.com',
      pass: 'icons724A'
    }
  });

  var mailOptions = {
    from: 'Your Icons Order <iconsrequestservice@gmail.com>',
    to: recipient,
    subject: sub,
    text: txt,
    html: h        
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      msg = error
    } else {
     msg = "success"
      }
      
  });
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
    },
    body: "success"
  }
}

function valid(email){
  if (email) {
    if (email.match(/.+?@.+?\..+?/g) != null){
      return email;
    }
  }
  return null
}