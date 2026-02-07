import styles from "./Section.module.css";

function Section({ id, className, onScroll, children }) {
    return (
        <section
            id={id + "-section"}
            onScroll={onScroll}
            className={[styles.section, className ?? ""].join(" ")}
        >
            {children}
        </section>
    );
}

export default Section;
