import React from 'react'
import { GoChevronDown } from 'react-icons/go'

function HeaderMenu(props) {
    return ( 
        <div className="header-menu-container" id={`header-menu-container-${props.id}`} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} >
            <div to={props.path} id={props.id} 
            style={{
                width: props.width
            }
            } className="header-menu">
                <div className="header-menu-title">
                    {props.name}    
                </div>
                <div className="header-menu-arrow">
                    <GoChevronDown />
                </div>
            </div>
            <div className="header-menu-dropdown-trigger-booster"></div>
            <div className={"header-menu-dropdown"} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} >
                {props.children}
            </div>
        </div>
     );
}

export default HeaderMenu;