import { GoChevronDown } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import styles from "./HeaderMenu.module.css";

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
            className={styles.container}
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
                className={styles.header_menu}
            >
                <div
                    className={styles.title}
                    onMouseDown={() => {
                        if (name === "Contact") {
                            onClick();
                            navigate(children[0].path);
                        }
                    }}
                >
                    {name}
                </div>
                <div className={styles.arrow}>
                    <GoChevronDown />
                </div>
            </div>
            <div className={styles.dropdown_trigger_booster}></div>
            <div
                className={styles.dropdown} // onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
            >
                {children}
            </div>
        </div>
    );
}

export default HeaderMenu;
