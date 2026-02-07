import { NavLink } from "react-router-dom";
import styles from "./HeaderLink.module.css";

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
    inDropdown = false,
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
            className={[
                styles.header_link,
                inDropdown ? styles.in_dropdown : "",
                activeIndex < 1 ? styles.hide_favicon : "",
            ].join(" ")}
        >
            {name}
            {name === "Home" && (
                <h3 id={styles.home_favicon}>Jacob Tepperman</h3>
            )}
        </NavLink>
    );
}

export default HeaderLink;
