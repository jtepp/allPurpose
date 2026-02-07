import { BiLoader } from "react-icons/bi";
import styles from "./FunctionCloud.module.css";
import { useEffect } from "react";

function FunctionCloud({
    cloudState,
    result,
    cloudSrc,
    children,
    smallText,
    used,
}) {
    useEffect(() => {
        console.log(cloudState);
    }, [cloudState]);
    return (
        <div
            className={[
                styles.function_cloud,
                cloudState === 2 ? styles.show_result : "",
            ].join(" ")}
        >
            <div
                className={[
                    styles.main,
                    cloudState === 1 ? styles.cloud_pulsing : "",
                ].join(" ")}
            >
                <img src={cloudSrc} className={styles.cloud_img} alt="" />
                {cloudState === 1 && <BiLoader className={styles.loader} />}
                <div className={styles.used_images_container}>
                    {used.map((name) => (
                        <img
                            src={`/images/projects/icons/${name}.png`}
                            key={name}
                            className={styles.used_image}
                            alt=""
                            srcSet=""
                        />
                    ))}
                </div>
            </div>
            <div
                className={[
                    styles.result,
                    smallText ? styles.small_text : "",
                ].join(" ")}
            >
                {result}
                {children.length > 0 ? (
                    <div className={styles.result_image_container}>
                        {children}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default FunctionCloud;
