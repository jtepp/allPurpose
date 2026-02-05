import { GoChevronDown } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function HeaderMenu({
    name,
    path,
    width,
    id,
    onClick,
    onMouseEnter,
    onMouseLeave,
    children,
}) {
    const navigate = useNavigate();
    return (
        <div
            className="header-menu-container"
            id={`header-menu-container-${id}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div
                to={path}
                id={id}
                style={{
                    width: width,
                }}
                className="header-menu"
            >
                <div
                    className="header-menu-title"
                    onMouseDown={() => {
                        if (name === "Contact") {
                            onClick();
                            navigate(children[0].path);
                        }
                    }}
                >
                    {name}
                </div>
                <div className="header-menu-arrow">
                    <GoChevronDown />
                </div>
            </div>
            <div className="header-menu-dropdown-trigger-booster"></div>
            <div
                className={"header-menu-dropdown"} // onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
            >
                {children}
            </div>
        </div>
    );
}

export default HeaderMenu;
