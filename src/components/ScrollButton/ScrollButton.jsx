import roundedChevronDown from "../../assets/rounded-chevron-down.png";
import styles from "./ScrollButton.module.css";

function ScrollButton({ target }) {
    return (
        <div
            className={styles.scroll_button}
            onClick={() => {
                if (document.querySelector(target))
                    document
                        .querySelector(target)
                        .scrollIntoView({ behavior: "smooth" });
            }}
        >
            <img
                src={roundedChevronDown}
                alt="scroll down"
                className={styles.chevron}
            />
        </div>
    );
}

export default ScrollButton;
