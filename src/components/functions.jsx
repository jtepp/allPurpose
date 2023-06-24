import React from 'react'
import Section from './section';
import Cutout from './cutout';
import '../css/functions.css'

function Functions(props) {
    return ( 
        <div id="functions-main" className="page-main">
            <Section id="functions">
                <Cutout id="functions">
                    <h1 className='page-title'>Functions</h1>
                </Cutout>
                <div id="functions-content">

                <div className="functions-description">
                        <h3>
                            What is a (cloud) function?
                        </h3>
                        <p>
                            A function is a block of code that runs a group of calculations, can have variable parameters, and can return a result.
                            Functions are a concept used in every coding language, but these functions are more specifically cloud functions.
                            Cloud functions are functions that run on a server, rather than on your device. This means that any device connected to the internet can trigger this function 
                            and recieve the same calculated result, regardless of the device. This can be useful for applications that require a lot of processing power, or for applications that
                            need a unified set of data. I personally like to use them when I need to run some computations that can be written much more simply in the language of the server
                            (e.g. JavaScript) than the language of the application on the device (e.g. Swift).
                        </p>
                    </div>
                </div>
                
            </Section>
        </div>
     );
}

export default Functions;