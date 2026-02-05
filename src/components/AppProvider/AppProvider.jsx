import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    desktopNavItemIndices,
    mobileNavItemIndices,
    navItems,
} from "../../data/navigation";
import useWindowSize from "../../hooks/useWindowSize";

const AppContext = createContext();

function AppProvider({ children }) {
    const { width } = useWindowSize();
    const [headerSizeState, setHeaderSizeState] = useState("big");

    let [activeIndex, setActiveIndex] = useState(0);
    let [hoverIndex, setHoverIndex] = useState(-1);
    // const prevPages = useRef(null)

    useEffect(() => {
        if (width > 655 && headerSizeState === "small") {
            setHeaderSizeState("big");
        } else if (width <= 655 && headerSizeState === "big") {
            setHeaderSizeState("small");
        }
    }, [width, headerSizeState]);

    const loadDesktopNavItems = useCallback(() => {
        setActiveIndex(desktopNavItemIndices[navItems[activeIndex]?.name]);
    }, [activeIndex]);

    const loadMobileNavItems = useCallback(() => {
        let temp = activeIndex;
        if (temp === 2 || temp === 3) temp += 2; // skip 2 and 3

        setActiveIndex(mobileNavItemIndices[navItems[temp]?.name]);
    }, [activeIndex]);

    useEffect(() => {
        if (headerSizeState === "big") {
            loadDesktopNavItems();
        } else if (headerSizeState === "small") {
            loadMobileNavItems();
        }
    }, [headerSizeState, loadDesktopNavItems, loadMobileNavItems]);

    const getInitialIndex = useCallback(() => {
        const path = window.location.pathname;
        for (let i = 0; i < navItems.length; i++) {
            if (navItems[i].path === path) {
                return i;
            }
        }
        return 0;
    }, []);

    useEffect(() => {
        setActiveIndex(getInitialIndex());
    }, [getInitialIndex]);

    const value = useMemo(
        () => ({
            activeIndex,
            setActiveIndex,
            hoverIndex,
            setHoverIndex,
            headerSizeState,
            setHeaderSizeState,
        }),
        [activeIndex, headerSizeState, hoverIndex],
    );
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;

export function useAppContext() {
    return useContext(AppContext);
}
