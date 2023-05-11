import '../css/ShinyText.css'
import React, {useEffect} from 'react'
import { randomElement } from '../utils';

const colorPairs = [
    { primary: 'red', secondary: 'darkorange' },
    { primary: 'darkorange', secondary: 'yellow' },
    { primary: 'yellow', secondary: 'limegreen' },
    { primary: 'limegreen', secondary: 'cyan' },
    { primary: 'cyan', secondary: 'blue' },
    { primary: 'blue', secondary: 'magenta' },
    { primary: 'magenta', secondary: 'red' },
    { primary: 'purple', secondary: 'pink' },
    { primary: 'darkblue', secondary: 'silver' },
    { primary: 'gold', secondary: 'darkred' },
    { primary: 'teal', secondary: 'olive' },
    { primary: 'coral', secondary: 'turquoise' },
    { primary: 'indigo', secondary: 'chartreuse' },
    { primary: 'salmon', secondary: 'sienna' }
  ];
  

function ShinyText(props) {

    useEffect(() => {
        Object.entries(randomElement(colorPairs)).forEach(([key, value]) => {
            document.querySelector(':root').style.setProperty(`--shiny-${key}`, value)
            console.log(`--shiny-${key}: ${value}`)
        })
    })

    return ( 
        <div className="shiny-text">
            {props.children}
        </div>
     )
}

export default ShinyText;