export const functionsData = [
    {
        title: "Space Launches",
        url: "missions",
        description:
            "Retrieve information about past and upcoming space launches, including details about the rockets, payloads, and launch dates.",
        input: false,
        images: false,
        json: true,
        used: ["rocketeer"],
    },
    {
        title: "Text to Coordinates",
        url: "coordinates?a=",
        description:
            "Convert textual addresses or location descriptions into geographical coordinates (latitude and longitude) for mapping and navigation.",
        input: true,
        images: false,
        json: false,
        used: ["rocketeer"],
    },
    {
        title: "NBA Player Bios",
        url: "https://larrybirdle.netlify.app/.netlify/functions/random",
        description:
            "Access information and statistics for NBA players, including team, height, position, etc.",
        input: false,
        images: false,
        json: true,
        key: "player",
        used: ["larrybirdle"],
    },
    {
        title: "Quick Google Images",
        url: "images?b64&q=",
        description:
            "Retrieve an image thumbnail from Google Images based on specific keywords or search queries.",
        input: true,
        images: true,
        b64: true,
        json: false,
        used: ["rocketeer"],
    },
    {
        title: "Date Parser",
        url: "dateParse?a=",
        description:
            "Parse and interpret various date formats to ensure accurate and consistent handling of date and time information.",
        input: true,
        images: false,
        used: ["rocketeer", "widgit"],
    },
    // {
    //     title: "Subreddit Scraper",
    //     url: "reddit?sort=top&limit=1&sub=",
    //     description:
    //         "Gather posts, upvotes, and other data from Reddit subreddits, enabling you to view a subreddit at a glance. This widget only displays the JSON data for the first post for simplicity",
    //     input: true,
    //     images: false,
    //     json: true,
    //     key: 1,
    //     used: ["widgit"],
    // },
    {
        title: "Amazon Product Search",
        url: "amazon?q=",
        description:
            "Search and retrieve information about products available on Amazon, including prices, images, and specifications. This widget only shows images for simplicity.",
        input: true,
        images: true,
        json: true,
        used: ["oooh"],
    },
];
