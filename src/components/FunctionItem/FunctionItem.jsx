import { useRef, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import FunctionCloud from "../FunctionCloud/FunctionCloud";
import { temporaryClass } from "../../utils";
import styles from "./FunctionItem.module.css";

function FunctionItem({ cloudSrc, functionData }) {
    const input = useRef();
    const [result, setResult] = useState("");
    const [cloudState, setCloudState] = useState(0);
    const [children, setChildren] = useState([]);

    const startSearch = async () => {
        if (functionData.input && input.current.value.length === 0) {
            temporaryClass(input.current, "reject-shake", 500);
            setCloudState(0);
        } else {
            setCloudState(1);

            const url = functionData.url.includes("https://")
                ? functionData.url
                : `https://allpurpose.netlify.app/.netlify/functions/${functionData.url}${input.current?.value ? input.current?.value.replace(" ", "%20") : ""}`;
            await fetch(url)
                .then((res) => {
                    return functionData.json ? res.json() : res.text();
                })
                .then((data) => {
                    if (functionData.images) {
                        setChildren(
                            functionData.b64
                                ? [
                                      <img
                                          key={url}
                                          alt="result"
                                          src={`data:image/jpeg;charset=utf-8;base64,${data}`}
                                      />,
                                  ]
                                : data.images.map((url) => {
                                      return (
                                          <img
                                              key={url}
                                              alt="result"
                                              src={url}
                                              className={
                                                  styles.cloud_result_image
                                              }
                                          />
                                      );
                                  }),
                        );
                        return;
                    }

                    if (functionData.json) {
                        const rows = [];
                        Object.entries(
                            functionData.key ? data[functionData.key] : data,
                        ).forEach(([key, value], index) => {
                            rows.push(
                                <tr key={index}>
                                    <th>{key}</th>
                                    <td>{value}</td>
                                </tr>,
                            );
                        });
                        const table = (
                            <table>
                                <tbody>{rows}</tbody>
                            </table>
                        );
                        setChildren([table]);
                        return;
                    }

                    setResult(data);
                })
                .catch((err) => {
                    console.warn(err);
                    setResult("Invalid result. Try another query...");
                });

            setTimeout(() => setCloudState(2), Math.random() * 1000 + 1000);
        }
    };

    return (
        <div className={styles.function_item}>
            <div className={styles.details}>
                <div className={styles.title}>{functionData.title}</div>
                <div className={styles.description}>
                    {functionData.description}
                </div>
            </div>

            <div
                className={[
                    styles.execute_button,
                    functionData.input ? styles.has_input : "",
                ].join(" ")}
            >
                <FaArrowCircleRight
                    onClick={() => {
                        startSearch();
                    }}
                    className={styles.execute_button_image}
                />
                {functionData.input && (
                    <input
                        type="text"
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                e.preventDefault();
                                startSearch();
                            }
                        }}
                        className={styles.input}
                        ref={input}
                        placeholder="Search..."
                    />
                )}
            </div>

            <FunctionCloud
                cloudState={cloudState}
                result={result}
                cloudSrc={cloudSrc}
                smallText={functionData.json}
                used={functionData.used}
            >
                {children}
            </FunctionCloud>
        </div>
    );
}

export default FunctionItem;
