import { useEffect } from "react";
import Header from "../Header/Header";
import { setRandomColor } from "../../utils";
import styles from "./BaseLayout.module.css";
import { useLocation } from "react-router-dom";

// layout
function BaseLayout({ children }) {
    const { pathname } = useLocation();
    const whiteList = ["time-trials"];

    useEffect(() => {
        setRandomColor();
    }, []);

    useEffect(() => {
        const interval = setInterval(setRandomColor, 8000);

        return () => clearInterval(interval);
    }, []);

    return whiteList.some((x) => pathname.includes(x)) ? (
        children
    ) : (
        <div id={styles.base}>
            <Header />
            <main id="content">{children}</main>
        </div>
    );
}

export default BaseLayout;
