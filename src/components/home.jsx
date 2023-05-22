import React, { useEffect, useState } from 'react'
import ReactHTMLParser from 'react-html-parser';
import Section from './section';
import Cutout from './cutout';
import ScrollButton from './scrollButton';
import '../css/projects.css'
import Project from './project';
import { projectScrollWidth, importAll } from '../utils';

export const icons = importAll(require.context('../res/projects/icons', false, /\.(png|jpe?g|svg|gif)$/))
export const thumbnails = importAll(require.context('../res/projects/thumbnails', false, /\.(png|jpe?g|svg|gif)$/))


const data = require('../res/projects/projectsData.json')


function Home(props) {
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0)


    const getCurrentProjectIndex = () => {
        const projectsContainer = document.getElementById("projects-container")
        const scrollLeft = projectsContainer.scrollLeft

        return Math.min(Math.round(scrollLeft / projectScrollWidth()), data.length - 1)

    }


    useEffect(() => {
        if (window.location.hash === "#projects-section") {
            if (document.querySelector("#projects-section"))
                document.querySelector("#projects-section").scrollIntoView({
                    behavior: "smooth"
                });
        }


    }, [])

    useEffect(() => {
        document.querySelector("#projects-container").onscroll = () => {
            const index = getCurrentProjectIndex()
            if (index !== currentProjectIndex) {
                setCurrentProjectIndex(index)
            }
        }
    }, [currentProjectIndex])


    const projects = data.map((project, index) => {
        return <Project key={index} index={index} currentProjectIndex={currentProjectIndex} project={project}/>
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

                <div id='projects-content' className={(currentProjectIndex > 0 ? 'more-left ' : '') + (currentProjectIndex < data.length - 1 ? 'more-right' : '')}>
                    <div className="projects-content-button" id='left-button'
                    onClick={() => {
                        

                    }}></div>
                    <div className="projects-content-button" id='right-button'></div>
                    <div id="project-info">
                        <h1 id="project-title">
                            {data[currentProjectIndex].title}
                        </h1>
                        <h3 id="project-description">
                            {ReactHTMLParser(data[currentProjectIndex].description)}
                        </h3>
                    </div>
                    <div id="projects-container">
                        {projects}
                    </div>
                </div>
            </Section>
        </Cutout>

     );
}

export default Home;