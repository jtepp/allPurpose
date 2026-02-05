import { useEffect } from "react";
import "../css/base.css";
import Header from "./Header";
import { setRandomColor } from "../utils";

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
        <div id="base">
            <Header />
            <div id="content">{children}</div>
        </div>
    );
}

export default BaseLayout;
