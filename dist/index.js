let header = document.body.querySelector("header")
let len = "JacobTepperman".length
let first = document.getElementById('first')
let last = document.getElementById('last')
var i = 0

for (let l of "Jacob") {
    let e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i - len + "s"
    first.appendChild(e)
    i++
}
for (let l of "Tepperman") {
    let e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i - len + "s"
    last.appendChild(e)
    i++
}

// function to change page without re-rendering
function changePage(page) {
    fetch("/" + page)
        .then(response => response.text())
        .then(text => {
            document.body.innerHTML = text

            window.history.pushState("/" + page, page + " | Jacob Tepperman", "/" + page)
        })
}

function addScript(page) {
    document.querySelector("script").remove()
    let script = document.createElement('script')
    script.src = "/" + page + ".js"
    document.body.appendChild(script)
}