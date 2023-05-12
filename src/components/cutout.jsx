import '../css/cutout.css'
import React from 'react'
  

function Cutout(props) {

    const moveAccent = (e) => {
        const root = document.querySelector(":root")
    
        root.style.setProperty("--accent-x", e.clientX + "px")
        root.style.setProperty("--accent-y", e.clientY + "px")

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        root.style.setProperty("--accent-scroll-x", e.clientX + scrollLeft + "px")
        root.style.setProperty("--accent-scroll-y", e.clientY + scrollTop + "px")
    }

    
    document.body.onmousemove = moveAccent

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
        </div>
     )
}

export default Cutout;