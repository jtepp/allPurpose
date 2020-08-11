export async function handler(event, context) {
try {
    return {
      statusCode: 200,
      body: Date(event.body)
    }} catch (e){
      return {
        statusCode: 400,
        body: e
      } 
    }
  }