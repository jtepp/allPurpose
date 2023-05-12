import React from 'react'
import ShinyText from './shinyText';

function Home() {
    return ( 
        <section id='home-section'>
            <ShinyText id='home-section-inner'>
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
            </ShinyText>
        </section>
     );
}

export default Home;