import fetch from "node-fetch"
import {
    parse
} from 'node-html-parser';
exports.handler = async (event) => {

    const mode = event.queryStringParameters.mode;
    const query = event.queryStringParameters["q"]
    const page = event.queryStringParameters["page"]

    let message = []
    let output = []

    switch (mode) {
        case 'stocks':
            await getStocks(query).then(data => {
                message = data.toUpperCase()
            })
            break;
            // case 'waves':
            //     message = Array(...(q == "filled" ? `[]` : `{}`))
            //     break;
        case 'time':
            const d = new Date()
            d.setHours(d.getHours() + Number(query)) //est time
            message = d.toLocaleTimeString().toUpperCase()
            break;
        case 'sports':
            message = await getSports(query)
            break;
        case 'text':
        default:
            message = query.toUpperCase()
    }

    // if (mode != 'waves')
    //     message.push(' ', '.')

    Array(5).fill(0).forEach((u, index) => {
        let string = "          " //mode == 'waves' ? "" : "0,0,0,0,0,"
        try {
            string += message // + "     "
            string = Array(...string).map(l => letterMap[l][index]).join(mode == 'waves' ? "," : ",0,")
        } catch (e) {
            console.log("Probably has a letter that doesnt have a map")
            console.error(e)
        }
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
        body: innerArrayText(JSON.stringify(output.slice(0, 500)))
    })


}

function innerArrayText(text) {
    // remove first and list characters
    return text.slice(1, -1).split('],[').join('][')
}

async function getStocks(symbolsString) {
    const symbols = symbolsString.split(',')
    let text = ""
    await fetch(`https://api.twelvedata.com/time_series?symbol=${symbols.join(',')}&interval=1day&outputsize=1&apikey=0e4deeb9c9604b3dbf591e323135ecf4`)
        .then(res => res.json())
        .then(data => {
            if (data.code && data.code == 429) {
                text = data.message
            } else {
                Object.keys(data).forEach(key => {
                    const open = data[key]["values"][0]["open"]
                    const close = data[key]["values"][0]["close"]
                    const pctChange = (close - open) / open * 100
                    text += `${key}${pctChange > 0 ? "+" : ""}${pctChange.toFixed(2)}% `
                })
                console.log(data)
            }
        })
        .catch(err => console.log(err))

    return text
}

async function getSports(leaguesString) {
    const leagues = leaguesString.split(',')

    let text = ""

    if (leagues.includes('mlb')) {
        const html = await fetch(`https://www.mlb.com/`)
            .then(res => res.text())
            .catch(err => console.log(err))
        const root = parse(html)

        let add = root.querySelectorAll('.trk-minisb-sticky-date').length == 2 // if there are two dates, take todays (1) and skip tomorrow (2)
        // if only one date, take that one
        // if three dates skip yesterday (1) and take today (2) then skip tomorrow (3)

        root.querySelector(`[data-mlb-test="controlled-overflow_inner-wrapper"]`).childNodes.forEach((matchup, index) => {
            // if (add) {
            if (index > 0 && matchup.classList._set.has('trk-minisb-sticky-date')) {
                add = !add
                // console.log(matchup.innerText)
            } else if (index > 0 && add && !matchup.classList._set.has('trk-minisb-sticky-date')) {
                matchup.querySelectorAll(".MUnBu").forEach((team, i) => {
                    const name = team.childNodes[0].innerText
                    const score = team.childNodes[team.childNodes.length - 1].innerText.split(/\d+ - \d+/).join('')
                    text += (`${fixMLB(name)} ${score} ` + (i == 1 ? "" : "- ")).split('  ').join(' ')
                })
                const time = matchup.querySelector(".short").innerText.replace(' ET', '')
                text += time + " | "
            }
            // }
        })
    }
    return text.toUpperCase()
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
        [0, 1, 1, 0],
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
        [1, 1, 0],
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 1]
    ],
    "3": [
        [1, 1, 0],
        [0, 0, 1],
        [0, 1, 1],
        [0, 0, 1],
        [1, 1, 0]
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
        [1, 1, 0]
    ],
    "6": [
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 0],
        [1, 0, 1],
        [0, 1, 0]
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
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 1],
        [0, 0, 1],
        [0, 1, 0]
    ],
    " ": [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
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
    ],
    "'": [
        [1],
        [1],
        [0],
        [0],
        [0]
    ],
    // waves
    // "{": [
    //     [0, 0, 1, 0, 0],
    //     [0, 1, 0, 1, 0],
    //     [1, 0, 0, 0, 1],
    //     [0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0]
    // ],
    // "}": [
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 1],
    //     [1, 0, 1, 0],
    //     [0, 1, 0, 0]
    // ],
    // "[": [
    //     [0, 0, 0, 0, 1],
    //     [0, 0, 0, 1, 1],
    //     [0, 0, 1, 1, 1],
    //     [0, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1]
    // ],
    // "]": [
    //     [1, 0, 0, 0, 0],
    //     [1, 1, 0, 0, 0],
    //     [1, 1, 1, 0, 0],
    //     [1, 1, 1, 1, 0],
    //     [1, 1, 1, 0, 0]
    // ],
    "/": [
        [0, 0, 1],
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
        [1, 0, 0]
    ]

}

function fixWebText(txt) {
    return txt.split('&#x27;').join("'")
}

function fixMLB(txt) {
    // find the last lowercase character
    var last = txt.length - 1;
    while (last >= 0 && txt[last] != txt[last].toLowerCase()) {
        last--;
    }
    // return the string from the last lowercase character onward
    return txt.substring(last + 1);
}