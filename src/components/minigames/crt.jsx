import React from 'react'
import '../../css/crt.css'
import CRTborder from '../../res/minigames/crt-border.png'

export default function CRT(props) {
    return ( 
        <div id='crt-container'>
            <div id='crt-static' className='crt-internal'></div>
            <div id="crt-content" className='crt-internal'>
                {props.children}
            </div>
            <div id="crt-shadow" className='crt-internal'></div>
            <div id="crt-screen-door-rows" className='crt-internal'></div>
            <div id="crt-screen-door-cols" className='crt-internal'></div>
            <img id='crt-border' src={CRTborder} alt="" />
        </div>
     );
}