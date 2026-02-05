import "../css/shinyText.css";

function ShinyText(props) {
    return (
        <div className="shiny-text" id={props.id}>
            {props.children}
        </div>
    );
}

export default ShinyText;
