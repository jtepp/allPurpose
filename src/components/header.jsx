import React, { useEffect, useState } from 'react'
import { pages } from '..';
import HeaderLink from './headerLink';
import ShinyText from './shinyText';
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
        const gap = calculateGapSize()
        let offset = gap/2
        offset += activeIndex * gap
        for (let i = 0; i < activeIndex; i++) {
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
    const [activeIndex, setActiveIndex] = useState(initialIndex())

    const setHeaderLine = () => {
        const headerLine = document.getElementById("header-line")
        headerLine.style.left = calculateHeaderLineOffset() + "px"
        headerLine.style.width = pages[activeIndex].width + "px"
    }

    window.onresize = setHeaderLine

    useEffect(setHeaderLine, [activeIndex])

    const headerItems = pages.map((page, index) => {
        const id = page.name.toLowerCase()+"-header-link"
        return (
            <HeaderLink name={page.name} onClick={() => setActiveIndex(index)} path={page.path} width={page.width} id={id} key={id}/>
        )
    })

    


    return ( 
        <div id="header">
            <ShinyText id="header-content">
                {headerItems}
            </ShinyText>
            <div id="header-line">
        </div>
        </div>
     );
}

export default Header;