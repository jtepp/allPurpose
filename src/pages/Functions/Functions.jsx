import Section from "../../components/Section/Section";
import Cutout from "../../components/Cutout/Cutout";
import ReadMore from "../../components/ReadMore/ReadMore";
import FunctionItem from "../../components/FunctionItem/FunctionItem";
import { functionsData } from "../../data/functions";
import styles from "./Functions.module.css";

const numClouds = 12;

function Functions() {
    return (
        <Section
            className="no-container-for-section-page-main"
            id={"functions"}
        >
            <div id={styles.header}>
                <div>
                    <Cutout>
                        <h1 className="page-title">Functions</h1>
                    </Cutout>
                </div>
                <ReadMore
                    id={styles.description}
                    title={<h3>What is a (cloud) function?</h3>}
                    hoverText={`A function is a block of code that runs a group of calculations, can have variable parameters, and can return a result.
                            Functions are a concept used in every coding language, but these functions are more specifically cloud functions.`}
                    hiddenText={`Cloud functions are functions that run on a server, rather than on your device. This means that any device connected to the internet can trigger this function 
                                and recieve the same calculated result, regardless of the device. This can be useful for applications that require a lot of processing power, or for applications that
                                need a unified set of data. I personally like to use them as custom API endpoints, or when I need to run some computations that can be written much more simply in the language of the server
                                (e.g. JavaScript) than the language of the application on the device (e.g. Swift).`}
                />
            </div>
            <div id={styles.functions_content}>
                <div id={styles.function_items_container}>
                    {functionsData.map((data, index) => (
                        <FunctionItem
                            key={data.title}
                            functionData={data}
                            cloudSrc={`/images/clouds/cloud_${String(index % numClouds).padStart(2, "0")}.png`}
                        />
                    ))}
                </div>
            </div>

            <div
                style={{
                    color: "white",
                    float: "right",
                    margin: 40,
                }}
            >
                <a href="https://www.freepik.com/free-vector/set-twelve-different-clouds-blue-background_1149278.htm#query=cloud%20svg&position=0&from_view=keyword&track=ais">
                    Cloud Images by alliesinteractive
                </a>{" "}
                on Freepik
            </div>
        </Section>
    );
}
export default Functions;
