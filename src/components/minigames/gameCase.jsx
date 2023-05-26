import React from 'react'
import '../../css/gameCase.css'

export function GameCase() {
    return ( 
        <div className='case-container'>
            <div className="case-front">
                <div className="case-title">Title</div>
            </div>
            <div className="case-side"></div>
        </div>
     );
}