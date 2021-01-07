const header = document.body.querySelector("header")
var i = 0

for (l of "Jacob"){
    const e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i-13+"s"
    header.appendChild(e)
    i++
}
header.appendChild(document.createElement('br'))
for (l of "Tepperman"){
    const e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i-13+"s"
    header.appendChild(e)
    i++
}