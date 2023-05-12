import React, { useEffect } from 'react'
import Section from './section';
import Cutout from './cutout';

function Home(props) {
    useEffect(() => {
        props.setActiveIndex(0)
    }, [])

    return ( 
        <Cutout id='home' collowScroll={true} backgroundColor="#303030" followScroll={true}>
            <Section id='home'
            //activeIndex={props.activeIndex} setActiveIndex={props.setActiveIndex}
            //</Cutout>hoverIndex={props.hoverIndex} setHoverIndex={props.setHoverIndex}
                >
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
            </Section>
        </Cutout>
     );
}

export default Home;