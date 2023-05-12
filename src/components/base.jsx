import React from 'react'
import '../css/base.css'
import Header from './header';

function Base(props) {

    
    

    return ( 
        <div id="base">
            <Header activeIndex={props.activeIndex} setActiveIndex={props.setActiveIndex}
                hoverIndex={props.hoverIndex} setHoverIndex={props.setHoverIndex}
            />
            <div id="content">
                {props.children}
            </div>
        </div>
     );
}

export default Base;