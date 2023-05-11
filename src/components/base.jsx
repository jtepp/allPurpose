import React from 'react'
import '../css/base.css'

function Base(props) {
    return ( 
        <div id="base">
            <div id="sidebar">
                <h1>sidebar</h1>
            </div>
            <div id="content">
                {props.children}
            </div>
        </div>
     );
}

export default Base;