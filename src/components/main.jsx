import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from './base';
import Home from './home';
import Minigames from './minigames/minigames';
import Contact from './contact';

const pagesMaster = [
    {name: "Home", path: "/", scroll: '#home-section', width: 60},
    {name: "Projects", path: "/#projects-section", scroll: '#projects-section', width: 60},
    {name: "Minigames", path: "/minigames", width: 80},
    {name: "Functions", path: "/functions", width: 72},
    {name: "Contact", path: "/contact", width: 74, menu: true},
    {name: "More", path: "", width: 54, menu: true}
  ]

export const subPages = {
"Contact": [
    {name: "Resume", path: "/resume", width: 74},
    {name: "Email", path: "mailto:jtepp+site@icloud.com", width: 74},
    {name: "Form", path: "/contact", width: 74}
], 
"More": [
    {name: "Minigames", path: "/minigames", width: 80},
    {name: "Functions", path: "/functions", width: 72}
]
}


function Main() {
    const [resizeState, setResizeState] = useState(false)

    const [pages, setPages] = useState(pagesMaster)


    useEffect(() => {
        if (window.innerWidth > 655) {
            setPages(pagesMaster.slice(0, pagesMaster.length - 1))
        } else {
            setPages([...pagesMaster.slice(0, 2), ...pagesMaster.slice(4, pagesMaster.length)])
        }
    }, [resizeState])

    const initialIndex = () => {
        const path = window.location.pathname
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].path === path) {
                return i
            }
        }
        return 0

    }
    let [activeIndex, setActiveIndex] = useState(0)
    let [hoverIndex, setHoverIndex] = useState(-1)
    useEffect(() => {
        setActiveIndex(initialIndex())
        setResizeState(r => !r)
    }, [])

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
                </Routes>
            </Base>
         </BrowserRouter>
     );
}

export default Main;