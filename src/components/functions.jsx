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
                            What is a function?
                        </h3>
                        <p>
                            A function is a block of code that is executed when a certain event occurs.
                            Functions are often used to handle events that occur on the backend, such as a user clicking a button.
                        </p>
                    </div>
                </div>
                
            </Section>
        </div>
     );
}

export default Functions;