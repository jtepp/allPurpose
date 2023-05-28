import React, { useEffect } from 'react'
import '../css/base.css'
import Header from './header';
import { randomElement } from '../utils';


    
const colorPairs = [
    { primary: 'firebrick', secondary: 'darkorange' },
    { primary: 'darkorange', secondary: 'yellow' },
    { primary: 'darkgoldenrod', secondary: 'gold' },
    { primary: 'seagreen', secondary: 'limegreen' },
    { primary: 'royalblue', secondary: 'mediumturquoise' },
    { primary: 'blueviolet', secondary: 'orchid' },
    { primary: 'teal', secondary: 'skyblue' },
  ];

function Base(props) {

    function setRandomColor() {
        Object.entries(randomElement(colorPairs)).forEach(([key, value]) => {
            document.querySelector(':root').style.setProperty(`--${key}`, value)
            // console.log(`--${key}: ${value}`)
        })

        setTimeout(() => {
            document.querySelector(':root').style.setProperty('--color-transition-time', '3s')
        }, 1000)
    }

    useEffect(() => {
        setRandomColor()
    }, [])
  
    useEffect(() => {
        const interval = setInterval(setRandomColor, 8000);
  
        return () => clearInterval(interval);
    }, []);
    

    return ( 
        <div id="base">
            <Header activeIndex={props.activeIndex} setActiveIndex={props.setActiveIndex}
                hoverIndex={props.hoverIndex} setHoverIndex={props.setHoverIndex} resizeState={props.resizeState} setResizeState={props.setResizeState}
            />
            <div id="content">
                {props.children}
            </div>
        </div>
     );
}

export default Base;