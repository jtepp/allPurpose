import fetch from "node-fetch"
exports.handler = async (event) => {

    const mode = event.queryStringParameters.mode;

    let message = []
    let output = []

    switch (mode) {
        case 'stocks':
            await getStocks().then(data => {
                message = Array(...(data.toUpperCase()))
            })
            break;
        case 'mlb':
            break;
        case 'text':
        default:
            message = Array(...(event.queryStringParameters["q"].toUpperCase()))
    }


    Array(5).fill(0).forEach((u, index) => {
        const string = message.map(l => letterMap[l][index]).join(",0,") + ",0"
        output.push(string.split(',').map(x => parseInt(x)))
    })

    // while (output[0].length % 8 != 0)
    //     output.forEach(arr => arr.push(0))

    // [Array] > [Each strip] > [Each letter's row for that strip]
    // turn into [Array] > [Each letter's row for that strip, separated by a zero]

    return ({
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
        },
        body: innerArrayText(JSON.stringify(output))
    })


}

function innerArrayText(text) {
    // remove first and list characters
    return text.slice(1, -1).split('],[').join('][')
}

async function getStocks() {
    const symbols = ['GME', 'AMC', 'TLRY', 'BTC-CAD']
    let text = ""
    await fetch(`https://api.twelvedata.com/time_series?symbol=${symbols.join(',')}&interval=1day&outputsize=1&apikey=0e4deeb9c9604b3dbf591e323135ecf4`)
        .then(res => res.json())
        .then(data => {
            Object.keys(data).forEach(key => {
                const open = data[key]["values"][0]["open"]
                const close = data[key]["values"][0]["close"]
                const pctChange = (close - open) / open * 100
                text += `${key}${pctChange > 0 ? "+" : ""}${pctChange.toFixed(2)}% `
            })
        })
        .catch(err => console.log(err))

    return text
}


const letterMap = { // converting all characters to a 5 pixel tall sprite
    "A": [
        [0, 1, 0],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1]
    ],
    "B": [
        [1, 1, 0],
        [1, 0, 1],
        [1, 1, 0],
        [1, 0, 1],
        [1, 1, 0]
    ],
    "C": [
        [0, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [0, 1, 1]
    ],
    "D": [
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 0]
    ],
    "E": [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1]
    ],
    "F": [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0]
    ],
    "G": [
        [0, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 0, 1, 1],
        [1, 0, 0, 1],
        [0, 1, 1, 1]
    ],
    "H": [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1]
    ],
    "I": [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 1]
    ],
    "J": [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
        [1, 0, 1],
        [0, 1, 0]
    ],
    "K": [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 1]
    ],
    "L": [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1]
    ],
    "M": [
        [0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1]
    ],
    "N": [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 0, 1]
    ],
    "O": [
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [0, 1, 1, 0]
    ],
    "P": [
        [1, 1, 0],
        [1, 0, 1],
        [1, 1, 0],
        [1, 0, 0],
        [1, 0, 0]
    ],
    "Q": [
        [0, 1, 0],
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0],
        [0, 0, 1]
    ],
    "R": [
        [1, 1, 0],
        [1, 0, 1],
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 1]
    ],
    "S": [
        [0, 1, 1],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 0]
    ],
    "T": [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ],
    "U": [
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [0, 1, 1, 0]
    ],
    "V": [
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0]
    ],
    "W": [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0]
    ],
    "X": [
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
        [1, 0, 1]
    ],
    "Y": [
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ],
    "Z": [
        [1, 1, 1],
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 1]
    ],
    "0": [
        [0, 1, 0],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0]
    ],
    "1": [
        [0, 1],
        [1, 1],
        [0, 1],
        [0, 1],
        [0, 1]
    ],
    "2": [
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1]
    ],
    "3": [
        [1, 1, 1],
        [0, 0, 1],
        [0, 1, 1],
        [0, 0, 1],
        [1, 1, 1]
    ],
    "4": [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
    ],
    "5": [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1]
    ],
    "6": [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ],
    "7": [
        [1, 1, 1],
        [0, 0, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ],
    "8": [
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0]
    ],
    "9": [
        [0, 1, 1],
        [1, 0, 1],
        [0, 1, 1],
        [0, 0, 1],
        [1, 1, 1]
    ],
    " ": [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    "!": [
        [1],
        [1],
        [1],
        [0],
        [1]
    ],
    "?": [
        [1, 1, 0],
        [0, 0, 1],
        [0, 1, 0],
        [0, 0, 0],
        [0, 1, 0]
    ],
    ".": [
        [0],
        [0],
        [0],
        [0],
        [1]
    ],
    ",": [
        [0],
        [0],
        [0],
        [1],
        [1]
    ],
    ":": [
        [0],
        [1],
        [0],
        [0],
        [1]
    ],
    "+": [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ],
    "-": [
        [0, 0, 0],
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
    ],
    "%": [
        [1, 1, 0, 0, 1],
        [1, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 1],
        [1, 0, 0, 1, 1]
    ],
    "|": [
        [1],
        [1],
        [1],
        [1],
        [1]
    ],
    "=": [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ]
}