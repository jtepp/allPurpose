const header = document.body.querySelector("header")
var i = 0
const len = "JacobTepperman's".length

for (l of "Jacob"){
    const e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i-len+"s"
    first.appendChild(e)
    i++
}
for (l of "Tepperman's"){
    const e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i-len+"s"
    last.appendChild(e)
    i++
}
const u = document.createElement("u")
u.innerHTML = "Games"
header.appendChild(u)
header.appendChild(document.createElement('span'))