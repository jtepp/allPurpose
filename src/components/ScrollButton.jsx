import roundedChevronDown from "../assets/rounded-chevron-down.png";

function ScrollButton({ target }) {
    return (
        <div
            id="scroll-button"
            onClick={() => {
                if (document.querySelector(target))
                    document
                        .querySelector(target)
                        .scrollIntoView({ behavior: "smooth" });
            }}
        >
            <img src={roundedChevronDown} alt="scroll down" />
        </div>
    );
}

export default ScrollButton;
