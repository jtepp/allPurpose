import React from 'react'
import Section from './section';
import Cutout from './cutout';
import '../css/functions.css'
import ReadMore from './readMore';
import FunctionItem from './functionItem';

const functionItems = [
    {
        "title": "Space Launches",
        "description": "Retrieve information about past and upcoming space launches, including details about the rockets, payloads, and launch dates.",
        "input": false,
        "used": ["rocketeer"]
    },
    {
        "title": "Text to Coordinates",
        "description": "Convert textual addresses or location descriptions into geographical coordinates (latitude and longitude) for mapping and navigation.",
        "input": true,
        "used": ["rocketeer"]
    },
    {
        "title": "NBA Player Bios",
        "description": "Access information and statistics for NBA players, including team, height, position, etc.",
        "input": false,
        "used": ["larrybirdle"]
    },
    {
        "title": "Quick Google Images",
        "description": "Retrieve a collection of low-res images from Google, based on specific keywords or search queries.",
        "input": true,
        "used": ["rocketeer"]
    },
    {
        "title": "Date Parser",
        "description": "Parse and interpret various date formats to ensure accurate and consistent handling of date and time information.",
        "input": true,
        "used": ["rocketeer", "widgit"]
    },
    {
        "title": "Subreddit Scraper",
        "description": "Gather posts, upvotes, and other data from Reddit subreddits, enabling you to view a subreddit at a glance. This widget only displays the JSON data for the first post for simplicity",
        "input": true,
        "used": ["widgit"]
    },
    {
        "title": "Amazon Product Search",
        "description": "Search and retrieve information about products available on Amazon, including prices, images, and specifications. This widget only shows images for simplicity.",
        "input": true,
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
                                <FunctionItem key={item.title} title={item.title} description={item.description} input={item.input}/>
                            )}

                        </div>
                   
                    </div>
                
            </Section>
        </div>
     );
}
export default Functions;