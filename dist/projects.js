const len = "JacobTepperman's".length
const first = document.getElementById('first')
const last = document.getElementById('last')
const first2 = document.getElementById('first2')
const last2 = document.getElementById('last2')
var i = 0

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
u.innerHTML = "Projects"
document.getElementById('tt').appendChild(u)

for (l of "Jacob"){
    const e = document.createElement("xa")
    e.innerHTML = l
    e.style.animationDelay = i-len+"s"
    first2.appendChild(e)
    i++
}
for (l of "Tepperman's"){
    const e = document.createElement("xa")
    e.innerHTML = l
    e.style.animationDelay = i-len+"s"
    last2.appendChild(e)
    i++
}