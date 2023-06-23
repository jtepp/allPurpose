import React from 'react'
import Section from './section';
import '../css/contact.css'
import Cutout from './cutout';

function Contact(props) {
    return ( 
        <Section id="contact">
            <div id="contact-content">
                <Cutout id="contact">
                    <h1>Contact</h1>
                </Cutout>

            </div>
        </Section>
     );
}

export default Contact;