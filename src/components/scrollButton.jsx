import React from 'react'
import roundedChevronDown from '../res/rounded-chevron-down.png'

function ScrollButton(props) {
    return ( 
        <div id="scroll-button" onClick={() => {
            if (document.querySelector(props.target))
                document.querySelector(props.target).scrollIntoView({behavior: 'smooth'});
        }}>
            <img src={roundedChevronDown}/>
        </div>
     );
}

export default ScrollButton;