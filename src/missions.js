import fetch from "node-fetch";

exports.handler = async (event, context) => {

    const API_ENDPOINT = "https://spaceflightnow.com/launch-schedule";
    
    
    return fetch(API_ENDPOINT, { headers: {} })
    .then(response => response.text())
    .then(data => {
        
        const name = special(data.match(/(?<=mission">).+?(?=\<)/)).split(' • ')
        const date = special(getFirst(data.match(/<span class="launchdate">\n([\s\S]*?)<\/span>/g)))
        let launchTime = special(getFirst(data.match(/Launch (window|time|period):<\/span>([\s\S]*?)<br>/g)))
        const exact = /(\d+:)?(\d+:)?\d+ (a.m.|p.m.)/
        if (launchTime.match(exact)) launchTime = launchTime.match(exact)[0]
        const description = special(getFirst(data.match(/<div class="missdescrip">\n<p>([\s\S]*)<\/p>/g)))
        let mission = {}

        


            if (event.queryStringParameters["ifttt"])
            {mission = {
                value1: `${name.join(" - ")}`,
                value2: `${launchTime} on ${date}`,
                value3: "https://allpurpose.netlify.app/resources/"+imgName(name.join(" - ").toLowerCase())+".png",
            }}
        
            else mission = {
            rocket: name[0],
            payload: name[1],
            date: date,
            time: launchTime,
            description: description
        }

           
           
        return ({
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
            },
            body: JSON.stringify(mission)})
        })
    .catch(error => ({ statusCode: 422, body: String(error) }));
};

function special(input){
    return String(input).split('&#8220;').join('\"').split('&#8221;').join('\"').split('&#8217;').join('\'').split('<U>').join('').split('</U>').join('').split('))').join(')')
}


function getFirst(input){
    if (input && input.length > 0) return input[0]
    else return ""
}

function imgName(name) {



        if (name.match(/ariane|vega/))
            return "arianespace-logo"
            
            else if (name.match(/rocket \d+.\d+/))
            {return "astra-logo"}
            
            else if (name.match(/cz-|lm-|shenzou|long march/))
            {return "cnsa-logo"}
            
            else if (name.match(/slv/))
            {return "isro-logo"}
            
            else if (name.match(/antares|cygnus|pegasus|minotaur|peacekeeper/))
            {return "orbital-logo"}
            
            else if (name.match(/electron|photon/))
            {return "rocketlab-logo"}
            
            else if (name.match(/soyuz|angara/))
            {return "roscosmos-logo"}
            
            else if (name.match(/falcon/))
            {return "spacex-logo"}
            
            else if (name.match(/delta|atlas|vulcan|centaur/))
            {return "ula-logo"}
            
            else if (name.match(/launcherone/))
            {return "virgin-logo"}
            
            else
            {return "rocket-icon"}
            

}