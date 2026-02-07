import CRTborder from "../../../assets/minigames/crt-border.png";
import styles from "./Crt.module.css";

function Crt({ bgColor, text, onClick, children }) {
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={[styles.internal, styles.static].join(" ")}></div>
            <div
                id="crt-content"
                className={[styles.internal, styles.content].join(" ")}
                style={{
                    backgroundColor: bgColor,
                }}
            >
                {children}
            </div>
            <div className={[styles.internal, styles.text].join(" ")}>
                {text}
            </div>
            <div className={[styles.internal, styles.shadow].join(" ")}></div>
            <div className={[styles.internal, styles.screen_door_rows]}></div>
            <div className={[styles.internal, styles.screen_door_cols]}></div>

            {/* <div className={[styles.internal, styles.scan_bar].join(" ")}
></div> */}
            <img
                draggable="false"
                className={styles.border}
                src={CRTborder}
                alt=""
            />
        </div>
    );
}

export default Crt;
