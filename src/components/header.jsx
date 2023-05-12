import React, { useState } from 'react'
import { pages } from '..';
import HeaderLink from './headerLink';
import ShinyText from './shinyText';
import '../css/header.css'


function Header() {

    const headerItems = pages.map((page) => {
        const id = page.name.toLowerCase()+"-header-link"
        return (
            <HeaderLink name={page.name} path={page.path} id={id} key={id}/>
        )
    })

    const HeaderLine = () => {
        const calculateGapSize = () => {
            const full = window.innerWidth
            const taken = pages.reduce((result, page) => {
                return result + page.width
            }, 0)
            const nGaps = pages.length + 1;


            return (full - taken) / nGaps
            
        }
        console.log(calculateGapSize())


        return (
            <div id="header-line">
            </div>
        )
    }


    return ( 
        <div id="header">
            <ShinyText id="header-content">
                {headerItems}
            </ShinyText>
            <HeaderLine />
        </div>
     );
}

export default Header;