import styles from "./Cartridge.module.css";

function Cartridge({ onClick, index, className = "", img, title }) {
    return (
        <div
            onClick={onClick}
            style={{
                order: index,
            }}
            className={[styles.container, className].join(" ")}
            data-index={index}
        >
            <div className={styles.cartridge} title={title}>
                <img src={img} alt="" className={styles.image} />
                <div className={styles.overlay}></div>
            </div>
        </div>
    );
}

export default Cartridge;
