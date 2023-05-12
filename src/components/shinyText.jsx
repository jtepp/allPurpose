import '../css/shinyText.css'
import React from 'react'
import { randomElement } from '../utils';

const colorPairs = [
    { primary: 'red', secondary: 'darkorange' },
    { primary: 'darkorange', secondary: 'yellow' },
    { primary: 'yellow', secondary: 'limegreen' },
    { primary: 'limegreen', secondary: 'cyan' },
    { primary: 'cyan', secondary: 'blue' },
    { primary: 'cornflowerblue', secondary: 'darkseagreen' },
    { primary: 'magenta', secondary: 'red' },
    { primary: 'purple', secondary: 'pink' },
    { primary: 'gold', secondary: 'darkred' },
    { primary: 'teal', secondary: 'olive' },
    { primary: 'coral', secondary: 'turquoise' },
    { primary: 'salmon', secondary: 'navajowhite' }
  ];

Object.entries(randomElement(colorPairs)).forEach(([key, value]) => {
    document.querySelector(':root').style.setProperty(`--shiny-${key}`, value)
    console.log(`--shiny-${key}: ${value}`)
})
  

function ShinyText(props) {

    return ( 
        <div className="shiny-text">
            {props.children}
        </div>
     )
}

export default ShinyText;