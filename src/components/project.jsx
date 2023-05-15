import React from 'react'
import { constrain } from '../utils'

function Project(props) {
    const handleMouseMove = (e) => {
        const container = document.getElementById(props.id + '-container')

        const mouseX = e.clientX - container.offsetLeft
        const mouseY = e.clientY - container.offsetTop
        const width = container.offsetWidth
        const height = container.offsetHeight
        const percentY = Math.round(mouseX / width * 100) - 50
        const percentX = Math.round(mouseY / height * 100) - 50

        const variance = 10

        let x = percentX * variance / 100
        let y = percentY * variance / 100

        x = constrain(x, variance, -variance)
        y = constrain(y, variance, -variance)

        console.log(x, y)

        document.getElementById(props.id).style.setProperty('--rotate-x', x + 'deg')
        document.getElementById(props.id).style.setProperty('--rotate-y', y + 'deg')
    }

    const handleMouseLeave = (e) => {
        document.getElementById(props.id).style.setProperty('--rotate-x', '0deg')
        document.getElementById(props.id).style.setProperty('--rotate-y', '0deg')
    }

    return ( 
        <div id={props.id + '-container'} className="project-container"
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div id={props.id} className="project">
                <h2>Project 1</h2>
                <p>Project 1 description</p>
            </div>
        </div>
     );
}

export default Project;