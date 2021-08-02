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

//picker
for (let el of document.getElementsByClassName("picker-item")) {
    el.onclick = () => {
        movePickerOver(el)
    }
}

function movePickerOver(element) {
    document.documentElement.style.setProperty("--over-left-" + element.parentNode.getAttribute("tag"), `${indexOf(element.parentNode.children, element) * 100}px`);
    element.parentNode.setAttribute("value", element.getAttribute("value"))
}

function indexOf(collection, element) {
    for (let i = 0; i < collection.length; i++) {
        if (collection[i] == element) {
            return i
        }
    }
    return -1
}