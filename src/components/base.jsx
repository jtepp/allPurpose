import React, { useEffect } from 'react'
import '../css/base.css'
import Header from './header';
import { randomElement } from '../utils';


    
const colorPairs = [
    { primary: 'red', secondary: 'darkorange' },
    { primary: 'darkorange', secondary: 'yellow' },
    { primary: 'yellow', secondary: 'limegreen' },
    { primary: 'limegreen', secondary: 'cyan' },
    { primary: 'cyan', secondary: 'blue' },
    { primary: 'cornflowerblue', secondary: 'darkseagreen' },
    { primary: 'magenta', secondary: 'red' },
    { primary: 'orchid', secondary: 'white' },
    { primary: 'gold', secondary: 'darkred' },
    { primary: 'teal', secondary: 'olive' },
    { primary: 'coral', secondary: 'turquoise' },
    { primary: 'salmon', secondary: 'navajowhite' }
  ];

function Base(props) {

    function setRandomColor() {
        Object.entries(randomElement(colorPairs)).forEach(([key, value]) => {
            document.querySelector(':root').style.setProperty(`--${key}`, value)
            console.log(`--${key}: ${value}`)
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
                hoverIndex={props.hoverIndex} setHoverIndex={props.setHoverIndex}
            />
            <div id="content">
                {props.children}
            </div>
        </div>
     );
}

export default Base;