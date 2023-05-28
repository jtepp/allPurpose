import React, { useEffect } from 'react'
import '../../css/crt.css'
import CRTborder from '../../res/minigames/crt-border.png'

export default function CRT(props) {
    const resizeIframe = () => {
        const iframe = document.querySelector('#game-iframe')
        const cont = document.querySelector('#crt-content')
        // const calcPad = getComputedStyle(cont).padding.replace('px', '')
        const padding = 2*(0.2*cont.offsetWidth)
        // console.log(padding)
        // scale the iframe down so that the longest dimension fits in the container
        // calculate a ratio to use with css scaling
        const ratio = Math.max(Math.min((cont.offsetWidth - padding) / iframe.offsetWidth, (cont.offsetHeight - padding) / iframe.offsetHeight), 355 / iframe.offsetWidth)

    
        // scale the iframe
        iframe.style.scale = `${ratio}`
        console.log(ratio)
    }

    useEffect(()=> {
        document.querySelector('#game-iframe').onload = resizeIframe
        resizeIframe()
    }, [props.resizeState])


    return ( 
        <div id='crt-container'>
            <div id='crt-static' className='crt-internal'></div>
            <div id="crt-content" className='crt-internal'>
                {props.children}
            </div>
            <div className="crt-text crt-internal">Input 3</div>
            <div id="crt-shadow" className='crt-internal'></div>
            <div id="crt-screen-door-rows" className='crt-internal'></div>
            <div id="crt-screen-door-cols" className='crt-internal'></div>
            {/* <div id="crt-scan-bar" className="crt-internal"></div> */}
            <img draggable="false" id='crt-border' src={CRTborder} alt="" />
        </div>
     );
}