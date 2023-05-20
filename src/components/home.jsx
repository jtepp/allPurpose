import React, { useEffect } from 'react'
import Section from './section';
import Cutout from './cutout';
import ScrollButton from './scrollButton';
import '../css/projects.css'
import Project from './project';


const data = require('../res/projects/projectsData.json')


function Home(props) {

    const projects = data.map((project, index) => {
        return <Project key={index} id={index} title={project.title}
        description={project.description} platform={project.platform} />
    })


    useEffect(() => {
        props.setActiveIndex((document.querySelector("#home").scrollTop >= document.querySelector("#home-section").scrollHeight / 2) ? 1 : 0)

        document.querySelector("#home").onscroll =  () => {
            if (document.querySelector("#home").scrollTop >= document.querySelector("#home-section").scrollHeight / 2) {
                props.setActiveIndex(1)
            } else {
                props.setActiveIndex(0)
            }

            const root = document.querySelector(":root")

            const scrollTop = document.getElementById("home").scrollTop;
            const scrollLeft = document.getElementById("home").scrollLeft;

            root.style.setProperty("--scroll-x", scrollLeft + "px")
            root.style.setProperty("--scroll-y", scrollTop + "px")
        }

    }, [props])

    useEffect(() => {
        if (window.location.hash === "#projects-section") {
            if (document.querySelector("#projects-section"))
                document.querySelector("#projects-section").scrollIntoView({
                    behavior: "smooth"
                });
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

            <Section id='projects'>
                <h1 id='projects-title'>Projects</h1>

                <div id='projects-content'>
                    <div id="projects-container">
                        {projects}
                    </div>
                </div>
            </Section>
        </Cutout>

     );
}

export default Home;