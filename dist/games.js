const currentGame = document.getElementById('current-game');

function swapGames(newGameCont) {
    setTimeout(() => {

        const oldTitle = currentGame.children[0].getAttribute('title');
        const oldThumb = currentGame.children[0].children[0].getAttribute('src');
        const oldUrl = currentGame.children[0].getAttribute('url');
        const oldW = currentGame.children[0].getAttribute('f-width');
        const oldH = currentGame.children[0].getAttribute('f-height');

        const newTitle = newGameCont.children[0].getAttribute('title');
        const newThumb = newGameCont.children[0].children[0].getAttribute('src');
        const newUrl = newGameCont.children[0].getAttribute('url');
        const newW = newGameCont.children[0].getAttribute('f-width');
        const newH = newGameCont.children[0].getAttribute('f-height');

        newGameCont.children[0].setAttribute('title', oldTitle);
        newGameCont.children[0].children[0].setAttribute('src', oldThumb);
        newGameCont.children[0].setAttribute('url', oldUrl);
        newGameCont.children[0].setAttribute('f-width', oldW);
        newGameCont.children[0].setAttribute('f-height', oldH);

        currentGame.children[0].setAttribute('title', newTitle);
        currentGame.children[0].children[0].setAttribute('src', newThumb);
        currentGame.children[0].setAttribute('url', newUrl);
        currentGame.children[0].setAttribute('f-width', newW);
        currentGame.children[0].setAttribute('f-height', newH);

        document.querySelector("iframe").setAttribute('src', `https://www.khanacademy.org/computer-programming${newUrl}embedded?editor=no&buttons=no&author=no&embed=yes`);
        document.querySelector("iframe").style.width = newW;
        document.querySelector("iframe").style.height = newH;

        document.getElementById("controls").innerHTML = newGameCont.children[1].innerHTML;
        if (newH == "400px") {
            document.querySelector(".gamebox").style.paddingBlock = '50px'
        } else {
            document.querySelector(".gamebox").style.paddingBlock = '0px'
        }

        newGameCont.classList.add("last-game-clicked")
        newGameCont.onmouseleave = function () {
            newGameCont.classList.remove("last-game-clicked")
        }

        document.getElementById("control-title").innerHTML = newGameCont.children[0].getAttribute("name") || newTitle;

    }, 500)

    currentGame.children[0].classList.add("animate-pop")
    window.scrollTo(0, 0)
    setTimeout(function () {
        currentGame.children[0].classList.remove("animate-pop")
    }, 1000)
}

for (let p of document.getElementsByClassName("game-picker")) {

    for (let g of p.children) {
        g.onclick = (e) => {
            if (e.target.classList.contains("game-cartridge-cont")) {
                swapGames(e.target);
            } else if (e.target.classList.contains("game-cartridge")) {
                swapGames(e.target.parentElement);
            }
        }
    }
}