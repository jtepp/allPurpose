import '../css/cutoutText.css'
import React from 'react'
  

function CutoutText(props) {

    return ( 
        <div className="cutout-text" id={props.id} >
            {props.children}
        </div>
     )
}

export default CutoutText;