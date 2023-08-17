import React from 'react'
import '../css/home.css'


function Section(props) {

    return ( 
        <section id={props.id+'-section'} onScroll={props.onScroll} className={`react-section ${props.className ? props.className : ''}`}>
            {props.children}
        </section>
     );
}

export default Section;