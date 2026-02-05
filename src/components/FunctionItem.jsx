import React, { useRef, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import FunctionCloud from "./FunctionCloud";
import { temporaryClass } from "../utils";

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
                                          key={functionData.name}
                                          alt="result"
                                          src={`data:image/jpeg;charset=utf-8;base64,${data}`}
                                      />,
                                  ]
                                : data.images.map((url) => {
                                      return (
                                          <img
                                              key={functionData.name}
                                              alt="result"
                                              src={url}
                                              className="function-cloud-result-image"
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
                        ).forEach(([key, value]) => {
                            rows.push(
                                <tr>
                                    <th>{key}</th>
                                    <td>{value}</td>
                                </tr>,
                            );
                        });
                        const table = <table>{rows}</table>;
                        setChildren([table]);
                        return;
                    }

                    setResult(data);
                    return;
                })
                .catch((err) => {
                    console.warn(err);
                    setResult("Invalid result. Try another query...");
                });

            setTimeout(() => setCloudState(2), Math.random() * 1000 + 1000);
        }
    };

    return (
        <div className="function-item">
            <div className="function-item-details">
                <div className="function-item-title">{functionData.title}</div>
                <div className="function-item-description">
                    {functionData.description}
                </div>
            </div>

            <div
                className={`function-item-execute-button ${functionData.input ? "has-input" : ""}`}
            >
                <FaArrowCircleRight
                    onClick={() => {
                        startSearch();
                    }}
                    className="function-item-execute-button-image"
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
                        className="function-item-input"
                        ref={input}
                        placeholder="Search..."
                    />
                )}
            </div>

            <FunctionCloud
                state={cloudState}
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
