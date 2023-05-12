import React from 'react'
import { NavLink } from 'react-router-dom';

function HeaderLink(props) {
    return ( 
        <NavLink to={props.path} id={props.id} onClick={props.onClick} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} style={() => {
            return {
              width: props.width
            }
          }} className="header-link">
            {props.name}    
        </NavLink>
     );
}

export default HeaderLink;