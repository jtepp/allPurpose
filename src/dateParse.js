export async function handler(event, context) {
let s = window.location.search
  try {
  if(s!=""){
    return {
      statusCode: 200,
      body: new Date(s.replace('?',''))
    } }else {return {
      statusCode: 200,
      body: new Date(event.body)
    }}
  } catch (e){
      return {
        statusCode: 400,
        body: e
      } 
    }
  }