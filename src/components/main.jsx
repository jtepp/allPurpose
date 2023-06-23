import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from './base';
import Home from './home';
import { pages } from '..';
import Minigames from './minigames/minigames';
import Contact from './contact';

function Main() {
    const [resizeState, setResizeState] = useState(false)

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
        setResizeState(!resizeState)
    }


    return ( 
        <BrowserRouter>
            <Base activeIndex={activeIndex} setActiveIndex={setActiveIndex} 
                hoverIndex={hoverIndex} setHoverIndex={setHoverIndex} resizeState={resizeState}>
                <Routes>
                <Route path="/" element={<Home activeIndex={activeIndex} setActiveIndex={setActiveIndex}
                hoverIndex={hoverIndex} setHoverIndex={setHoverIndex} resizeState={resizeState}/>} />
                <Route path="/minigames" element={<Minigames resizeState={resizeState}/>}/>
                <Route path='/contact' element={<Contact resizeState={resizeState}/>} />
                </Routes>
            </Base>
         </BrowserRouter>
     );
}

export default Main;