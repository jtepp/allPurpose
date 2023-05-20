import React from 'react'
import { icons } from './home'

const getCurrentProjectIndex = () => {
    const scrollLeft = document.getElementById("projects-container").scrollLeft
    const containers = document.querySelectorAll(".project-container")

    let lastIndex = 0
    for (let i = 1; i < containers.length; i++) {
        const offsetLeft = containers[i].offsetLeft - window.innerWidth/2
        const lastOffsetLeft = containers[lastIndex].offsetLeft - window.innerWidth/2

        console.log(offsetLeft, lastOffsetLeft, scrollLeft, i)
        if (Math.abs(offsetLeft - scrollLeft) > Math.abs(lastOffsetLeft - scrollLeft))
            return lastIndex
        else
            lastIndex = i
    }
    return lastIndex   
}

function Project(props) {

    const handleMouseMove = (e) => {
        const container = document.getElementById(props.id + '-container')
        const el = document.getElementById(props.id)

        const mouseX = e.clientX - container.offsetLeft + container.parentNode.scrollLeft
        const mouseY = e.clientY - container.offsetTop
        const width = container.offsetWidth 
        const height = container.offsetHeight 
        const percentY = Math.round(mouseX / width * 100)
        const percentX = -1*(Math.round(mouseY / height * 100) - 50)

        // console.log(percentX, percentY)

        const rotateVariance = 10

        let x = percentX * rotateVariance / 100
        let y = percentY * rotateVariance / 100

        // console.log(x, y)

        el.style.setProperty('--rotate-x', x + 'deg')
        el.style.setProperty('--rotate-y', y + 'deg')
    }

    const handleMouseLeave = (e) => {
        const el = document.getElementById(props.id)
        el.style.setProperty('--rotate-x', '0deg')
        el.style.setProperty('--rotate-y', '0deg')
    }

    

    const handleIconClick = (e) => {
        const cont = document.getElementById(props.id + '-container')
        const contcont = document.getElementById("projects-container")

        // console.log(cont.offsetLeft, contcont.scrollLeft, window.innerWidth/2)

        contcont.scrollLeft = cont.offsetLeft - window.innerWidth/2

    }

    return ( 
        <section id={props.id + '-container'} className="project-container"
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div id={props.id} className="project">
                <h2 className='project-title'>{props.project.title}</h2>
                <p className='project-description'>{props.project.description}</p>
            </div>

            <div className="project-icon-container"
            onClick={handleIconClick}>
                <img src={icons[props.project.short]} alt="" className="project-icon" />
            </div>
        </section>
     );
}

export default Project;