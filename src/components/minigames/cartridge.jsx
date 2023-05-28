import React from 'react'
import '../../css/cartridge.css'

function Cartridge(props) {
    return (
    <div class="game-cartridge-cont">
            <div class="game-cartridge" title={props.title}>
                <img src={props.img} alt="" class="cartridge-img" />
            <div class="game-cartridge-overlay"></div>
        </div>
    </div>
)
}

export default Cartridge;