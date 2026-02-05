import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "./BaseLayout";
import Home from "../pages/Home";
import Minigames from "../pages/Minigames";
import Contact from "../pages/Contact";
import Functions from "../pages/Functions";
import {
    desktopNavItemIndices,
    navItems,
    mobileNavItemIndices,
} from "../data/navigation";

// router + states
function Main() {
    const [resizeState, setResizeState] = useState(false);
    const [headerSizeState, setHeaderSizeState] = useState("big");

    let [activeIndex, setActiveIndex] = useState(0);
    let [hoverIndex, setHoverIndex] = useState(-1);
    // const prevPages = useRef(null)

    useEffect(() => {
        if (window.innerWidth > 655 && headerSizeState === "small") {
            setHeaderSizeState("big");
        } else if (window.innerWidth <= 655 && headerSizeState === "big") {
            setHeaderSizeState("small");
        }
    }, [resizeState, headerSizeState]);

    const loadDesktopNavItems = useCallback(() => {
        setActiveIndex(desktopNavItemIndices[navItems[activeIndex]?.name]);
    }, [activeIndex]);

    const loadMobileNavItems = useCallback(() => {
        let temp = activeIndex;
        if (temp === 2 || temp === 3) temp += 2;

        setActiveIndex(mobileNavItemIndices[navItems[temp]?.name]);
    }, [activeIndex]);

    useEffect(() => {
        if (headerSizeState === "big") {
            loadDesktopNavItems();
        } else if (headerSizeState === "small") {
            loadMobileNavItems();
        }
    }, [headerSizeState, loadDesktopNavItems, loadMobileNavItems]);

    const initialIndex = useCallback(() => {
        const path = window.location.pathname;
        for (let i = 0; i < navItems.length; i++) {
            if (navItems[i].path === path) {
                return i;
            }
        }
        return 0;
    }, []);

    useEffect(() => {
        setActiveIndex(initialIndex());
        setResizeState((r) => !r);
    }, [initialIndex]);

    window.onresize = () => {
        setResizeState((r) => !r);
    };

    return (
        <BrowserRouter>
            <BaseLayout
                pages={navItems}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                headerSizeState={headerSizeState}
                hoverIndex={hoverIndex}
                setHoverIndex={setHoverIndex}
                resizeState={resizeState}
                setResizeState={setResizeState}
            >
                <Routes>
                    <Route
                        path="*"
                        element={
                            <Home
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                                hoverIndex={hoverIndex}
                                setHoverIndex={setHoverIndex}
                                resizeState={resizeState}
                                setResizeState={setResizeState}
                            />
                        }
                    />
                    <Route
                        path="/minigames"
                        element={<Minigames resizeState={resizeState} />}
                    />
                    <Route
                        path="/contact"
                        element={<Contact resizeState={resizeState} />}
                    />{" "}
                    <Route
                        path="/functions"
                        element={<Functions resizeState={resizeState} />}
                    />
                </Routes>
            </BaseLayout>
        </BrowserRouter>
    );
}

export default Main;
