export async function handler(event, context) {
const url = require('url')
const s = event.queryStringParameters["a"]
  try {
  if(s){
    let r = new Date(s).toDateString()
    return {
      statusCode: 200,
      body: r
    } }else {
      let r = new Date(s).toDateString()
      return {
      statusCode: 200,
      body: r
    }}
  } catch (e){
      return {
        statusCode: 400,
        body: e
      } 
    }
  }