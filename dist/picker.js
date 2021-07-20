for (let el of document.getElementsByClassName("picker-item")) {
    el.onclick = () => {
        movePickerOver(el)
    }
}

function movePickerOver(element) {
    document.documentElement.style.setProperty("--over-left", `${indexOf(element.parentNode.children, element) * 100}px`);
    document.getElementById("picker").setAttribute("value", element.getAttribute("value"))
}

function indexOf(collection, element) {
    for (let i = 0; i < collection.length; i++) {
        if (collection[i] == element) {
            return i
        }
    }
    return -1
}