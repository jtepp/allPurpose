export async function handler(event, context) {

  const nodemailer = require('nodemailer');

  let recipient = valid(event.queryStringParameters["r"]) || "jtepp@icloud.com"

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
    subject: 'Sending Email using Node.js',
    text: `Hi Smartherd, thank you for your nice Node.js tutorials.
            I will donate 50$ for this course. Please send me payment options.`
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        },
        body: JSON.stringify(error)
      }
      
    } else {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        },
        body: "success"
      }
      
    }
  });


}

function valid(email){
  if (email) {
    if (email.match(/.+?@.+?\..+?/g) != null){
      return email;
    }
  }
  return null
}