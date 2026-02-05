import "../../css/crt.css";
import CRTborder from "../../assets/minigames/crt-border.png";

function Crt({ bgColor, text, onClick, children }) {
    return (
        <div id="crt-container" onClick={onClick}>
            <div id="crt-static" className="crt-internal"></div>
            <div
                id="crt-content"
                className="crt-internal"
                style={{
                    backgroundColor: bgColor,
                }}
            >
                {children}
            </div>
            <div id="crt-text" className="crt-internal">
                {text}
            </div>
            <div id="crt-shadow" className="crt-internal"></div>
            <div id="crt-screen-door-rows" className="crt-internal"></div>
            <div id="crt-screen-door-cols" className="crt-internal"></div>
            {/* <div id="crt-scan-bar" className="crt-internal"></div> */}
            <img draggable="false" id="crt-border" src={CRTborder} alt="" />
        </div>
    );
}

export default Crt;
