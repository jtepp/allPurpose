import React from 'react'
import Section from './section';
import '../css/projects.css'
import Project from './project';
const data = require('../res/projects/projectsData.json')

function ProjectsSection() {
    const projects = data.map((project, index) => {
        return <Project key={index} id={index} title={project.title}
        description={project.description} platform={project.platform} />
    })
    return ( 
        <Section id='projects'>
                <h1 id='projects-title'>Projects</h1>

                <div id='projects-content'>
                    <div id="projects-container">
                        {projects}
                    </div>
                </div>
        </Section>
     );
}

export default ProjectsSection;