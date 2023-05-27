import React from 'react'
// import { GameCase } from './gameCase'
import "../../css/minigames.css"
import Section from '../section';
import CRT from './CRT';
import { thumbnails } from '../home';

function Minigames(props) {
    return ( 
        <Section id="minigames">
            <div id="minigames-content">
                <CRT>
                    <img src={thumbnails["larrybirdle"]} alt="" />
                </CRT>
            </div>
        </Section>
     );
}

export default Minigames;