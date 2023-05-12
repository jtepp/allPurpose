import '../css/cutout.css'
import React from 'react'
  

function Cutout(props) {

    const moveAccent = (e) => {
        const root = document.querySelector(":root")
    
        root.style.setProperty("--accent-x", e.clientX + "px")
        root.style.setProperty("--accent-y", e.clientY + "px")
    }
    
    document.body.onmousemove = moveAccent

    return ( 
        <div id={props.id + "-container"} style={{
            zIndex: 10,
            position: 'relative',
            overflow: 'hidden'
            }}>
            <div className={"color-strip"}></div>
            <div className={"color-accent"}></div>
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