import React from 'react'
import Section from './section';
import '../css/projects.css'
import Project from './project';

function ProjectsSection() {
    return ( 
        <Section id='projects'>
                <h1 id='projects-title'>Projects</h1>

                <div id='projects-content'>
                    <div id="projects-container">
                        <Project id='test' />
                    </div>
                </div>
        </Section>
     );
}

export default ProjectsSection;