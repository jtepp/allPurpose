import React from 'react'
// import { GameCase } from './gameCase'
import "../../css/minigames.css"
import Section from '../section';
import CRT from './crt';
import { thumbnails } from '../home';

function Minigames(props) {
    return ( 
        <Section id="minigames">
            <CRT>
                <img src={thumbnails["larrybirdle"]} alt="" />
            </CRT>
        </Section>
     );
}

export default Minigames;