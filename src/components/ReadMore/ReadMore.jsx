import { useState } from "react";
import styles from "./ReadMore.module.css";

function ReadMore({ id, title, hiddenText, hoverText, show }) {
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    return (
        <div
            className={[styles.container, hover || open ? styles.gap : ""].join(
                " ",
            )}
            id={id || ""}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {title || null}
            {show ? <p>{show}</p> : null}

            {hoverText ? (
                <div
                    className={[
                        styles.collapsible_wrapper,
                        hover || open ? styles.open : "",
                    ].join(" ")}
                >
                    <div className={styles.collapsible_content}>
                        {hoverText}
                    </div>
                </div>
            ) : null}

            <div className={styles.read_more_container}>
                {open && hiddenText ? <p>{hiddenText}</p> : null}

                <span
                    className={styles.toggle}
                    onClick={() => setOpen((o) => !o)}
                >
                    {open ? "Read less" : "Read more"}
                </span>
            </div>
        </div>
    );
}

export default ReadMore;
