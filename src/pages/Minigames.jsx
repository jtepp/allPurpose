import { useCallback, useEffect, useState } from "react";
import "../css/minigames.css";
import Section from "../components/Section";
import Crt from "../components/minigames/Crt";
import Cutout from "../components/Cutout";
import parser from "html-react-parser";
import Cartridge from "../components/minigames/Cartridge";
import { minigames } from "../data/minigames";
import useWindowSize from "../hooks/useWindowSize";

function Minigames(props) {
    const [currentGameIndex, setCurrentGameIndex] = useState(-1);
    const { width } = useWindowSize();

    const getPadFactor = useCallback((height, width) => {
        if (height === 600) {
            return 0.18;
        } else if (width === 600) {
            return 0.12;
        } else {
            return 0.15;
        }
    }, []);

    const resizeIframe = useCallback(() => {
        const iframe = document.querySelector("#game-iframe");
        const cont = document.querySelector("#crt-content");
        // const calcPad = getComputedStyle(cont).padding.replace('px', '')
        const i = currentGameIndex === -1 ? 0 : currentGameIndex;
        const padding =
            2 *
                (getPadFactor(minigames[i].width, minigames[i].height) *
                    cont.offsetWidth) +
            80;
        // console.log(padding)
        // scale the iframe down so that the longest dimension fits in the container
        // calculate a ratio to use with css scaling
        const ratio = Math.max(
            Math.min(
                (cont.offsetWidth - padding) / iframe.offsetWidth,
                (cont.offsetHeight - padding) / iframe.offsetHeight,
            ),
            0 / iframe.offsetWidth,
        );

        // scale the iframe
        iframe.style.scale = `${ratio}`;

        document
            .querySelector(":root")
            .style.setProperty("--crt-width", `${cont.offsetWidth}px`);
    }, [currentGameIndex, getPadFactor]);

    // useEffect(()=> {
    //     changeGame(0)
    // }, [])

    useEffect(() => {
        resizeIframe();
    }, [width, currentGameIndex, resizeIframe]);

    const changeGame = (index) => {
        const current = document.querySelector(".current-game");
        const next = document.querySelector("[index='" + index + "']");
        let order = 0;
        if (current) {
            order = Number(current.getAttribute("index"));
            current.classList.remove("current-game");
        }
        next.classList.add("current-game");
        next.style.order = order;

        setCurrentGameIndex(index);
    };

    const cartridges = minigames.map((game, index) => {
        return (
            <Cartridge
                key={game.title}
                index={index}
                onClick={() => {
                    changeGame(index);
                }}
                img={`/images/minigame-thumbnails/${game.img}.png`}
                title={game.short || game.title}
            />
        );
    });

    return (
        <div className="page-main" id="minigames-main" onScroll={console.log}>
            <Section id="minigames" onScroll={console.log}>
                <div id="minigames-content">
                    <div id="game-container">
                        <div id="game-info">
                            <Cutout id="minigame-cutout">
                                <h1 id="game-title">
                                    {currentGameIndex === -1
                                        ? "Minigames"
                                        : minigames[currentGameIndex].title}
                                </h1>
                            </Cutout>
                            <h3 id="game-description">
                                {currentGameIndex === -1
                                    ? "Click on a game cartdrige below to play!"
                                    : minigames[currentGameIndex].description}
                            </h3>
                            <br />
                            <h2 id="game-controls-heading">
                                {currentGameIndex === -1 ? "" : "Controls"}
                            </h2>
                            <h3 id="game-controls">
                                {parser(
                                    currentGameIndex === -1
                                        ? ""
                                        : minigames[currentGameIndex].controls,
                                )}
                            </h3>
                        </div>
                        <Crt
                            currentGameIndex={currentGameIndex}
                            bgColor={
                                currentGameIndex === -1
                                    ? "transparent"
                                    : minigames[currentGameIndex].bgColor
                            }
                            text={
                                currentGameIndex === -1
                                    ? "Input 3"
                                    : minigames[currentGameIndex].title
                            }
                            onClick={() => {
                                // changeGame((currentGameIndex + 1) % minigames.length)
                            }}
                        >
                            <iframe
                                id="game-iframe"
                                title="game"
                                src={
                                    currentGameIndex === -1
                                        ? ""
                                        : `https://www.khanacademy.org/computer-programming${minigames[currentGameIndex].url}embedded?editor=no&buttons=no&author=no&embed=yes`
                                }
                                width={
                                    currentGameIndex === -1
                                        ? 0
                                        : minigames[currentGameIndex].width
                                }
                                height={
                                    currentGameIndex === -1
                                        ? 0
                                        : minigames[currentGameIndex].height
                                }
                                frameBorder="0"
                                scrolling="no"
                                border="0"
                                style={{
                                    minWidth:
                                        currentGameIndex === -1
                                            ? "100%"
                                            : minigames[currentGameIndex].width,
                                    minHeight:
                                        currentGameIndex === -1
                                            ? "100%"
                                            : minigames[currentGameIndex]
                                                  .height,
                                }}
                            />
                        </Crt>
                    </div>
                    <div id="game-select-container">{cartridges}</div>
                </div>
            </Section>
        </div>
    );
}

export default Minigames;
