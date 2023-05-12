import React from 'react'
import { NavLink } from 'react-router-dom';

function HeaderLink(props) {
    return ( 
        <NavLink to={props.path} id={props.id} onClick={
          () => {
            if (props.scroll && document.querySelector(props.scroll)) 
              document.querySelector(props.scroll).scrollIntoView({behavior: 'smooth'})
            else 
              props.onClick()
          }
        } onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} style={() => {
            return {
              width: props.width
            }
          }} className="header-link">
            {props.name}    
        </NavLink>
     );
}

export default HeaderLink;