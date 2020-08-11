export async function handler(event, context) {
const url = require('url')
var s = event.queryStringParameters["a"].toLowerCase()
// if(s.contains("TBD"))
// console.log(s)
if(s.includes("tbd"))
return {
  statusCode: 200,
  body: "TBD"
}
//default year to 2020
if(!s.match(/\d{4}/)) s="2020 "+s //add 2020 if no year found

//deal with NET
if(s.includes('net')) s=s.replace('net','')

//deal with 6/7
if(s.match(/\d\/\d/)){
  let x = s.match(/(?<=\d)\/\d/)
 s = s.replace(x,'')
}

//deal with early
if(s.includes('early')) s=s.replace('early','01 01')

//deal with late
if(s.includes('late')) s=s.replace('late','sep 20')

  try {
    let r = new Date(s).toDateString()
    return {
      statusCode: 200,
      body: r
    }
  } catch (e){
      return {
        statusCode: 400,
        body: e
      } 
    }
  }