import fetch from "node-fetch";

exports.handler = async (event, context) => {

    const API_ENDPOINT = "https://spaceflightnow.com/launch-schedule";
    
    return fetch(API_ENDPOINT, { headers: {} })
    .then(response => response.text())
    .then(data => {
        
        const name = special(data.match(/(mission">).+?(?=<)/)).split(' • ')
        const date = special(data.match(/(?<=launchdate">).+?(?=<)/))
        let launchTime = special(data.match(/(?<=Launch (window|time|period):<\/span> ).+?(?=<span)/))
        // if (launchTime.match(/\d{2}:\d{2} (a.m.|p.m.)/)) launchTime = launchTime.match(/\d{2}:\d{2} (a.m.|p.m.)/)
        const description = special(data.match(/(?<=<div class="missdescrip">).+?(?= \[<span)/))
        
        let mission = {
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
    return String(input).split('&#8220;').join('\"').split('&#8221;').join('\"').split('&#8217;').join('\'').split('<U>').join('')
}