import "../../../css/cartridge.css";

function Cartridge({ onClick, index, className, img, title }) {
    return (
        <div
            onClick={onClick}
            style={{
                order: index,
            }}
            className={(className || "") + " game-cartridge-cont"}
        >
            <div className="game-cartridge" title={title}>
                <img src={img} alt="" className="cartridge-img" />
                <div className="game-cartridge-overlay"></div>
            </div>
        </div>
    );
}

export default Cartridge;
