
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export async function handler(event, context) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "jtepp@icloud.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
    },
    body: JSON.stringify(info)
  }
}

// main().catch(console.error);

// export async function handler(event, context) {
//     var eee = "success"
// const Email = require('email').Email
// var msg = new Email({
//     from: "jtepp@icloud.com",
//     to: "jptepp@gmail.com",
//     subject: "TEST",
//     body: "DFLD:SFJDSL:KFJDLFKJ"
// })

// msg.send(function(err){
//     console.log(err)
//     eee = err
// })


// return {
//     statusCode: 200,
//     headers: {
//       "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
//       "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
//     },
//     body: eee
//   }
// }