export async function handler(event, context) {
    var s = event.queryStringParameters["a"].toLowerCase()

    //deal with TBD
    if(s.includes("tbd"))
    return {
      statusCode: 200,
      body: "TBD"
    }
    
    //deal with quarter
    if(s.includes("quarter"))return {
      statusCode: 200,
      body: "TBD"
    }
    
    
    
    //default year to 2020
    if(!s.match(/\d{4}/)) s=new Date().getFullYear()+" "+s //add 2020 if no year found
    
    //deal with NET
    if(s.includes('net')) s=s.replace('net','')
    
    //deal with 26/27
    if(s.match(/\d+\/\d+/)){
      let x = s.match(/(?<=\d+)\/\d+/)
     s = s.replace(x,'')
    }
    
    //deal with Aug. 31/Sept. 1
    if(s.match(/.+?\d\/.+?\d/)){
    let ss = s.replace('2020 ','')
    let x = ss.match(/(.+?\d)\/(.+?\d)/)
    s = '2020 '+x[1]
    }
    
    //deal with early
    if(s.includes('early')) s=s.replace('early','01 01')
    
    //deal with late
    if(s.includes('late')) s=s.replace('late','sep 20')
    
    //deal with mid-
    if(s.includes('mid-')) s=s.replace('mid-','15 ')
    
    
      try {
        let r = new Date(s).toDateString()
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
          },
          body: r
        }
      } catch (e){
          return {
            statusCode: 400,
            body: e
          } 
        }
      }

      function noSuffix(s) {
        return s.split('th').joiin('').split('rd').joiin('').split('st').joiin('').split('nd').joiin('')
      }