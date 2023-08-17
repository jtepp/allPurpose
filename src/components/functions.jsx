import React from 'react'
import Section from './section';
import Cutout from './cutout';
import '../css/functions.css'
import ReadMore from './readMore';
import FunctionItem from './functionItem';
import { importAll, randomElement } from '../utils';

export const clouds = importAll(require.context('../res/clouds', false, /\.(png)$/))

const functionItems = [
    {
        "title": "Space Launches",
        "url": "missions",
        "description": "Retrieve information about past and upcoming space launches, including details about the rockets, payloads, and launch dates.",
        "input": false,
        "images": false,
        "used": ["rocketeer"]
    },
    {
        "title": "Text to Coordinates",
        "url": "coordinates?a=",
        "description": "Convert textual addresses or location descriptions into geographical coordinates (latitude and longitude) for mapping and navigation.",
        "input": true,
        "images": false,
        "used": ["rocketeer"]
    },
    {
        "title": "NBA Player Bios",
        "url": "https://larrybirdle.netlify.app/.netlify/functions/random",
        "description": "Access information and statistics for NBA players, including team, height, position, etc.",
        "input": false,
        "images": false,
        "used": ["larrybirdle"]
    },
    {
        "title": "Quick Google Images",
        "url": "images?b64&q=",
        "description": "Retrieve an image thumbnail from Google Images based on specific keywords or search queries.",
        "input": true,
        "images": true,
        "b64": true,
        "used": ["rocketeer"]
    },
    {
        "title": "Date Parser",
        "url": "dateParse?a=",
        "description": "Parse and interpret various date formats to ensure accurate and consistent handling of date and time information.",
        "input": true,
        "images": false,
        "used": ["rocketeer", "widgit"]
    },
    {
        "title": "Subreddit Scraper",
        "url": "reddit?sort=top&limit=1&sub=",
        "description": "Gather posts, upvotes, and other data from Reddit subreddits, enabling you to view a subreddit at a glance. This widget only displays the JSON data for the first post for simplicity",
        "input": true,
        "images": false,
        "used": ["widgit"]
    },
    {
        "title": "Amazon Product Search",
        "url": "amazon?q=",
        "description": "Search and retrieve information about products available on Amazon, including prices, images, and specifications. This widget only shows images for simplicity.",
        "input": true,
        "images": true,
        "used": ["oooh"]
    }
]


function Functions(props) {
    return ( 
        <div id="functions-main" className="page-main">
            <Section id="functions">
                <div id="functions-header">
                    <div>
                        <Cutout id="functions">
                            <h1 className='page-title'>Functions</h1>
                        </Cutout>
                    </div>
                            <ReadMore id="functions-description" title={
                            <h3>
                                What is a (cloud) function?
                            </h3>
                            } hover={`A function is a block of code that runs a group of calculations, can have variable parameters, and can return a result.
                            Functions are a concept used in every coding language, but these functions are more specifically cloud functions.`}
                            hide={`Cloud functions are functions that run on a server, rather than on your device. This means that any device connected to the internet can trigger this function 
                                and recieve the same calculated result, regardless of the device. This can be useful for applications that require a lot of processing power, or for applications that
                                need a unified set of data. I personally like to use them as custom REST APIs, or when I need to run some computations that can be written much more simply in the language of the server
                                (e.g. JavaScript) than the language of the application on the device (e.g. Swift).`} />
                </div>
                    <div id="functions-content">
                        <div id="function-items-container">
                            
                            {functionItems.map((item) => 
                                <FunctionItem key={item.title} item={item} cloud={randomElement(Object.values(clouds))}/>
                            )}

                        </div>
                   
                    </div>
                
                <div style={{
                        color: 'white',
                        float: 'right',
                        margin: 40
                    }}>
                    <a href="https://www.freepik.com/free-vector/set-twelve-different-clouds-blue-background_1149278.htm#query=cloud%20svg&position=0&from_view=keyword&track=ais">Cloud Images by alliesinteractive</a> on Freepik
                </div>
            </Section>
        </div>
     );
}
export default Functions;