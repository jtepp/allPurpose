import React, { useState } from 'react'
import '../css/readMore.css'
import '../css/collapsible.css'

function ReadMore(props) {
    const [open, setOpen] = useState(false)
    const [hover, setHover] = useState(false)
    return ( 
    <div className={"read-more-container " + (hover || open ? 'use-gap' : '')} id={props.id || ''} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        
        {props.title || null}    
        {props.show ? 
        <p className='read-more-show'>
            {props.show}
        </p>
        : null}    

        {props.hover ?
            <div className={'collapsible-wrapper ' + (hover || open ? 'open' : '')}>
                <div className='collapsible-content'>
                    {props.hover}
                </div>
            </div> 
        : null}

        <div className='read-more-container'>
            { open && props.hide ?
                <p className='read-more-hide'>
                    {props.hide}
                </p>
            : null
            }


            <span className='read-more-toggle' onClick={() => setOpen(o => !o)}>{ open ? "Read less" : "Read more"}</span>
        </div>  
    </div> );
}

export default ReadMore;