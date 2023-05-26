import React, { useCallback, useEffect } from 'react'
import { pages } from '..';
import HeaderLink from './headerLink';
import Cutout from './cutout';
import '../css/header.css'


function Header(props) {    
    
    const calculateGapSize = () => {
        const full = window.innerWidth
        const taken = pages.reduce((result, page) => {
            return result + page.width
        }, 0)
        const nGaps = pages.length;


        return (full - taken) / nGaps
        
    }

    const calculateHeaderLineOffset = useCallback(() => {
        let index = 0;
        if (props.hoverIndex > -1) {
            index = props.hoverIndex
        } else {
            index = props.activeIndex
        }
        const gap = calculateGapSize()
        let offset = gap/2
        offset += index * gap
        for (let i = 0; i < index; i++) {
            offset += pages[i].width
        }

        return offset
    }, [props.activeIndex, props.hoverIndex])    

    const setHeaderLine = useCallback(() => {
        let index = 0;
        if (props.hoverIndex > -1) {
            index = props.hoverIndex
        } else {
            index = props.activeIndex

            const headerLineBack = document.getElementById("header-line-back")
            headerLineBack.style.left = calculateHeaderLineOffset() + "px"
            headerLineBack.style.width = pages[index].width + "px"
        }
        const headerLine = document.getElementById("header-line")
        headerLine.style.left = calculateHeaderLineOffset() + "px"
        headerLine.style.width = pages[index].width + "px"
        
        
    }, [props.activeIndex, props.hoverIndex, calculateHeaderLineOffset])

    window.onresize = () => {
        setHeaderLine()
        // if (window.innerHeight < 460){
            // const back = document.querySelector("#projects-back")
                
        const root = document.querySelector(":root")
        if (window.innerWidth > 655) {
            root.style.setProperty("--PB-wide-height", document.querySelector("#projects-section").offsetHeight + "px")
            root.style.setProperty("--PB-wide-top", `calc(100vh + 40px - var(--scroll-y) + ${Math.max(0, 460 - window.innerHeight)}px)`)
        }


            //  else {
            //     back.style.top = `calc(100vh + 80px - var(--scroll-y) + ${Math.max(0, 460 - window.innerHeight)}px)`
            // }

        // }

    }
    

    useEffect(() => {
        setHeaderLine()
    }, [setHeaderLine])

    const headerItems = pages.map((page, index) => {
        const id = page.name.toLowerCase()+"-header-link"
        return (
            <HeaderLink name={page.name} scroll={page.scroll} onClick={() => {
                props.setActiveIndex(index)
                props.setHoverIndex(-1)
            }} onMouseEnter={() => {
                props.setHoverIndex(index)
            }} onMouseLeave={() => {
                props.setHoverIndex(-1)
            }} path={page.path} width={page.width} id={id} key={id}/>
        )
    })



    


    return (
        <Cutout id="header" upperLevel={
            <div id="header-line-back"></div>
        } backgroundColor="black">
            {headerItems}
            <div id="header-line">
            </div>
        </Cutout>
     );
}

export default Header;