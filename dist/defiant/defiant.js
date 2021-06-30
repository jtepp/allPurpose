const countdownUntil = 1626926400 //july 22
const days = document.getElementById("days")
const hrs = document.getElementById("hrs")
const mins = document.getElementById("mins")
const sec = document.getElementById("sec")

//reformat join button when a card's fields are filled
for (n of [0, 1]) {
    let ee = document.getElementsByClassName('email')[n]
    let pe = document.getElementsByClassName('phone')[n]
    let je = document.getElementsByClassName('joinbutton')[n]

    function refreshJoin(e) {
        if (e.keyCode == 13) {
            e.preventDefault()
        } else {
            if (ee.innerHTML != "" && ee.innerHTML.includes('@') && ee.innerHTML.includes('.') && pe.innerHTML != "" && !isNaN(pe.innerHTML)) {
                je.classList.add("joinbuttonhover")
            } else {
                je.classList.remove("joinbuttonhover")
            }
        }
    }
    ee.onkeyup = refreshJoin
    pe.onkeyup = refreshJoin
}
updateTime()
setInterval(updateTime, 1000)

function updateTime() {
    const difference = countdownUntil - Math.round(Date.now() / 1000)
    sec.innerHTML = difference % 60
    mins.innerHTML = (difference % 3600 - difference % 60) / 60
    hrs.innerHTML = Math.floor((difference % 86400) / 3600)
    days.innerHTML = Math.floor((difference - Math.floor((difference % 86400) / 3600) - (difference % 3600 - difference % 60) / 60 - difference % 60) / 86400)
}