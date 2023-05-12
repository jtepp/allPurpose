import React, { useEffect } from 'react'
import Cutout from './cutout';

function Section(props) {

    useEffect(() => {
        console.log("Section mounted")
    })

    return ( 
        <section id={props.id+'-section'}>
           
           <Cutout id='home' backgroundColor="#303030">
                <div id='home-name'>
                    <h1>Jacob</h1>
                    <h1>Tepperman</h1>
                    <h2 id='home-name-title'>Software Engineer</h2>
                </div>

                <div id="home-bottom">
                    <h2>
                        Scroll down to view my projects
                    </h2>
                </div>
            </Cutout>
        </section>
     );
}

export default Section;