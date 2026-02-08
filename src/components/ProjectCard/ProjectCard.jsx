import { useEffect, useRef } from "react";
import styles from "./ProjectCard.module.css";

function ProjectCard({
    index,
    currentProjectIndex,
    project,
    scrollToThisIndex = () => {},
}) {
    const container = useRef(null);
    const el = useRef(null);

    const handleMouseMove = (e) => {
        if (!e.target.className.includes(styles.icon)) {
            const mouseX =
                e.clientX -
                container.current.offsetLeft +
                container.current.parentNode.scrollLeft -
                container.current.parentNode.offsetLeft;
            const mouseY = e.clientY - container.current.offsetTop;
            const width = container.current.offsetWidth;
            const height = container.current.offsetHeight;
            const percentY = Math.round((mouseX / width) * 100);
            const percentX = -1 * (Math.round((mouseY / height) * 100) - 50);

            // console.log(percentX, percentY)

            const rotateVariance = 10;

            // x and y are flipped. god knows why

            let x = (percentX * rotateVariance) / 100 + 2.5;
            let y = (percentY * rotateVariance) / 100;

            // if (window.innerWidth > 655) {
            //     y -= 14.7;
            //     x += 2.5;

            //     // constrain values to one decimal point
            // }
            x = Math.round(x * 10) / 10;
            y = Math.round(y * 10) / 10;

            // console.log(x, y)

            el.current.style.setProperty("--rotate-x", x + "deg");
            el.current.style.setProperty("--rotate-y", y + "deg");
        }
    };

    const handleMouseLeave = (e) => {
        el.current.style.setProperty("--rotate-x", "0deg");
        el.current.style.setProperty("--rotate-y", "0deg");
    };

    useEffect(() => {
        container.current.classList.toggle(
            styles.current_project_container,
            currentProjectIndex === index,
        );
    }, [currentProjectIndex, index]);

    const handleIconClick = (e) => {
        const projectIndex = [
            ...document.querySelectorAll(`.${styles.container}`),
        ].findIndex((e) => e.id === "project-" + index + "-container");
        scrollToThisIndex();
    };

    return (
        <section
            id={"project-" + index + "-container"}
            ref={container}
            className={styles.container}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                id={"project-" + index}
                ref={el}
                className={styles.project}
                style={{
                    backgroundImage: `url(/images/projects/thumbnails/${project.short}.png)`,
                }}
            ></div>

            <div className={styles.icon_container} onClick={handleIconClick}>
                <img
                    src={`/images/projects/icons/${project.short}.png`}
                    alt={project.title + " icon"}
                    className={styles.icon}
                    draggable={false}
                />
            </div>
        </section>
    );
}

export default ProjectCard;
