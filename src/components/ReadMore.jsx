import { useState } from "react";
import "../css/readMore.css";
import "../css/collapsible.css";

function ReadMore({ id, title, hiddenText, hoverText, show }) {
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    return (
        <div
            className={
                "read-more-container " + (hover || open ? "use-gap" : "")
            }
            id={id || ""}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {title || null}
            {show ? <p className="read-more-show">{show}</p> : null}

            {hoverText ? (
                <div
                    className={
                        "collapsible-wrapper " + (hover || open ? "open" : "")
                    }
                >
                    <div className="collapsible-content">{hoverText}</div>
                </div>
            ) : null}

            <div className="read-more-container">
                {open && hiddenText ? (
                    <p className="read-more-hide">{hiddenText}</p>
                ) : null}

                <span
                    className="read-more-toggle"
                    onClick={() => setOpen((o) => !o)}
                >
                    {open ? "Read less" : "Read more"}
                </span>
            </div>
        </div>
    );
}

export default ReadMore;
