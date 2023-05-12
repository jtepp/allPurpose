import React, { useEffect } from 'react'
import Cutout from './cutout';
import '../css/home.css'


function Section(props) {

    useEffect(() => {
        console.log("Section mounted")
    })

    return ( 
        <section id={props.id+'-section'}>
            {props.children}
        </section>
     );
}

export default Section;