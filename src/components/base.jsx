import React from 'react'
import '../css/base.css'
import Header from './header';

function Base(props) {
    return ( 
        <div id="base">
            <Header />
            <div id="content">
                {props.children}
            </div>
        </div>
     );
}

export default Base;