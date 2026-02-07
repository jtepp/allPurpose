import { colorPairs } from "./data/colors";

export function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function constrain(value, max, min) {
    return Math.max(Math.min(value, max), min);
}

export async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function temporaryClass(element, className, ms) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, ms);
}

export const projectScrollWidth = (width) => {
    return window.innerWidth > 655 ? 240 + 100 : 120 + 50;
};

export const scrollToIndex = (index) => {
    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.scrollTo({
        left: index * projectScrollWidth(),
        behavior: "smooth",
    });
};

export const scrollToNextProject = () => {
    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.scrollBy({
        left: projectScrollWidth(),
        behavior: "smooth",
    });
};

export const scrollToPreviousProject = () => {
    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.scrollBy({
        left: -projectScrollWidth(),
        behavior: "smooth",
    });
};

export const getCurrentPageName = (pages, location) => {
    for (let p of pages.slice(1, -1)) {
        if (location.pathname.includes(p.path)) return p.name;
    }
    return pages[0].name;
};

export function setRandomColor() {
    // sets --primary and --secondary
    Object.entries(randomElement(colorPairs)).forEach(([key, value]) => {
        document.querySelector(":root").style.setProperty(`--${key}`, value);
        // console.log(`--${key}: ${value}`)
    });

    setTimeout(() => {
        document
            .querySelector(":root")
            .style.setProperty("--color-transition-time", "3s");
    }, 1000);
}
