const len = "JacobTepperman's".length
const first = document.getElementById('first')
const last = document.getElementById('last')
var i = 0

for (let l of "Jacob"){
    const e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i-len+"s"
    first.appendChild(e)
    i++
}
for (let l of "Tepperman's"){
    const e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i-len+"s"
    last.appendChild(e)
    i++
}