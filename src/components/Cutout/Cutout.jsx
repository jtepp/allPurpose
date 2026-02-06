import { useCallback, useEffect, useRef } from "react";
import styles from "./Cutout.module.css";

function Cutout({
    headerSizeState,
    id,
    below,
    upperLevel,
    backgroundColor,
    children,
}) {
    const containerRef = useRef(null);
    const mainRef = useRef(null);

    const moveAccent = (e) => {
        const root = document.querySelector(":root");

        root.style.setProperty("--accent-x", e.clientX + "px");
        root.style.setProperty("--accent-y", e.clientY + "px");
    };

    const moveScroll = useCallback((e) => {
        const root = document.querySelector(":root");

        const scrollTop = mainRef.current.scrollTop;
        const scrollLeft = mainRef.current.scrollLeft;

        root.style.setProperty("--scroll-x", scrollLeft + "px");
        root.style.setProperty("--scroll-y", scrollTop + "px");
    }, []);

    useEffect(() => {
        document.body.onmousemove = moveAccent;
        mainRef.current.onscroll = moveScroll;
    }, [id, moveScroll]);

    return (
        <div
            id={id + "-container"}
            ref={containerRef}
            style={{
                zIndex: 10,
                position: "relative",
            }}
        >
            <div className={styles.color_strip}></div>
            <div className={styles.cutout_color_accent_container}>
                <div
                    className={styles.color_accent}
                    style={{
                        top: `calc(var(--accent-y) + ${-containerRef.current?.getBoundingClientRect().y}px)`,
                        left: `calc(var(--accent-x) + ${containerRef.current?.getBoundingClientRect().x - containerRef.current?.offsetLeft * 2}px)`,
                    }}
                ></div>
            </div>

            {upperLevel}
            <div
                className={[
                    "cutout",
                    headerSizeState ? "header-size-" + headerSizeState : "",
                ].join(" ")}
                ref={mainRef}
                id={id}
                style={{
                    backgroundColor: backgroundColor,
                    zIndex: 10,
                    position: "relative",
                }}
            >
                {children}
            </div>
            {below}
        </div>
    );
}

export default Cutout;
