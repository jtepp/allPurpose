import React, { useEffect, useState } from 'react'
// import { GameCase } from './gameCase'
import "../../css/minigames.css"
import Section from '../section';
import CRT from './CRT';
import gameData from '../../res/minigames/gameData.json'

function Minigames(props) {
    const [currentGameIndex, setCurrentGameIndex] = useState(0)

    const resizeIframe = () => {
        const iframe = document.querySelector('#game-iframe')
        const cont = document.querySelector('#crt-content')
        // const calcPad = getComputedStyle(cont).padding.replace('px', '')
        const padding = 2*((gameData[currentGameIndex].height === 600 ? 0.18 : 0.15)*cont.offsetWidth) + 80
        // console.log(padding)
        // scale the iframe down so that the longest dimension fits in the container
        // calculate a ratio to use with css scaling
        const ratio = Math.max(Math.min((cont.offsetWidth - padding) / iframe.offsetWidth, (cont.offsetHeight - padding) / iframe.offsetHeight), 0 / iframe.offsetWidth)

    
        // scale the iframe
        iframe.style.scale = `${ratio}`
        console.log(ratio)

        document.querySelector(':root').style.setProperty('--crt-width', `${cont.offsetWidth}px`)
    }

    useEffect(()=> {
        document.querySelector('#game-iframe').onload = resizeIframe
        resizeIframe()
    }, [props.resizeState, currentGameIndex, resizeIframe])

    
    return ( 
        <Section id="minigames">
            <div id="minigames-content">
                <div id="game-container">
                    <div id="game-info">
                        <div id="game-title">{gameData[currentGameIndex].title}</div>
                        <div id="game-controls">{gameData[currentGameIndex].co}</div>
                        <div id="game-description">{gameData[currentGameIndex].description}</div>
                    </div>
                    <CRT currentGameIndex={currentGameIndex} resizeState={props.resizeState}
                    bgColor={gameData[currentGameIndex].bgColor} text={gameData[currentGameIndex].title}>
                        <iframe id='game-iframe' title='game' src={`https://www.khanacademy.org/computer-programming${gameData[currentGameIndex].url}embedded?editor=no&buttons=no&author=no&embed=yes`}
                        width={gameData[currentGameIndex].width}
                        height={gameData[currentGameIndex].height}                    
                        frameborder="0" scrolling="no" border="0"
                        style={{
                            minWidth: gameData[currentGameIndex].width,
                            minHeight: gameData[currentGameIndex].height,
                        }}
                        />
                    </CRT>
                </div>
            </div>
        </Section>
     );
}

export default Minigames;