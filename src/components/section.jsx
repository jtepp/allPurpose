import React from 'react'
import '../css/home.css'


function Section(props) {

    return ( 
        <section id={props.id+'-section'} className='react-section'>
            {props.children}
        </section>
     );
}

export default Section;