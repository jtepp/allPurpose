import React, { useEffect, useState } from 'react'
import '../css/base.css'
import Header from './header';
import { pages } from '..';

function Base(props) {

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
        <div id="base">
            <Header activeIndex={activeIndex} setActiveIndex={setActiveIndex}
                hoverIndex={hoverIndex} setHoverIndex={setHoverIndex}
            />
            <div id="content">
                {props.children}
            </div>
        </div>
     );
}

export default Base;