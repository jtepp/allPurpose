export async function handler(event, context) {

  const r = "Successfully recieved web request with parameters: " + JSON.stringify(event.queryStringParameters)


  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
    },
    body: r
  }

}