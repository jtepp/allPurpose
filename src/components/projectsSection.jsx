import React from 'react'
import Section from './section';
import '../css/projects.css'

function ProjectsSection() {
    return ( 
        <Section id='projects'>
                <h1 id='projects-title'>Projects</h1>

                <div id='projects-content'>
                    <div id="projects-container">
                        <div className="project">
                            <h2>Project 1</h2>
                            <p>Project 1 description</p>
                        </div>
                    </div>
                </div>
        </Section>
     );
}

export default ProjectsSection;