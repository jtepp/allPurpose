import React, { useState } from 'react'
// import { GameCase } from './gameCase'
import "../../css/minigames.css"
import Section from '../section';
import CRT from './CRT';
import gameData from '../../res/minigames/gameData.json'

function Minigames(props) {
    const [currentGameIndex, setCurrentGameIndex] = useState(0)

    
    return ( 
        <Section id="minigames">
            <div id="minigames-content">
                <CRT currentGameIndex={currentGameIndex} resizeState={props.resizeState}>
                    <iframe id='game-iframe' title='game' src={`https://www.khanacademy.org/computer-programming${gameData[currentGameIndex].url}embedded?editor=no&buttons=no&author=no&embed=yes`}
                    width={gameData[currentGameIndex].width}
                    height={gameData[currentGameIndex].height}                    
                    frameborder="0" scrolling="no" border="0px"
                    style={{
                        minWidth: gameData[currentGameIndex].width,
                        minHeight: gameData[currentGameIndex].height,
                    }}
                     />
                </CRT>
            </div>
        </Section>
     );
}

export default Minigames;