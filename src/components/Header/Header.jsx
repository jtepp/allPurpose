import { useCallback, useEffect, useRef } from "react";
import HeaderLink from "../HeaderLink/HeaderLink.jsx";
import Cutout from "../Cutout/Cutout.jsx";
import "../../css/header.css";
import HeaderMenu from "../HeaderMenu/HeaderMenu.jsx";
import {
    desktopNavItemIndices,
    smallHoverIndices,
    mobileNavItemIndices,
    subPages,
    navItems,
} from "../../data/navigation.js";
import { useLocation } from "react-router-dom";
import { getCurrentPageName } from "../../utils.js";
import { useAppContext } from "../AppProvider/AppProvider.jsx";
import useWindowSize from "../../hooks/useWindowSize.js";

function Header() {
    const {
        activeIndex,
        setActiveIndex,
        hoverIndex,
        setHoverIndex,
        headerSizeState,
    } = useAppContext();
    const { width } = useWindowSize();

    const headerLine = useRef(null);
    const headerLineBack = useRef(null);
    const location = useLocation();

    const calculateHeaderLineOffset = useCallback(() => {
        let pageIndicesToUse =
            headerSizeState === "big"
                ? Array.from(new Set(Object.values(desktopNavItemIndices)))
                : Array.from(new Set(Object.values(mobileNavItemIndices)));
        let taken = pageIndicesToUse.reduce((result, index) => {
            // console.log(index)
            return result + navItems?.[index]?.width;
        }, 0);

        const nGaps = pageIndicesToUse.length;

        const gap = (width - taken) / nGaps;

        let index = 0;

        let tempActiveIndex = activeIndex;
        if (tempActiveIndex === undefined) {
            // find .name for current path
            const name = getCurrentPageName(navItems, location);
            const indexMap =
                headerSizeState === "big"
                    ? desktopNavItemIndices
                    : mobileNavItemIndices;
            tempActiveIndex = indexMap[name];
        }

        if (hoverIndex > -1) {
            index = hoverIndex;
        } else {
            index = tempActiveIndex;
        }

        // console.log(index, hoverIndex, activeIndex, stupidActiveIndex)

        let offset = gap / 2;
        offset += index * gap;
        for (let i = 0; i < index; i++) {
            offset += navItems[i].width;
        }

        if (headerSizeState === "small") {
            offset += index === 0 ? 3 : 10;
        }

        return offset;
    }, [headerSizeState, width, activeIndex, hoverIndex, location]);

    const setHeaderLine = useCallback(() => {
        let index = 0;
        if (hoverIndex > -1) {
            index = hoverIndex;
        } else {
            index = activeIndex;

            headerLineBack.current.style.left =
                calculateHeaderLineOffset() + "px";
            headerLineBack.current.style.width =
                navItems?.[index]?.width + "px";
        }
        headerLine.current.style.left = calculateHeaderLineOffset() + "px";
        headerLine.current.style.width = navItems?.[index]?.width + "px";
    }, [hoverIndex, calculateHeaderLineOffset, activeIndex]);

    useEffect(() => {
        setHeaderLine();
    }, [setHeaderLine]);

    const headerItems = navItems.map((page, index) => {
        const id = page.name.toLowerCase() + "-header-item";

        if (page.menu) {
            return (
                <HeaderMenu
                    name={page.name}
                    path={page.path}
                    width={page.width}
                    id={id}
                    onClick={() => {
                        let i =
                            headerSizeState === "big"
                                ? index
                                : smallHoverIndices[index];
                        setActiveIndex(i);
                        setHoverIndex(-1);
                    }}
                    onMouseEnter={() => {
                        let i =
                            headerSizeState === "big"
                                ? index
                                : smallHoverIndices[index];
                        setHoverIndex(i);
                    }}
                    onMouseLeave={() => {
                        setHoverIndex(-1);
                    }}
                    key={page.name}
                >
                    {subPages[page.name].map((subPage) => (
                        <HeaderLink
                            name={subPage.name}
                            path={subPage.path}
                            external={subPage.external}
                            width={subPage.width}
                            id={id}
                            key={subPage.name}
                            onClick={() => {
                                let i =
                                    headerSizeState === "big"
                                        ? index
                                        : smallHoverIndices[index];
                                setActiveIndex(i);
                                setHoverIndex(-1);
                            }}
                            onMouseEnter={() => {}}
                            onMouseLeave={() => {}}
                        />
                    ))}
                </HeaderMenu>
            );
        } else {
            return (
                <HeaderLink
                    name={page.name}
                    scroll={page.scroll}
                    activeIndex={activeIndex}
                    onClick={() => {
                        setActiveIndex(index);
                        setHoverIndex(-1);
                    }}
                    onMouseEnter={() => {
                        setHoverIndex(index);
                    }}
                    onMouseLeave={() => {
                        setHoverIndex(-1);
                    }}
                    path={page.path}
                    width={page.width}
                    id={id}
                    key={page.name}
                />
            );
        }
    });

    return (
        <Cutout
            id="header"
            upperLevel={<div id="header-line-back" ref={headerLineBack}></div>}
            backgroundColor="black"
            headerSizeState={headerSizeState}
        >
            {headerItems}
            <div id="header-line" ref={headerLine}></div>
        </Cutout>
    );
}

export default Header;
