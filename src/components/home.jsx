import React, { useEffect } from 'react'
import Section from './section';
import Cutout from './cutout';
import ScrollButton from './scrollButton';
import ProjectsSection from './projectsSection';

function Home(props) {

    useEffect(() => {
        props.setActiveIndex((document.querySelector("#home").scrollTop >= document.querySelector("#home-section").scrollHeight / 2) ? 1 : 0)

        document.querySelector("#home").addEventListener("scroll", () => {
            if (document.querySelector("#home").scrollTop >= document.querySelector("#home-section").scrollHeight / 2) {
                props.setActiveIndex(1)
            } else {
                props.setActiveIndex(0)
            }
        })

    }, [props])

    useEffect(() => {
        if (window.location.hash === "#projects-section") {
            if (document.querySelector("#projects-section"))
                document.querySelector("#projects-section").scrollIntoView();
        }
    }, [])

    return ( 
    
        <Cutout id='home' backgroundColor="black" followScroll={true}
            below={
                <div id="projects-back">
                </div>
            }
        >
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
                    <ScrollButton target="#projects-section"/>
                <h2>
                    Scroll down to view my projects
                </h2>
            </div>
            </Section>

            <ProjectsSection />
        </Cutout>

     );
}

export default Home;