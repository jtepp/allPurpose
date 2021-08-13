let lastIndex = {
    "purpose": 0,
    "platform": 0,
}


for (let el of document.getElementsByClassName("picker-item")) {
    el.onclick = () => {
        movePickerOver(el)
    }
}

document.body.onresize = () => {
    // document.querySelector(":root").style.setProperty("--picker-item-width"
    document.documentElement.style.setProperty("--over-left-purpose",
        `${lastIndex["purpose"] * getWidth()}px`);

    document.documentElement.style.setProperty("--over-left-platform",
        `${lastIndex["platform"] * getWidth()}px`);
}

function movePickerOver(element) {
    document.documentElement.style.setProperty("--over-left-" + element.parentNode.getAttribute("tag"),
        `${indexOf(element.parentNode.children, element) * getWidth()}px`);
    element.parentNode.setAttribute("value", element.getAttribute("value"))
    lastIndex[element.parentNode.getAttribute("tag")] = indexOf(element.parentNode.children, element)
}

function indexOf(collection, element) {
    for (let i = 0; i < collection.length; i++) {
        if (collection[i] == element) {
            return i
        }
    }
    return -1
}

function getWidth() {
    return document.querySelector(".picker-item").getBoundingClientRect().width
}