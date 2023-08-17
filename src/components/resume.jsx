import React from 'react'
import Section from './section';
import Cutout from './cutout';
// import PDFViewer from './pdfViewer';
// import resumePDF from "../res/Resume/Resume-Jacob-Tepperman.pdf"

function Resume(props) {
    return (         
        <div id="resume-main" className="page-main">
        <Section id="resume">
            <div id="resume-content">
                <Cutout id="resume">
                    <h1 className='page-title'>Resume</h1>
                </Cutout>
                {/* <PDFViewer src={resumePDF}/> */}
            </div>
        </Section>
        </div>
     );
}

export default Resume;
