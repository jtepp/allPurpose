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
                    <div className="functions-description">

                    </div>
                </Cutout>
                
            </Section>
        </div>
     );
}

export default Functions;