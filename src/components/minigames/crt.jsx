import React from 'react'
import '../../css/crt.css'
import CRTborder from '../../res/minigames/crt-border.png'
import staticGIF from '../../res/minigames/static.gif'

export default function CRT() {
    return ( 
        <div id='crt-container'>
            <img id='crt-img' src={CRTborder} alt="" />
            <img id='static-gif' src={staticGIF} alt="" />
        </div>
     );
}