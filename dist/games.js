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