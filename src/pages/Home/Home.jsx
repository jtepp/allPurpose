import { useEffect, useRef, useState } from "react";
import parser from "html-react-parser";
import Section from "../../components/Section/Section";
import Cutout from "../../components/Cutout/Cutout";
import ScrollButton from "../../components/ScrollButton/ScrollButton";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import {
    projectScrollWidth,
    scrollToNextProject,
    scrollToPreviousProject,
} from "../../utils";
import { useAppContext } from "../../components/AppProvider/AppProvider";
import useWindowSize from "../../hooks/useWindowSize";
import { projectsData } from "../../data/projects";
import styles from "./Home.module.css";

function Home() {
    const { setActiveIndex } = useAppContext();
    const { width } = useWindowSize();
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const projectsContainer = useRef(null);
    const homeMain = useRef(null);

    const getCurrentProjectIndex = () => {
        const scrollLeft = projectsContainer.current.scrollLeft;

        return Math.max(
            0,
            Math.min(
                Math.round(scrollLeft / projectScrollWidth()),
                projectsData.length - 1,
            ),
        );
    };

    useEffect(() => {
        // projects
        if (document.querySelector(`#${styles.projects_section}`)) {
            const root = document.querySelector(":root");
            if (width > 655) {
                root.style.setProperty(
                    "--PB-wide-height",
                    document.querySelector("#projects-section").offsetHeight +
                        "px",
                );
                root.style.setProperty(
                    "--PB-wide-top",
                    `calc(100vh + 40px - var(--scroll-y) + ${Math.max(0, 460 - window.innerHeight)}px)`,
                );
            } else {
                root.style.setProperty(
                    "--PB-narrow-height",
                    document.querySelector("#projects-section").offsetHeight +
                        "px",
                );
                root.style.setProperty(
                    "--PB-narrow-top",
                    `calc(100vh + 80px - var(--scroll-y) + ${Math.max(0, 412 - window.innerHeight)}px)`,
                );
            }
        }
    }, [width]);

    useEffect(() => {
        if (window.location.hash === "#projects-section") {
            if (document.querySelector("#projects-section"))
                document.querySelector("#projects-section").scrollIntoView({
                    behavior: "smooth",
                });
        }
    }, []);

    useEffect(() => {
        projectsContainer.current.onscroll = () => {
            const index = getCurrentProjectIndex();
            if (index !== currentProjectIndex) {
                setCurrentProjectIndex(index);
            }
        };
    }, [currentProjectIndex]);

    const projects = projectsData.map((project, index) => {
        return (
            <ProjectCard
                key={project.title}
                index={index}
                currentProjectIndex={currentProjectIndex}
                project={project}
            />
        );
    });

    useEffect(() => {
        setActiveIndex(
            homeMain.current.scrollTop >=
                document.querySelector("#home-section").scrollHeight / 2
                ? 1
                : 0,
        );

        homeMain.current.onscroll = () => {
            if (
                homeMain.current.scrollTop >=
                document.querySelector("#home-section").scrollHeight / 2
            ) {
                setActiveIndex(1);
            } else {
                setActiveIndex(0);
            }

            const root = document.querySelector(":root");

            const scrollTop = homeMain.current.scrollTop;
            const scrollLeft = homeMain.current.scrollLeft;

            root.style.setProperty("--scroll-x", scrollLeft + "px");
            root.style.setProperty("--scroll-y", scrollTop + "px");
        };
    }, [setActiveIndex]);

    return (
        <div className="page-main" ref={homeMain}>
            <Section
                id="home"
                onRender={() => {
                    setActiveIndex(0);
                }}
                className={styles.home_section}
            >
                <Cutout id="home" backgroundColor="black">
                    <div className={styles.home_name}>
                        <h1>Jacob</h1>
                        <h1>Tepperman</h1>
                        <h2 className={styles.home_name_title}>
                            Software Engineer
                        </h2>
                    </div>

                    <div className={styles.home_bottom}>
                        <ScrollButton target="#projects-section" />
                        <h2>Scroll down to view my projects</h2>
                    </div>
                </Cutout>
            </Section>

            <Section id="projects" className={styles.projects_section}>
                <Cutout id="projects-title-cutout" backgroundColor="black">
                    <h1 id="projects-title" className="page-title">
                        Projects
                    </h1>
                </Cutout>

                <div
                    className={[
                        styles.projects_content,
                        currentProjectIndex > 0 ? styles.more_left : "",
                        currentProjectIndex < projectsData.length - 1
                            ? styles.more_right
                            : "",
                    ].join(" ")}
                >
                    <div
                        className={styles.projects_content_button}
                        id={styles.left_button}
                        onClick={() => {
                            scrollToPreviousProject();
                        }}
                    ></div>
                    <div
                        className={styles.projects_content_button}
                        id={styles.right_button}
                        onClick={() => {
                            scrollToNextProject();
                        }}
                    ></div>
                    <div className={styles.project_info}>
                        <div>
                            <Cutout
                                id="project-title-cutout"
                                backgroundColor="black"
                            >
                                <h1 className={styles.project_title}>
                                    {projectsData[currentProjectIndex].title}
                                </h1>
                            </Cutout>
                            <h3 className={styles.project_subtitle}>
                                {projectsData[currentProjectIndex].job
                                    ? projectsData[currentProjectIndex].job
                                          .project
                                    : ""}
                            </h3>
                        </div>

                        <h3 className={styles.project_description}>
                            {parser(
                                projectsData[currentProjectIndex].description,
                            )}
                        </h3>
                    </div>
                    <div
                        className={styles.projects_container}
                        ref={projectsContainer}
                    >
                        <div
                            className={styles.projects_container_spacing}
                        ></div>
                        {projects}
                        <div
                            className={styles.projects_container_spacing}
                        ></div>
                    </div>
                </div>
            </Section>
        </div>
    );
}

export default Home;
