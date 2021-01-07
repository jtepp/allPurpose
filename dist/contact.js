const header = document.body.querySelector("header")
const len = "JacobTepperman".length
const first = document.getElementById('first')
const last = document.getElementById('last')
var i = 0

for (l of "Jacob"){
    const e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i-len+"s"
    first.appendChild(e)
    i++
}
for (l of "Tepperman"){
    const e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i-len+"s"
    last.appendChild(e)
    i++
}