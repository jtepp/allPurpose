import { useEffect } from "react";
import Header from "../Header/Header";
import { setRandomColor } from "../../utils";
import styles from "./BaseLayout.module.css";

// layout
function BaseLayout({ children }) {
    useEffect(() => {
        setRandomColor();
    }, []);

    useEffect(() => {
        const interval = setInterval(setRandomColor, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id={styles.base}>
            <Header />
            <main id="content">{children}</main>
        </div>
    );
}

export default BaseLayout;
