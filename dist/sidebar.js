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