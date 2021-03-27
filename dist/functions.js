const len = "JacobTepperman's".length
const inputs = document.getElementsByTagName('input')
const tipcircles = document.getElementsByClassName("tipcircle")
const coordSearch = document.getElementById('coordsearch')
const imgSearch = document.getElementById('imgsearch')
const dateSearch = document.getElementById('datesearch')
const redSearch = document.getElementById('redsearch')
const first = document.getElementById('first')
const last = document.getElementById('last')
var i = 0

for (let l of "Jacob"){
    const e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i-len+"s"
    first.appendChild(e)
    i++
}
for (let l of "Tepperman's"){
    const e = document.createElement("x")
    e.innerHTML = l
    e.style.animationDelay = i-len+"s"
    last.appendChild(e)
    i++
}
//missions
document.getElementById('missionstestbutton').onclick = async ()=>{
    return await fetch("https://allpurpose.netlify.app/.netlify/functions/missions")
    .then(res => res.json())
    .then(data => document.getElementById('missionstext').innerText = JSON.stringify(data))
}
document.getElementById('missionstesttitle').onclick = async ()=>{
    return await fetch("https://allpurpose.netlify.app/.netlify/functions/missions")
    .then(res => res.json())
    .then(data => document.getElementById('missionstext').innerText = JSON.stringify(data))
}

//coords
document.getElementById('coordstestbutton').onclick = async ()=>{
    if (coordSearch.value != '') {
    return await fetch("https://allpurpose.netlify.app/.netlify/functions/coordinates?a="+coordSearch.innerText)
    .then(res => res.text())
    .then(data => 
             document.getElementById('coordstext').innerText = data
        )
        .catch(err=> document.getElementById('coordstext').innerText = "Please enter a valid location name")
}
else document.getElementById('coordstext').innerText = "Please enter a valid location name"
}
document.getElementById('coordstesttitle').onclick = ()=>{
    document.getElementById('coordstestbutton').click()
}

coordSearch.onkeydown = (e)=>{
    if (e.keyCode == 13) {
        e.preventDefault()
        document.getElementById('coordstestbutton').click()
    }
}



// document.getElementById('imgtest').onclick = async ()=>{
//     if (imgSearch.value != '') {
//     return await fetch("https://allpurpose.netlify.app/.netlify/functions/images?q="+imgSearch.value+"&b64")
//     .then(res => res.text())
//     .then(data => 
//              document.getElementById('imgimg').src = "data:image/jpeg;charset=utf-8;base64,"+data
//         )
//         .catch( err => document.getElementById('imgimg').src = "")

// }
// else document.getElementById('imgimg').src = ""
// }


// document.getElementById('datetest').onclick = async ()=>{
//     if (dateSearch.value != '') {
//     return await fetch("https://allpurpose.netlify.app/.netlify/functions/dateParse?a="+dateSearch.value)
//     .then(res => res.text())
//     .then(data => 
//              document.getElementById('datetext').innerText = data
//         )
//         .catch(err=> document.getElementById('datetext').innerText = "Invalid Date")
// }
// else document.getElementById('datetext').innerText = "Invalid Date"
// }





// document.getElementById('redtest').onclick = async ()=>{
//     if (redSearch.value != '') {
//     return await fetch("https://allpurpose.netlify.app/.netlify/functions/reddit?sort=top&limit=1&sub="+redSearch.value)
//     .then(res => res.text())
//     .then(data => 
//              {
//                 if (data == "[]") document.getElementById('redtext').innerText = "Invalid Subreddit"
//                 else document.getElementById('redtext').innerText = JSON.stringify(JSON.parse(data)[0])
//             }
//         )
//         .catch(err=> document.getElementById('redtext').innerText = "Invalid Subreddit")
// }
// else document.getElementById('redtext').innerText = "Invalid Subreddit"
// }
