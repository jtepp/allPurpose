import React, { useEffect, useRef } from 'react'
import { icons, thumbnails } from './home'
import { scrollToIndex } from '../utils'

function Project(props) {
    const container = useRef(null)
    const el = useRef(null)

    const handleMouseMove = (e) => {
        if (!e.target.className.includes('project-icon')) {
            const mouseX = e.clientX - container.current.offsetLeft + container.current.parentNode.scrollLeft - container.current.parentNode.offsetLeft
            const mouseY = e.clientY - container.current.offsetTop
            const width = container.current.offsetWidth 
            const height = container.current.offsetHeight 
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

            // console.log(x, y)

            el.current.style.setProperty('--rotate-x', x + 'deg')
            el.current.style.setProperty('--rotate-y', y + 'deg')
        }
    }

    const handleMouseLeave = (e) => {
        el.current.style.setProperty('--rotate-x', '0deg')
        el.current.style.setProperty('--rotate-y', '0deg')
    }

    useEffect(() => {
        container.current.classList.toggle('current-project-container', props.currentProjectIndex === props.index)
    }, [props.currentProjectIndex, props.index])

    

    const handleIconClick = (e) => {
        const projectIndex = [...document.querySelectorAll(".project-container")].findIndex((e) => e.id === 'project-' + props.index + '-container')
        scrollToIndex(projectIndex)
    }


    return ( 
        <section id={'project-' + props.index + '-container'} ref={container} className={"project-container"}
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div id={'project-' + props.index} ref={el} className="project" style={{
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