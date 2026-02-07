export const navItems = [
    { name: "Home", path: "/", scroll: "#home-section", width: 60 },
    {
        name: "Projects",
        path: "/#projects-section",
        scroll: "#projects-section",
        width: 60,
    },
    { name: "Minigames", path: "/minigames", width: 80 },
    { name: "Functions", path: "/functions", width: 72 },
    { name: "Contact", path: "/contact", width: 74, menu: true },
    { name: "More", path: "", width: 54, menu: true },
];

export const mobileNavItemIndices = {
    Home: 0,
    Projects: 1,
    Contact: 2,
    Functions: 3,
    Minigames: 3,
};

export const desktopNavItemIndices = {
    Home: 0,
    Projects: 1,
    Minigames: 2,
    Functions: 3,
    Contact: 4,
};

export const smallHoverIndices = {
    0: 0,
    1: 1,
    4: 2,
    5: 3,
};

export const subPages = {
    Contact: [
        { name: "Form", path: "/contact", width: 74 },
        {
            name: "Resume",
            path: "/resume-jacob-tepperman.pdf",
            external: true,
            width: 74,
        },
        { name: "Email", path: "mailto:jtepp+site@icloud.com", width: 74 },
    ],
    More: [
        { name: "Minigames", path: "/minigames", width: 80 },
        { name: "Functions", path: "/functions", width: 72 },
    ],
};
