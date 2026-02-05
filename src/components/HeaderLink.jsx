import { NavLink } from "react-router-dom";

function HeaderLink({
    name,
    scroll,
    activeIndex,
    onClick,
    onMouseEnter,
    onMouseLeave,
    path,
    width,
    id,
    external,
}) {
    return (
        <NavLink
            to={path}
            id={id}
            onClick={() => {
                if (external) {
                    window.history.pushState(path);
                }

                if (scroll && document.querySelector(scroll))
                    document
                        .querySelector(scroll)
                        .scrollIntoView({ behavior: "smooth" });

                onClick();
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                width,
            }}
            className={`header-link ${activeIndex < 1 ? "hide-favicon" : ""}`}
        >
            {name}
            {name === "Home" && <h3 id="home-favicon">Jacob Tepperman</h3>}
        </NavLink>
    );
}

export default HeaderLink;
