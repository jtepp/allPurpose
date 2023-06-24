import React, { useCallback, useEffect, useRef } from 'react'
import HeaderLink from './headerLink';
import Cutout from './cutout';
import '../css/header.css'
import HeaderMenu from './headerMenu';
import { subPages } from './main';


function Header(props) {    
    const headerLine = useRef(null)
    const headerLineBack = useRef(null)

    const calculateGapSize = () => {
        const full = window.innerWidth
        const taken = props.pages.reduce((result, page) => {
            return result + page.width
        }, 0)
        const nGaps = props.pages.length;


        return (full - taken) / nGaps
        
    }

    const calculateHeaderLineOffset = useCallback(() => {
        let index = 0;
        if (props.hoverIndex > -1) {
            index = props.hoverIndex
        } else {
            index = props.activeIndex
        }
        const gap = calculateGapSize()
        let offset = gap/2
        offset += index * gap
        for (let i = 0; i < index; i++) {
            offset += props.pages[i].width
        }

        return offset
    }, [props.activeIndex, props.hoverIndex, props.resizeState])    

    const setHeaderLine = useCallback(() => {
        let index = 0;
        if (props.hoverIndex > -1) {
            index = props.hoverIndex
        } else {
            index = props.activeIndex

            headerLineBack.current.style.left = calculateHeaderLineOffset() + "px"
            headerLineBack.current.style.width = props.pages[index].width + "px"
        }
        headerLine.current.style.left = calculateHeaderLineOffset() + "px"
        headerLine.current.style.width = props.pages[index].width + "px"
        
        
    }, [props.activeIndex, props.hoverIndex, props.pages, calculateHeaderLineOffset, props.resizeState])
    

    useEffect(() => {
        setHeaderLine()
    }, [setHeaderLine, props.resizeState])



    const headerItems = props.pages.map((page, index) => {
        const id = page.name.toLowerCase()+"-header-item"

        if (page.menu) {
            return (
                <HeaderMenu name={page.name} path={page.path} width={page.width} id={id} onMouseEnter={() => {
                    props.setHoverIndex(index)
                }} onMouseLeave={() => {
                    props.setHoverIndex(-1)
                }} key={page.name}>
                    {subPages[page.name].map((subPage, ) => 
                        <HeaderLink name={subPage.name} path={subPage.path} width={subPage.width} id={id} key={subPage.name}
                        onClick={() => {
                            props.setActiveIndex(index)
                            props.setHoverIndex(-1)
                        }} onMouseEnter={() => {
                        }} onMouseLeave={() => {
                        }} />
                    )}
                </HeaderMenu>
            )
        } else {

            return (
                <HeaderLink name={page.name} scroll={page.scroll} onClick={() => {
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
        } backgroundColor="black">
            {headerItems}
            <div id="header-line" ref={headerLine}>
            </div>
        </Cutout>
     );
}

export default Header;