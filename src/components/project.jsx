import React, { useEffect } from 'react'
import { icons, thumbnails } from './home'
import { projectScrollWidth } from '../utils'

function Project(props) {

    const handleMouseMove = (e) => {
        if (!e.target.className.includes('project-icon')) {
            const container = document.getElementById('project-' + props.index + '-container')
            const el = document.getElementById('project-' + props.index)

            const mouseX = e.clientX - container.offsetLeft + container.parentNode.scrollLeft - container.parentNode.offsetLeft
            const mouseY = e.clientY - container.offsetTop
            const width = container.offsetWidth 
            const height = container.offsetHeight 
            const percentY = Math.round(mouseX / width * 100)
            const percentX = -1*(Math.round(mouseY / height * 100) - 50)

            // console.log(percentX, percentY)

            const rotateVariance = 10

            // x and y are flipped. god knows why

            let x = percentX * rotateVariance / 100 + 2.5
            let y = percentY * rotateVariance / 100

            // if (window.innerWidth > 655) {
            //     y -= 14.7;
            //     x += 2.5;

            //     // constrain values to one decimal point
            // }
            x = Math.round(x * 10) / 10
            y = Math.round(y * 10) / 10

            console.log(x, y)

            el.style.setProperty('--rotate-x', x + 'deg')
            el.style.setProperty('--rotate-y', y + 'deg')
        }
    }

    const handleMouseLeave = (e) => {
        const el = document.getElementById('project-' + props.index)
        el.style.setProperty('--rotate-x', '0deg')
        el.style.setProperty('--rotate-y', '0deg')
    }

    useEffect(() => {
        document.querySelector('#project-' + props.index + '-container').classList.toggle('current-project-container', props.currentProjectIndex === props.index)
    }, [props.currentProjectIndex, props.index])

    

    const handleIconClick = (e) => {
        const projectsContainer = document.getElementById("projects-container")
        const projectIndex = [...document.querySelectorAll(".project-container")].findIndex((el) => el.id === 'project-' + props.index + '-container')


        projectsContainer.scrollTo({'left': projectIndex * projectScrollWidth(), 'behavior': 'smooth'})

    }

    return ( 
        <section id={'project-' + props.index + '-container'} className={"project-container"}
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div id={'project-' + props.index} className="project" style={{
                backgroundImage: `url(${thumbnails[props.project.short]})`
            }}>
            </div>

            <div className="project-icon-container"
            onClick={handleIconClick}>
                <img src={icons[props.project.short]} alt="" className="project-icon" />
            </div>
        </section>
     );
}

export default Project;