import React from 'react'
import '../../css/cartridge.css'

function Cartridge(props) {
    return (
    <div onClick={props.onClick} index={props.index} style={{
        order: props.index,
    }} className={(props.className || "") + " game-cartridge-cont"}>
            <div className="game-cartridge" title={props.title}>
                <img src={props.img} alt="" className="cartridge-img" />
            <div className="game-cartridge-overlay"></div>
        </div>
    </div>
)
}

export default Cartridge;