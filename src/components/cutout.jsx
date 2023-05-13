import '../css/cutout.css'
import React, { useEffect } from 'react'
  

function Cutout(props) {

    const moveAccent = (e) => {
        const root = document.querySelector(":root")
    
        root.style.setProperty("--accent-x", e.clientX + "px")
        root.style.setProperty("--accent-y", e.clientY + "px")
    }
    
    const moveScroll = (e) => {
        const root = document.querySelector(":root")

        const scrollTop = document.getElementById(props.id).scrollTop;
        const scrollLeft = document.getElementById(props.id).scrollLeft;

        root.style.setProperty("--scroll-x", scrollLeft + "px")
        root.style.setProperty("--scroll-y", scrollTop + "px")
    }
    
    useEffect(() => {
        document.body.onmousemove = moveAccent
        document.getElementById(props.id).onscroll = moveScroll
    }, [props.id])

    return ( 
        <div id={props.id + "-container"} style={{
            zIndex: 10,
            position: 'relative'
            }}>
            <div className={"color-strip"}></div>
            <div className={props.followScroll ? "color-accent follow-scroll" : "color-accent"}></div>
            {props.upperLevel}
            <div className="cutout" id={props.id} style={
                {
                    backgroundColor: props.backgroundColor,
                    zIndex: 10,
                    position: 'relative',
                }
                }>
                {props.children}
            </div>
            {props.below}
        </div>
     )
}

export default Cutout;