const header = document.body.querySelector("header")
const len = "JacobTepperman's".length
const tipcircles = document.getElementsByClassName("tipcircle")
var i = 0

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
u.innerHTML = "Functions"
const c = document.createElement('center')
c.appendChild(u)
document.body.insertBefore(c, header.nextSibling)


for (i of tipcircles){
    t = i.getAttribute('tip')
    r = i.getBoundingClientRect()
    const e = "returnTooltip("+(r.x+20)+","+(r.y-30)+",'"+t+"')"
    i.setAttribute("onmouseover", "document.body.appendChild("+e+")")
    i.setAttribute("onmouseout","document.body.removeChild(document.getElementsByClassName('tip')[0])")
}


function returnTooltip(x,y,text){
    const t = document.createElement('tt')
    t.innerHTML = text
    t.style.position = "fixed"
    t.style.top = y+"px"
    t.style.left = x+"px"
    t.classList.add('tip')
    return t
}