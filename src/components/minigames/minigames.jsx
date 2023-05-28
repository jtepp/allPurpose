import React, { useCallback, useEffect, useState } from 'react'
import "../../css/minigames.css"
import Section from '../section';
import CRT from './CRT';
import gameData from '../../res/minigames/gameData.json'
import Cutout from '../cutout';
import ReactHTMLParser from 'react-html-parser';
import { importAll } from '../../utils';
import Cartridge from './cartridge';
const gameThumbs = importAll(require.context('../../res/minigames/thumbs', false, /\.(png|jpe?g|svg|gif)$/))

function Minigames(props) {
    const [currentGameIndex, setCurrentGameIndex] = useState(-1)

    const resizeIframe = useCallback(() => {
        const iframe = document.querySelector('#game-iframe')
        const cont = document.querySelector('#crt-content')
        // const calcPad = getComputedStyle(cont).padding.replace('px', '')
        const i = currentGameIndex === -1 ? 0 : currentGameIndex
        const padFactor = (gameData[i].height === 600 ? 0.18 : gameData[i].width === 600 ? 0.12 : 0.15)
        const padding = 2*(padFactor*cont.offsetWidth) + 80
        // console.log(padding)
        // scale the iframe down so that the longest dimension fits in the container
        // calculate a ratio to use with css scaling
        const ratio = Math.max(Math.min((cont.offsetWidth - padding) / iframe.offsetWidth, (cont.offsetHeight - padding) / iframe.offsetHeight), 0 / iframe.offsetWidth)

    
        // scale the iframe
        iframe.style.scale = `${ratio}`
        console.log(ratio)

        document.querySelector(':root').style.setProperty('--crt-width', `${cont.offsetWidth}px`)
    }, [currentGameIndex])

    // useEffect(()=> {
    //     changeGame(0)
    // }
    useEffect(()=> {
        document.querySelector('#game-iframe').onload = resizeIframe
        resizeIframe()
    }, [props.resizeState, currentGameIndex, resizeIframe])

    const changeGame = (index) => {
        const current = document.querySelector('.current-game')
        const next = document.querySelector("[index='" + index + "']")
        let order = 0
        if (current) {
            order = Number(current.getAttribute('index'))
            current.classList.remove('current-game')
        }
        next.classList.add('current-game')
        next.style.order = order

        setCurrentGameIndex(index)
    }

    const cartridges = gameData.map((game, index) => {
        return <Cartridge index={index} onClick={()=>{
            changeGame(index)
        }} img={gameThumbs[game.img]} title={game.short || game.title} />
    })

    return ( 
        <Section id="minigames">
            <div id="minigames-content">
                <div id="game-container">
                    <div id="game-info">
                        <Cutout id="minigame-cutout">
                            <h1 id="game-title">{currentGameIndex === -1 ? "Minigames" : gameData[currentGameIndex].title}</h1>
                        </Cutout>
                            <h3 id="game-description">{currentGameIndex === -1 ? "Click on a game cartdrige below to play!" : gameData[currentGameIndex].description}</h3>
                            <br />
                            <h2 id='game-controls-heading'>{currentGameIndex === -1 ? "" : "Controls"}</h2>
                            <h3 id="game-controls">{ReactHTMLParser(currentGameIndex === -1 ? "" : gameData[currentGameIndex].controls)}</h3>
                        </div>
                        <CRT currentGameIndex={currentGameIndex} resizeState={props.resizeState}
                        bgColor={currentGameIndex === -1 ? "transparent" : gameData[currentGameIndex].bgColor} text={currentGameIndex === -1 ? "Input 3" : gameData[currentGameIndex].title}
                        onClick={()=>{
                            changeGame((currentGameIndex + 1) % gameData.length)
                        }}>
                            <iframe id='game-iframe' title='game'
                            src={currentGameIndex === -1 ? "" : `https://www.khanacademy.org/computer-programming${gameData[currentGameIndex].url}embedded?editor=no&buttons=no&author=no&embed=yes`}
                            width={currentGameIndex === -1 ? 0 : gameData[currentGameIndex].width}
                            height={currentGameIndex === -1 ? 0 : gameData[currentGameIndex].height}                    
                            frameborder="0" scrolling="no" border="0"
                            style={{
                                minWidth: currentGameIndex === -1 ? "100%" : gameData[currentGameIndex].width,
                                minHeight: currentGameIndex === -1 ? "100%" : gameData[currentGameIndex].height,
                            }}
                            />
                    </CRT>
                </div>
                <div id="game-select-container">
                    {cartridges}
                </div>
            </div>
        </Section>
     );
}

export default Minigames;