import React from 'react'
import { NavLink } from 'react-router-dom';
import { favicon } from './home';

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
            
          }} className={`header-link ${(props.activeIndex < 1) ? 'hide-favicon' : ''}`}>
            {props.name}   
            { props.name === "Home" &&
              <h3 id='home-favicon'>Jacob Tepperman</h3>
            }
        </NavLink>
     );
}

export default HeaderLink;