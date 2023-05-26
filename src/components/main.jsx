import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from './base';
import Home from './home';
import { pages } from '..';
import Minigames from './minigames/minigames';

function Main() {
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
    }, [])

    return ( 
        <BrowserRouter>
            <Base activeIndex={activeIndex} setActiveIndex={setActiveIndex} 
                hoverIndex={hoverIndex} setHoverIndex={setHoverIndex}>
                <Routes>
                <Route path="/" element={<Home activeIndex={activeIndex} setActiveIndex={setActiveIndex}
                hoverIndex={hoverIndex} setHoverIndex={setHoverIndex}/>} />
                <Route path="/minigames" element={<Minigames/>}/>
                </Routes>
            </Base>
         </BrowserRouter>
     );
}

export default Main;