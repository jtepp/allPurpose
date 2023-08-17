import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from './base';
import Home from './home';
import Minigames from './minigames/minigames';
import Contact from './contact';
import Functions from './functions';
import Resume from './resume'

const pages = [
    {name: "Home", path: "/", scroll: '#home-section', width: 60},
    {name: "Projects", path: "/#projects-section", scroll: '#projects-section', width: 60},
    {name: "Minigames", path: "/minigames", width: 80},
    {name: "Functions", path: "/functions", width: 72},
    {name: "Contact", path: "/contact", width: 74, menu: true},
    {name: "More", path: "", width: 54, menu: true}
  ]

export const smallPageIndices = {
    "Home": 0,
    "Projects": 1,
    "Contact": 2,
    "Functions": 3,
    "Minigames": 3,
}

export const bigPageIndices = {
    "Home": 0,
    "Projects": 1,
    "Minigames": 2,
    "Functions": 3,
    "Contact": 4,
}

export const smallHoverIndices = {
    0: 0,
    1: 1,
    4: 2,
    5: 3
}

export const subPages = {
"Contact": [
    {name: "Form", path: "/contact", width: 74},
    {name: "Resume", path: "/resume", width: 74},
    {name: "Email", path: "mailto:jtepp+site@icloud.com", width: 74},
], 
"More": [
    {name: "Minigames", path: "/minigames", width: 80},
    {name: "Functions", path: "/functions", width: 72}
]
}


function Main() {
    const [resizeState, setResizeState] = useState(false)
    const [headerSizeState, setHeaderSizeState] = useState('big')
    
    let [activeIndex, setActiveIndex] = useState(0)
    let [hoverIndex, setHoverIndex] = useState(-1)
    // const prevPages = useRef(null)


    useEffect(() => {
        if (window.innerWidth > 655 && headerSizeState === 'small') {
            setHeaderSizeState('big')
        } else if (window.innerWidth <= 655 && headerSizeState === 'big') {
            setHeaderSizeState('small')
        }
    }, [resizeState, headerSizeState])

    const loadBigPages = useCallback(() => {
        document.querySelectorAll('#functions-header-item, #minigames-header-item').forEach(el => el.classList.remove('display-none'))
        document.querySelectorAll('#more-header-item, #header-menu-container-more-header-item').forEach(el => el.classList.add('display-none'))    
        setActiveIndex(bigPageIndices[pages[activeIndex]?.name])
    }, [activeIndex])

    const loadSmallPages = useCallback(() => {
        document.querySelectorAll('#more-header-item, #header-menu-container-more-header-item').forEach(el => el.classList.remove('display-none'))    
        document.querySelectorAll('#functions-header-item, #minigames-header-item').forEach(el => el.classList.add('display-none'))    
        let temp = activeIndex
        if (temp === 2 || temp === 3)
            temp += 2

        setActiveIndex(smallPageIndices[pages[temp]?.name])
    }, [activeIndex])



    useEffect(() => {
        if (headerSizeState === 'big') {
            loadBigPages()
        } else if (headerSizeState === 'small') {
            loadSmallPages()
        }
    }, [headerSizeState, loadBigPages, loadSmallPages])

    const initialIndex = useCallback(() => {
        const path = window.location.pathname
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].path === path) {
                return i
            }
        }
        return 0

    }, [])

    useEffect(() => {
        setActiveIndex(initialIndex())
        setResizeState(r => !r)
    }, [initialIndex])

    window.onresize = () => {
        setResizeState(r => !r)
    }


    return ( 
        <BrowserRouter>
            <Base pages={pages} activeIndex={activeIndex} setActiveIndex={setActiveIndex} headerSizeState={headerSizeState}
                hoverIndex={hoverIndex} setHoverIndex={setHoverIndex} resizeState={resizeState} setResizeState={setResizeState}>
                <Routes>
                <Route path="/" element={<Home activeIndex={activeIndex} setActiveIndex={setActiveIndex}
                hoverIndex={hoverIndex} setHoverIndex={setHoverIndex} resizeState={resizeState} setResizeState={setResizeState}/>} />
                <Route path="/minigames" element={<Minigames resizeState={resizeState}/>}/>
                <Route path='/contact' element={<Contact resizeState={resizeState}/>} />
                <Route path='/resume' element={<Resume resizeState={resizeState}/>} />
                <Route path='/functions' element={<Functions resizeState={resizeState}/>} />
                </Routes>
            </Base>
         </BrowserRouter>
     );
}

export default Main;