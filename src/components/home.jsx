import React, { useEffect } from 'react'
import Section from './section';
import Cutout from './cutout';
import ScrollButton from './scrollButton';

function Home(props) {

    return ( 
        <Cutout id='home' backgroundColor="#303030" followScroll={true}>
            <Section id='home' onRender={() => {
                    props.setActiveIndex(0)
            }}            
            //activeIndex={props.activeIndex} setActiveIndex={props.setActiveIndex}
            //</Cutout>hoverIndex={props.hoverIndex} setHoverIndex={props.setHoverIndex}
                >
              <div id='home-name'>
                  <h1>Jacob</h1>
                  <h1>Tepperman</h1>
                  <h2 id='home-name-title'>Software Engineer</h2>
              </div>

              <div id="home-bottom">
                    <ScrollButton target="#project-section"/>
                  <h2>
                      Scroll down to view my projects
                  </h2>
              </div>
            </Section>

            <Section id='projects'>
                <h1>Projects!</h1>
            </Section>
        </Cutout>
     );
}

export default Home;