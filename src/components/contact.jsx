import React from 'react'
import Section from './section';
import '../css/contact.css'
import Cutout from './cutout';

function Contact(props) {
    return ( 
        <div id="contacts-main" className="page-main">

        <Section id="contact">
            <div id="contact-content">
                <Cutout id="contact">
                    <h1 className='page-title'>Contact</h1>
                </Cutout>

            </div>
        </Section>
        </div>
     );
}

export default Contact;