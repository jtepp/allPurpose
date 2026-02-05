import { BiLoader } from "react-icons/bi";

function FunctionCloud({
    cloudState,
    result,
    cloudSrc,
    children,
    smallText,
    used,
}) {
    return (
        <div
            className={`function-cloud ${cloudState === 2 ? "function-cloud-show-result" : ""}`}
        >
            <div
                className={`function-cloud-main ${cloudState === 1 ? "cloud-pulsing" : ""}`}
            >
                <img src={cloudSrc} className="cloud-img" alt="" />
                {cloudState === 1 && (
                    <BiLoader className="function-cloud-loader" />
                )}
                <div className="function-cloud-used-images-container">
                    {used.map((name) => (
                        <img
                            src={`/images/projects/icons/${name}.png`}
                            key={name}
                            className="function-cloud-used-image"
                            alt=""
                            srcSet=""
                        />
                    ))}
                </div>
            </div>
            <p
                className={`function-cloud-result ${smallText ? "small-text" : ""}`}
            >
                {result}
                {children.length > 0 ? (
                    <div className="function-cloud-result-image-container">
                        {children}
                    </div>
                ) : null}
            </p>
        </div>
    );
}

export default FunctionCloud;
