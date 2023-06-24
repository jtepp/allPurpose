import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from './base';
import Home from './home';
import Minigames from './minigames/minigames';
import Contact from './contact';
import Functions from './functions';

const pagesMaster = [
    {name: "Home", path: "/", scroll: '#home-section', width: 60},
    {name: "Projects", path: "/#projects-section", scroll: '#projects-section', width: 60},
    {name: "Minigames", path: "/minigames", width: 80},
    {name: "Functions", path: "/functions", width: 72},
    {name: "Contact", path: "/contact", width: 74, menu: true},
    {name: "More", path: "", width: 54, menu: true}
  ]

const smallPageIndices = {
    "Home": 0,
    "Projects": 1,
    "Contact": 2,
    "Functions": 3,
    "Minigames": 3,
}

const bigPageIndices = {
    "Home": 0,
    "Projects": 1,
    "Minigames": 2,
    "Functions": 3,
    "Contact": 4,
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
    
    const [pages, setPages] = useState(pagesMaster)
    // const prevPages = useRef(null)


    useEffect(() => {
        if (window.innerWidth > 655 && headerSizeState === 'small') {
            setHeaderSizeState('big')
        } else if (window.innerWidth <= 655 && headerSizeState === 'big') {
            setHeaderSizeState('small')
        }
    }, [resizeState, headerSizeState])

    const loadBigPages = useCallback(() => {
        setActiveIndex(bigPageIndices[pages[activeIndex].name])
        if (pages.length !== pagesMaster.length - 1)
            setPages(pagesMaster.slice(0, pagesMaster.length - 1))
    }, [activeIndex, pages])

    const loadSmallPages = useCallback(() => {
        setActiveIndex(smallPageIndices[pages[activeIndex].name])
        if (pages.length !== 4)
            setPages([...pagesMaster.slice(0, 2), ...pagesMaster.slice(4, pagesMaster.length)])
    }, [activeIndex, pages])

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

    }, [pages])

    useEffect(() => {
        setActiveIndex(initialIndex())
        setResizeState(r => !r)
    }, [initialIndex])

    window.onresize = () => {
        setResizeState(r => !r)
    }


    return ( 
        <BrowserRouter>
            <Base pages={pages} setPages={setPages} activeIndex={activeIndex} setActiveIndex={setActiveIndex} 
                hoverIndex={hoverIndex} setHoverIndex={setHoverIndex} resizeState={resizeState} setResizeState={setResizeState}>
                <Routes>
                <Route path="/" element={<Home activeIndex={activeIndex} setActiveIndex={setActiveIndex}
                hoverIndex={hoverIndex} setHoverIndex={setHoverIndex} resizeState={resizeState} setResizeState={setResizeState}/>} />
                <Route path="/minigames" element={<Minigames resizeState={resizeState}/>}/>
                <Route path='/contact' element={<Contact resizeState={resizeState}/>} />
                <Route path='/functions' element={<Functions resizeState={resizeState}/>} />
                </Routes>
            </Base>
         </BrowserRouter>
     );
}

export default Main;