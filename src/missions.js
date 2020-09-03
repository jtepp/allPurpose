import fetch from "node-fetch";

exports.handler = async (event, context) => {

    const API_ENDPOINT = "https://spaceflightnow.com/launch-schedule";
    
    
    return fetch(API_ENDPOINT, { headers: {} })
    .then(response => response.text())
    .then(data => {
        
        const name = special(data.match(/(?<=mission">).+?(?=\<)/)).split(' • ')
        const date = special(data.match(/(?<=launchdate">).+?(?=\<)/))
        let launchTime = special(data.match(/(?<=Launch (window|time|period):<\/span> ).+?(?=<span)/))
        const exact = /(\d+:)?(\d+:)?\d+ (a.m.|p.m.)/
        if (launchTime.match(exact)) launchTime = launchTime.match(exact)[0]
        const description = special(data.match(/(?<=<div class="missdescrip">).+?(?= \[<span)/))
        let mission = {}

        


            if (event.queryStringParameters["ifttt"])
            mission = {
                value1: `${name.join(" - ")}`,
                value2: `${launchTime} on ${date}`,
                value3: "https://allpurpose.netlify.app/resources/"+imgName(name.join(" - ").toLowerCase())+".png",
            }
        
            else mission = {
            rocket: name[0],
            payload: name[1],
            date: date,
            time: launchTime,
            description: description
        }

           
           
        return ({
            statusCode: 200,
            body: JSON.stringify(mission)})
        })
    .catch(error => ({ statusCode: 422, body: String(error) }));
};

function special(input){
    return String(input).split('&#8220;').join('\"').split('&#8221;').join('\"').split('&#8217;').join('\'').split('<U>').join('').split('</U>').join('').split('))').join(')')
}

function imgName(name) {


    switch (name) {
        case name.match(/ariane|vega/):
            return "arianespace-logo"
            break;
        case name.match(/rocket \d+.\d+/):
            return "astra-logo"
            break;
        case name.match(/cz-|lm-|shenzou|long march/):
            return "cnsa-logo"
            break;
        case name.match(/slv/):
            return "isro-logo"
            break;
        case name.match(/antares|cygnus|pegasus|minotaur|peacekeeper/):
            return "orbital-logo"
            break;
        case name.match(/electron|photon/):
            return "rocketlab-logo"
            break;
        case name.match(/soyuz|angara/):
            return "roscosmos-logo"
            break;
        case name.match(/falcon/):
            return "spacex-logo"
            break;
        case name.match(/delta|atlas|vulcan|centaur/):
            return "ula-logo"
            break;
        case name.match(/launcherone/):
            return "virgin-logo"
            break;
        default:
            return "rocket-icon"
            break;
        }

}