import React, { useEffect, useState } from 'react'
import { pages } from '..';
import HeaderLink from './headerLink';
import CutoutText from './cutoutText';
import '../css/header.css'


function Header() {    
    
    const calculateGapSize = () => {
        const full = window.innerWidth
        const taken = pages.reduce((result, page) => {
            return result + page.width
        }, 0)
        const nGaps = pages.length;


        return (full - taken) / nGaps
        
    }

    const calculateHeaderLineOffset = () => {
        let index = 0;
        if (hoverIndex > -1) {
            index = hoverIndex
        } else {
            index = activeIndex
        }
        const gap = calculateGapSize()
        let offset = gap/2
        offset += index * gap
        for (let i = 0; i < index; i++) {
            offset += pages[i].width
        }

        return offset
    }

    const initialIndex = () => {
        const path = window.location.pathname
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].path === path) {
                return i
            }
        }
        return 0

    }
    let [activeIndex, setActiveIndex] = useState(initialIndex())
    let [hoverIndex, setHoverIndex] = useState(-1)

    

    const setHeaderLine = () => {
        let index = 0;
        if (hoverIndex > -1) {
            index = hoverIndex
        } else {
            index = activeIndex

            const headerLineBack = document.getElementById("header-line-back")
        headerLineBack.style.left = calculateHeaderLineOffset() + "px"
        headerLineBack.style.width = pages[index].width + "px"
        }
        const headerLine = document.getElementById("header-line")
        headerLine.style.left = calculateHeaderLineOffset() + "px"
        headerLine.style.width = pages[index].width + "px"
        
        
    }

    window.onresize = setHeaderLine

    useEffect(setHeaderLine, [activeIndex, hoverIndex])

    const headerItems = pages.map((page, index) => {
        const id = page.name.toLowerCase()+"-header-link"
        return (
            <HeaderLink name={page.name} onClick={() => {
                setActiveIndex(index)
                setHoverIndex(-1)
            }} onMouseEnter={() => {
                setHoverIndex(index)
            }} onMouseLeave={() => {
                setHoverIndex(-1)
            }} path={page.path} width={page.width} id={id} key={id}/>
        )
    })


    const setHeaderAccent = (e) => {
        const headerAccent = document.getElementById("header-color-accent")
        headerAccent.style.left = e.clientX + "px"
        headerAccent.style.top = e.clientY + "px"
    }

    document.body.onmousemove = setHeaderAccent

    


    return ( 
        <div id="header-container">
            <div id="header-color-strip"></div>
            <div id="header-color-accent"></div>
            <div id="header-line-back"></div>
            <CutoutText id="header">
                {headerItems}
                <div id="header-line">
                </div>
            </CutoutText>
        </div>
     );
}

export default Header;