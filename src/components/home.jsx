import React, { useEffect, useRef, useState } from 'react'
import parser from 'html-react-parser';
import Section from './section';
import Cutout from './cutout';
import ScrollButton from './scrollButton';
import '../css/projects.css'
import Project from './project';
import { projectScrollWidth, importAll, scrollToNextProject, scrollToPreviousProject } from '../utils';
import jtLogo from '../res/JT logo.png'


export const favicon = jtLogo
export const icons = importAll(require.context('../res/projects/icons', false, /\.(png|jpe?g|svg|gif)$/))
export const thumbnails = importAll(require.context('../res/projects/thumbnails', false, /\.(png|jpe?g|svg|gif)$/))


const data = require('../res/projects/projectsData.json')


function Home(props) {
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
    const projectsContainer = useRef(null)
    const homeMain = useRef(null)

    const getCurrentProjectIndex = () => {
        const scrollLeft = projectsContainer.current.scrollLeft

        return Math.max(0, Math.min(Math.round(scrollLeft / projectScrollWidth()), data.length - 1))

    }

    useEffect(() => {
        // projects
        if (document.querySelector("#projects-section")) {
            const root = document.querySelector(":root")
            if (window.innerWidth > 655) {
                root.style.setProperty("--PB-wide-height", document.querySelector("#projects-section").offsetHeight + "px")
                root.style.setProperty("--PB-wide-top", `calc(100vh + 40px - var(--scroll-y) + ${Math.max(0, 460 - window.innerHeight)}px)`)
            } else {
                root.style.setProperty("--PB-narrow-height", document.querySelector("#projects-section").offsetHeight + "px")
                root.style.setProperty("--PB-narrow-top", `calc(100vh + 80px - var(--scroll-y) + ${Math.max(0, 412 - window.innerHeight)}px)`)
            }
        }
    }, [props.resizeState])


    useEffect(() => {
        if (window.location.hash === "#projects-section") {
            if (document.querySelector("#projects-section"))
                document.querySelector("#projects-section").scrollIntoView({
                    behavior: "smooth"
                });
        }


    }, [props])

    useEffect(() => {
        projectsContainer.current.onscroll = () => {
            const index = getCurrentProjectIndex()
            if (index !== currentProjectIndex) {
                setCurrentProjectIndex(index)
            }
        }
    }, [currentProjectIndex])


    const projects = data.map((project, index) => {
        return <Project key={project.title} index={index} currentProjectIndex={currentProjectIndex} project={project}/>
    })

    useEffect(() => {
        props.setActiveIndex((homeMain.current.scrollTop >= document.querySelector("#home-section").scrollHeight / 2) ? 1 : 0)

        homeMain.current.onscroll =  () => {
            if (homeMain.current.scrollTop >= document.querySelector("#home-section").scrollHeight / 2) {
                props.setActiveIndex(1)
            } else {
                props.setActiveIndex(0)
            }

            const root = document.querySelector(":root")

            const scrollTop = homeMain.current.scrollTop;
            const scrollLeft = homeMain.current.scrollLeft;

            root.style.setProperty("--scroll-x", scrollLeft + "px")
            root.style.setProperty("--scroll-y", scrollTop + "px")
        }

    }, [props])


    return (
        <div id="home-main" className='page-main' ref={homeMain} 
        onLoad={() => props.setResizeState(r => !r)}>
            <Section id='home' onRender={() => {
                    props.setActiveIndex(0)
            }}                >
                <Cutout id='home' backgroundColor="black">
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
                </Cutout>
            </Section>

            <Section id='projects'>
            <Cutout id='projects-title-cutout' backgroundColor="black">
                <h1 id='projects-title' className='page-title'>Projects</h1>
            </Cutout>

                <div id='projects-content' className={(currentProjectIndex > 0 ? 'more-left ' : '') + (currentProjectIndex < data.length - 1 ? 'more-right' : '')}>
                    <div className="projects-content-button" id='left-button'
                    onClick={() => {
                        scrollToPreviousProject()
                    }}></div>
                    <div className="projects-content-button" id='right-button'
                    onClick={() => {
                        scrollToNextProject()
                    }}
                    ></div>
                    <div id="project-info">
                        <div id="project-title-container">
                            <Cutout id='project-title-cutout' backgroundColor="black" >
                                <h1 id="project-title">
                                    {data[currentProjectIndex].title}
                                </h1>
                            </Cutout>
                            <h3 id="project-subtitle">
                                {data[currentProjectIndex].job ? data[currentProjectIndex].job.project : ""}
                            </h3>
                        </div>

                        <h3 id="project-description">
                            {parser(data[currentProjectIndex].description)}
                        </h3>
                    </div>
                    <div id="projects-container" ref={projectsContainer}>
                        <div className="projects-container-spacing"></div>
                        {projects}
                        <div className="projects-container-spacing"></div>
                    </div>
                </div>
            </Section>
        </div>
     );
}

export default Home;