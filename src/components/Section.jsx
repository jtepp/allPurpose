import "../css/home.css";

function Section({ id, className, onScroll, children }) {
    return (
        <section
            id={id + "-section"}
            onScroll={onScroll}
            className={`react-section ${className ?? ""}`}
        >
            {children}
        </section>
    );
}

export default Section;
