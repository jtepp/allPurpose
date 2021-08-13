function changePage(page) {
    fetch("/" + page)
        .then(response => response.text())
        .then(text => {
            document.getElementById("notHead").innerHTML = text
            addScript(page)
            window.history.pushState(page, page + " | Jacob Tepperman", page)
        })
}

function addScript(page) {
    document.querySelector("script").remove()
    const script = document.createElement('script')
    script.src = +page + ".js"
    document.body.appendChild(script)
}

document.querySelector(':root').style.setProperty('--current-index', document.querySelector('[current]').getAttribute('index'))


document.getElementById("sidebar-button").onclick = function () {
    document.getElementById("sidebar").classList.toggle("sidebar-opened")
}

document.getElementById("sidebar").onmouseleave = function () {
    document.getElementById("sidebar").classList.remove("other-hover")
    document.querySelector(':root').style.setProperty('--current-index', document.querySelector('[current]').getAttribute('index'))
}

for (let el of document.getElementsByClassName("sidebar-item")) {
    el.onmouseover = function () {
        for (let elem of document.getElementsByClassName("sidebar-item")) {
            elem.classList.remove("other-current")
        }

        el.classList.add("other-current")
        document.getElementById("sidebar").classList.add("other-hover")

        document.querySelector(':root').style.setProperty('--current-index', el.getAttribute('index'))
    }
}

document.querySelector("[current]").onmouseleave = function () {
    document.querySelector(':root').style.setProperty('--current-index', document.querySelector('[current]').getAttribute('index'))
    document.getElementById("sidebar").classList.remove("other-hover")

}