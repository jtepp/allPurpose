import React from 'react'
import Section from './section';
import Cutout from './cutout';
import '../css/functions.css'
import ReadMore from './readMore';

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
                                need a unified set of data. I personally like to use them when I need to run some computations that can be written much more simply in the language of the server
                                (e.g. JavaScript) than the language of the application on the device (e.g. Swift).`} />
                </div>
                    <div id="functions-content">

                   
                    </div>
                
            </Section>
        </div>
     );
}

export default Functions;