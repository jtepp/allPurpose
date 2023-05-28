import React, { useEffect, useState } from 'react'
// import { GameCase } from './gameCase'
import "../../css/minigames.css"
import Section from '../section';
import CRT from './CRT';
import gameData from '../../res/minigames/gameData.json'

function Minigames(props) {
    const [currentGameIndex, setCurrentGameIndex] = useState(0)

    useEffect(() => {
        const iframe = document.querySelector('#game-iframe')
        const cont = document.querySelector('#crt-content')
        // scale the iframe down so that the longest dimension fits in the container
        // 

    
        // scale the iframe
        // iframe.style.transform = `scale(${ratio})`
        console.log(true)
    }, [props.resizeState])

    
    return ( 
        <Section id="minigames">
            <div id="minigames-content">
                <CRT>
                    <iframe id='game-iframe' title='game' src={`https://www.khanacademy.org/computer-programming${gameData[currentGameIndex].url}embedded?editor=no&buttons=no&author=no&embed=yes`}
                    width={gameData[currentGameIndex].width}
                    height={gameData[currentGameIndex].height}                    
                    frameborder="0" scrolling="no"
                    style={{
                        border: '0px',
                        minWidth: gameData[currentGameIndex].width,
                        height: gameData[currentGameIndex].height,
                    }}
                     />
                </CRT>
            </div>
        </Section>
     );
}

export default Minigames;