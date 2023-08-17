import React from 'react'
import { NavLink } from 'react-router-dom';

function HeaderLink(props) {
    return ( 
        <NavLink to={props.path} id={props.id} onClick={
          () => {

            if (props.external) {
              window.history.pushState(props.path)
            }

            if (props.scroll && document.querySelector(props.scroll)) 
              document.querySelector(props.scroll).scrollIntoView({behavior: 'smooth'})

            props.onClick()

          }
        } onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} style={{
              width: props.width
            
          }} className="header-link">
            {props.name}    
        </NavLink>
     );
}

export default HeaderLink;