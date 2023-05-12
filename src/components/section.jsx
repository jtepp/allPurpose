import React from 'react'
import '../css/home.css'


function Section(props) {

    return ( 
        <section id={props.id+'-section'}>
            {props.children}
        </section>
     );
}

export default Section;