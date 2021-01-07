const header = document.body.querySelector("header")
var i = 0
const len = "JacobTepperman's".length

for (l of "Jacob"){
    const e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i-len+"s"
    header.appendChild(e)
    i++
}
header.appendChild(document.createElement('br'))
for (l of "Tepperman's"){
    const e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i-len+"s"
    header.appendChild(e)
    i++
}
header.appendChild(document.createElement('br'))
const u = document.createElement("u")
u.innerHTML = "Games"
const c = document.createElement('center')
c.appendChild(u)
document.body.insertBefore(c, header.nextSibling)