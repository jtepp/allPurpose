import React, { useCallback, useEffect, useRef } from 'react'
import HeaderLink from './headerLink';
import Cutout from './cutout';
import '../css/header.css'
import HeaderMenu from './headerMenu';
import { bigPageIndices, smallHoverIndices, smallPageIndices, subPages } from './main';
import { useLocation } from 'react-router-dom';
import { getCurrentPageName } from '../utils';


function Header(props) {    
    const headerLine = useRef(null)
    const headerLineBack = useRef(null)
    const location = useLocation();

    const calculateHeaderLineOffset = useCallback(() => {
        const full = window.innerWidth
        let pageIndicesToUse = props.headerSizeState === "big" ? Array.from(new Set(Object.values(bigPageIndices))) : Array.from(new Set(Object.values(smallPageIndices))) 
        let taken = pageIndicesToUse.reduce((result, index) => {
            // console.log(index)
            return result + props?.pages?.[index]?.width
        }, 0)



        const nGaps = pageIndicesToUse.length;


        const gap =  (full - taken) / nGaps


        let index = 0;

        let stupidActiveIndex = props.activeIndex
        if (stupidActiveIndex === undefined) {
            // find .name for current path
            const name = getCurrentPageName(props.pages, location)
            const indexMap = props.headerSizeState === "big" ? bigPageIndices : smallPageIndices
            stupidActiveIndex = indexMap[name]
        }

        if (props.hoverIndex > -1) {
            index = props.hoverIndex
        } else {
            index = stupidActiveIndex
        }

        // console.log(index, props.hoverIndex, props.activeIndex, stupidActiveIndex)

        let offset = gap/2
        offset += index * gap
        for (let i = 0; i < index; i++) {
            offset += props.pages[i].width
        }

        if (props.headerSizeState === 'small')
        {
            offset += index === 0 ? 3 : 10
        }

        return offset
    }, [props.activeIndex, props.hoverIndex, props.pages, props.headerSizeState, location])    

    const setHeaderLine = useCallback(() => {
        let index = 0;
        if (props.hoverIndex > -1) {
            index = props.hoverIndex
        } else {
            index = props.activeIndex

            headerLineBack.current.style.left = calculateHeaderLineOffset() + "px"
            headerLineBack.current.style.width = props?.pages?.[index]?.width + "px"
        }
        headerLine.current.style.left = calculateHeaderLineOffset() + "px"
        headerLine.current.style.width = props?.pages?.[index]?.width + "px"
        
        
    }, [props.activeIndex, props.hoverIndex, props.pages, calculateHeaderLineOffset])
    

    useEffect(() => {
        setHeaderLine()
    }, [setHeaderLine, props.resizeState])



    const headerItems = props.pages.map((page, index) => {
        const id = page.name.toLowerCase()+"-header-item"

        if (page.menu) {
            return (
                <HeaderMenu name={page.name} path={page.path} width={page.width} id={id} onMouseEnter={() => {
                    let i = props.headerSizeState === "big" ? index : smallHoverIndices[index]
                    props.setHoverIndex(i)
                }} onMouseLeave={() => {
                    props.setHoverIndex(-1)
                }} key={page.name}>
                    {subPages[page.name].map((subPage) => 
                        <HeaderLink name={subPage.name} path={subPage.path} external={subPage.external} width={subPage.width} id={id} key={subPage.name}
                        onClick={() => {
                            let i = props.headerSizeState === "big" ? index : smallHoverIndices[index]
                            props.setActiveIndex(i)
                            props.setHoverIndex(-1)
                        }} onMouseEnter={() => {
                        }} onMouseLeave={() => {
                        }} />
                    )}
                </HeaderMenu>
            )
        } else {

            return (
                <HeaderLink name={page.name} scroll={page.scroll} activeIndex={props.activeIndex} onClick={() => {
                    props.setActiveIndex(index)
                    props.setHoverIndex(-1)
                }} onMouseEnter={() => {
                    props.setHoverIndex(index)
                }} onMouseLeave={() => {
                    props.setHoverIndex(-1)
                }} path={page.path} width={page.width} id={id} key={page.name}/>
            )
        }
})



    


    return (
        <Cutout id="header" upperLevel={
            <div id="header-line-back" ref={headerLineBack}></div>
        } backgroundColor="black" headerSizeState={props.headerSizeState}>
            {headerItems}
            <div id="header-line" ref={headerLine}>
            </div>
        </Cutout>
     );
}

export default Header;