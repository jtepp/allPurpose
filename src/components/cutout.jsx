import '../css/cutout.css'
import React, { useCallback, useEffect, useRef } from 'react'
  

function Cutout(props) {

    const containerRef = useRef(null)
    const mainRef = useRef(null)

    const moveAccent = (e) => {
        const root = document.querySelector(":root")
    
        root.style.setProperty("--accent-x", e.clientX + "px")
        root.style.setProperty("--accent-y", e.clientY + "px")
    }
    
    const moveScroll = useCallback((e) => {
        const root = document.querySelector(":root")

        const scrollTop = mainRef.current?.scrollTop;
        const scrollLeft = mainRef.current?.scrollLeft;

        root.style.setProperty("--scroll-x", scrollLeft + "px")
        root.style.setProperty("--scroll-y", scrollTop + "px")
    }, [])
    
    useEffect(() => {
        document.body.onmousemove = moveAccent
        mainRef.current.onscroll = moveScroll
    }, [props.id, moveScroll])

    return ( 
        <div id={props.id + "-container"} ref={containerRef} style={{
            zIndex: 10,
            position: 'relative'
            }}>
            <div className={"color-strip"}></div>
            <div className={(props.followScroll ? "color-accent follow-scroll " : "color-accent ")
        } style={{
            top: `calc(var(--accent-y) + ${-containerRef.current?.getBoundingClientRect().y}px)`,
            left: `calc(var(--accent-x) + ${containerRef.current?.getBoundingClientRect().x - containerRef.current?.offsetLeft * 2}px)`,
        }}></div>
            {props.upperLevel}
            <div className="cutout" ref={mainRef} id={props.id} style={
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