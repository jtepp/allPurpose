const header = document.body.querySelector("header")
const len = "JacobTepperman".length
const first = document.getElementById('first')
const last = document.getElementById('last')
var i = 0

for (let l of "Jacob") {
    const e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i - len + "s"
    first.appendChild(e)
    i++
}
for (let l of "Tepperman") {
    const e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i - len + "s"
    last.appendChild(e)
    i++
}

// function to change page without re-rendering
function changePage(page) {
    fetch("https://jacobtepperman.com/page/" + page)
        .then(response => response.text())
        .then(text => {
            console.log(text)
            window.history.pushState("/" + page, page + " | Jacob Tepperman", "/" + page)
        })
}