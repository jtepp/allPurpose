class Tutor {
    //  constructor(name, school, sat, act, about, subjects) {
    //     this.name = name
    //     this.school = school
    //     this.sat = sat
    //     this.act = act
    //     this.about = about
    //     this.subjects = subjects
    // }
    constructor() {
        this.name = randomElement(["Emma Smith", "Clay Oxford", "Krystal McRae", "Sophia Smith", "Alexandria Ferguson", "Nora McRae", "Mia Smith", "Sophia Fine"])
        this.school = randomElement(["Yale", "Duke", "Georgia Tech", "Harvard", "Columbia", "MIT", "Stanford"])
        this.sat = Math.floor(150 + Math.random() * 1) * 10
        this.act = Math.floor(30 + Math.random() * 9)
        this.about = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua onsectetur adipiscing elit, sed do adipiscing elit, sed do eiusmod tempor incididu ut labore et dolore magna aliqua onsectetur ghnmm nmk jojojoonsectetur adipiscing elit, sed do eiumod. magna aliquanninii onsectetur adipiscing elit, sed d eiusmod. Lornininiem ipsum lorem ooipu"
        this.subjects = {
            "Math": randomSlice(["Algebra 1", "Algebra 2", "Calculus", "Geometry", "Linear Algebra"], 2),
            "English": randomSlice(["Creative Writing", "Shakespeare", "Literature", "Public Speaking", "Spelling"], 3),
            "Science": randomSlice(["Biology", "Chemistry", "Physics", "Biology"], 2),
            "History": [randomElement(["World History", "United States6", "Civilizations"])],
            "SAT/ACT": [randomElement(["SAT", "ACT"])]
        }
        this.imgurl = "https://raw.githubusercontent.com/jtepp/allPurpose/Home/dist/alexander/Tutor" + Math.floor(Math.random() * 2 + 1) + ".png"
        this.altimgurl = "https://raw.githubusercontent.com/jtepp/allPurpose/Home/dist/alexander/alttutor.png"
        this.location = randomElement(["in-person", "online"])
        this.role = randomElement(["tutor", "admin"])
    }

}

var chosenSubjects = []
var chosenSchools = []
var allSubjects = {}
var allSchools = []
var allTutors = [...Array(Math.floor(16 + Math.random() * 10))].map(() => new Tutor()) //make list of tutors

processTutors(allTutors, true)
filterTutors()

document.body.onclick = function (e) {

    if (e.target.classList.contains("sopen")) {
        closeSheet()
    }

    if (e.target.id == "sheet-request-tutor") {
        document.getElementById("sheet-container").classList.toggle("srequest")
        document.getElementById("sheet-container").classList.toggle("scontent")
    }

    if (e.target.classList.contains("filter-button")) { // Click on filter button toggle filter menu and turn others off

        for (el of e.target.parentNode.children) {
            if (el != e.target) {
                el.children[1].classList.remove("fmopen")
                el.children[1].classList.add("fmclosed")
            }
        }

        toggleClassOpenClosed(e.target.children[1], "fm")


    } else if (!e.target.classList.toString().includes("filter")) { // Close all filters if target has nothing to do with filters
        for (let el of document.getElementsByClassName("filter-button")) {
            el.children[1].classList.remove("fmopen")
            el.children[1].classList.add("fmclosed")
        }
    }

    if (e.target.classList.contains("request-dropdown")) { // Click on request-dropdown button toggle request menu and turn others off

        for (el of document.getElementsByClassName("request-dropdown")) {
            if (el.children[1] != e.target.children[1]) {
                el.children[1].classList.remove("rmopen")
                el.children[1].classList.add("rmclosed")
            }
        }

        toggleClassOpenClosed(e.target.children[1], "rm")


    } else if (!e.target.classList.toString().includes("dropdown") && !e.target.classList.toString().includes("item")) {
        for (el of document.getElementsByClassName("request-dropdown")) {
            el.children[1].classList.remove("rmopen")
            el.children[1].classList.add("rmclosed")
        }
    }


    if (e.target.classList.contains("filter-item-container") && e.target.children[0].classList.contains("filter-item-text")) { // Click on filter item text to change the text

        let newText = e.target.children[0].innerText

        e.target.parentNode.parentNode.setAttribute("selected", newText)

        filterTutors()
        if (e.target.parentNode != null) {
            for (let el of e.target.parentNode.children) {
                el.setAttribute('selected', 'false')
            }
            e.target.setAttribute('selected', 'true')
        }

        if (e.target.id == "All-subjects") {
            chosenSubjects = []
            document.getElementById("Subject").setAttribute("selected", "All")
            console.log(true)
            for (let c of document.getElementsByClassName("filter-item-checkbox")) {
                if (c.parentNode.parentNode.classList.contains("filter-item-dropdown")) //turns off all nested checkboxes which is just what subject uses
                    c.setAttribute("checked", "false")
            }
        }
        if (e.target.id == "All-schools") {
            chosenSchools = []
            document.getElementById("School").setAttribute("selected", "All")
            for (let c of document.getElementsByClassName("filter-item-checkbox")) {
                if (!c.parentNode.parentNode.classList.contains("filter-item-dropdown")) // turns off all non nested checkboxes which is just what school uses (maybe fix this soon...)
                    c.setAttribute("checked", "false")
            }
        }


    } else if (e.target.classList.contains("filter-dropdown-header")) { // Click dropdown header to toggle 
        toggleClassOpenClosed(e.target.nextSibling, "fid")
    } else if (e.target.classList.contains("filter-item-container") && e.target.children[0].classList.contains("filter-item-checkbox")) { //click checkbox to toggle
        toggleAttributeCheckBox(e.target.children[0], "checked", (e.target.parentNode.classList.contains("filter-item-dropdown")) ? "subject" : "school")
    }

    if (e.target.classList.contains("link-button")) { // Click on reset button to reset all filters
        setFalseExceptAll()
        filterTutors()
    }
}

function toggleClassOpenClosed(element, pre) {
    if (element.classList.contains(pre + "closed")) {
        element.classList.remove(pre + "closed")
        element.classList.add(pre + "open")
    } else {
        element.classList.add(pre + "closed")
        element.classList.remove(pre + "open")
    }
}


function toggleAttributeCheckBox(element, attr, usage) {
    if (element.getAttribute(attr) == "true") {
        element.setAttribute(attr, "false")
        if (usage == "subject") {
            removeElementFromArray(chosenSubjects, element.innerText)
        } else if (usage == "school") {
            removeElementFromArray(chosenSchools, element.innerText)
        }
    } else {
        element.setAttribute(attr, "true")
        if (usage == "subject") {
            chosenSubjects.push(element.innerText)
        } else if (usage == "school") {
            chosenSchools.push(element.innerText)
        }
    }
    if (usage == "subject") {
        if (chosenSubjects.length == 0) {
            document.getElementById("Subject").setAttribute("selected", "All")
            document.getElementById("All-subjects").setAttribute("selected", "true")
        } else {

            document.getElementById("Subject").setAttribute("selected", chosenSubjects.length < 3 ? chosenSubjects.join(", ") : `${chosenSubjects[0]}, ...`)
            document.getElementById("All-subjects").setAttribute("selected", "false")

        }
    } else if (usage == "school") {
        if (chosenSchools.length == 0) {
            document.getElementById("School").setAttribute("selected", "All")
            document.getElementById("All-schools").setAttribute("selected", "true")
        } else {
            document.getElementById("School").setAttribute("selected", chosenSchools.length < 3 ? chosenSchools.join(", ") : `${chosenSchools[0]}, ...`)
            document.getElementById("All-schools").setAttribute("selected", "false")
        }
    }
    filterTutors()
}

function setFalseExceptAll(onlyCheckboxes) {
    for (let el of document.getElementsByClassName("filter-item-container")) {
        if (el.getAttribute("selected") == "true" && el.children[0].innerText != "All") {
            el.setAttribute('selected', 'false')
        }
    }
    //set all elements of filter-button to attribuute selected = All
    for (let el of document.getElementsByClassName("filter-button")) {
        el.setAttribute('selected', 'All')
    }
    for (let el of document.getElementsByClassName("filter-item-checkbox")) {
        el.setAttribute('checked', 'false')
        chosenSubjects = []
    }
}


function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function returnTutor(tutor) {
    let tutorHtml = document.createElement("div")
    let tutorImg = document.createElement("img")

    tutorHtml.setAttribute('name', tutor.name)
    tutorHtml.setAttribute('school', tutor.school)
    tutorHtml.classList.add("tutor-cell")

    tutorImg.src = tutor.imgurl

    tutorHtml.appendChild(tutorImg)

    tutorHtml.onclick = () => {
        fillSheet(tutor)
        showSheet()
    }

    return tutorHtml
}

// initial param true enables filling all filter boxes
function processTutors(givenTutors, initial) { // Iterate through tutors to make fill list of schools and subjects, and place in HTML
    document.getElementById("tutor-container").innerHTML = ""
    for (let t of givenTutors) {
        if (!allSchools.includes(t.school)) { // if list doesnt have this school, add it
            allSchools.push(t.school)
        }
        for (let s in t.subjects) { // subjects
            for (let c of t.subjects[s]) { // classes
                if (allSubjects[s] == undefined) {
                    allSubjects[s] = []
                }
                if (!allSubjects[s].includes(c)) { // if list doesnt have this course, add it
                    allSubjects[s].push(c)
                }
            }
        }
        // add tutor html to tutor-container
        document.getElementById("tutor-container").appendChild(returnTutor(t))
    }
    if (initial) {
        let c = document.getElementById("subjects")
        c.innerHTML = ""
        c.appendChild(returnAllButton("subjects"))
        for (let s in allSubjects) { // subjects
            c.appendChild(returnDropdownHeader(s))
            c.appendChild(returnDropdownItemsAdded(allSubjects[s]))
        }

        let s = document.getElementById("schools")
        s.innerHTML = ""
        s.appendChild(returnAllButton("schools"))
        for (let v of allSchools) { // schools
            s.appendChild(returnDropdownCheck(v))
        }
    }
    document.getElementById("filter-reset-line").children[0].innerHTML = `Viewing ${givenTutors.length} of ${allTutors.length} results&nbsp;`
}

function returnDropdownHeader(name) {
    let dropdownHeader = document.createElement("div")
    dropdownHeader.classList.add("filter-dropdown-header")
    dropdownHeader.innerText = name
    return dropdownHeader
}

function returnDropdownItemsAdded(classes, check) {
    let dropdown = document.createElement("div")
    dropdown.classList.add("filter-item-dropdown")
    dropdown.classList.add("fidclosed")

    for (let c of classes) {
        let classcont = document.createElement("div")
        classcont.classList.add("filter-item-container")

        let classItem = document.createElement("div")
        classItem.classList.add("filter-item-checkbox")
        classItem.innerHTML = c
        classItem.setAttribute("checked", "false")

        classcont.appendChild(classItem)

        dropdown.appendChild(classcont)
    }
    return dropdown
}

function returnDropdownText(name) {
    let schoolcont = document.createElement("div")
    schoolcont.classList.add("filter-item-container")
    schoolcont.setAttribute("selected", "false")

    let schoolitem = document.createElement("div")
    schoolitem.classList.add("filter-item-text")
    schoolitem.innerHTML = name

    schoolcont.appendChild(schoolitem)

    return schoolcont

}

function returnDropdownCheck(name) {
    let schoolcont = document.createElement("div")
    schoolcont.classList.add("filter-item-container")
    schoolcont.setAttribute("selected", "false")

    let schoolitem = document.createElement("div")
    schoolitem.classList.add("filter-item-checkbox")
    schoolitem.setAttribute("checked", "false")
    schoolitem.innerHTML = name

    schoolcont.appendChild(schoolitem)

    return schoolcont

}

function closeSheet() {
    document.getElementById("sheet-back").classList.remove("sopen")
    document.getElementById("sheet-back").classList.add("sclosed")
}

function showSheet() {
    document.getElementById("sheet-back").classList.remove("sclosed")
    document.getElementById("sheet-back").classList.add("sopen")
}


function fillSheet(tutor) {
    // clear sheet
    const name = document.getElementById("sheet-name")
    const school = document.getElementById("sheet-school")
    const topimg = document.getElementById("sheet-pic-top")
    const altimg = document.getElementById("sheet-pic-alt")
    const about = document.getElementById("sheet-body-about")
    const subjects = document.getElementById("sheet-body-subjects")

    subjects.innerHTML = ""

    // fill sheet
    name.innerText = tutor.name
    school.innerText = `${tutor.school}${tutor.sat ? "   SAT "+tutor.sat : ""}${tutor.act ? "   ACT "+tutor.act : ""}`

    topimg.src = tutor.imgurl
    altimg.src = tutor.altimgurl

    about.innerText = tutor.about

    for (let s in tutor.subjects) {
        if (tutor.subjects[s].length > 0) {
            let cell = document.createElement("div")
            cell.innerHTML = tutor.subjects[s].join(", ")
            cell.setAttribute("subject", s)
            cell.classList.add("subject-cell")
            subjects.appendChild(cell)
        }
    }

}

function filterTutors() {
    const currentPeople = document.getElementById("People").getAttribute("selected")
    const currentSubject = document.getElementById("Subject").getAttribute("selected")
    const currentSchool = document.getElementById("School").getAttribute("selected")
    const currentLocation = document.getElementById("Location").getAttribute("selected")

    let givenTutors = allTutors.filter(tutor => {
        const tSchool = currentSchool == "All" ? true : chosenSchools.includes(tutor.school)
        const tSubjects = currentSubject == "All" ? true : chosenSubjects.every(subject => {
            return Object.values(tutor.subjects).flat().includes(subject)
        })
        const tLocation = currentLocation == "All" ? true : currentLocation.toLowerCase() == tutor.location
        const tPeople = currentPeople == "All" ? true : currentPeople.toLowerCase() == tutor.role

        return (tSchool && tSubjects && tLocation && tPeople)
    })

    processTutors(givenTutors, false)
}

//function to return a random slice of an array
function randomSlice(arr, n) {
    let result = []
    while (result.length < n) {
        let index = Math.floor(Math.random() * arr.length)
        result.push(arr[index])
    }
    return result
}

//function to remove an element from an array
function removeElementFromArray(arr, elem) {
    let index = arr.indexOf(elem)
    if (index > -1) {
        arr.splice(index, 1)
    }
}

function returnAllButton(idsuffix) {
    const d = document.createElement("div")
    d.classList.add("filter-item-container")
    d.setAttribute("selected", "true")
    d.id = "All-" + idsuffix

    const a = document.createElement("div")
    a.classList.add("filter-item-text")
    a.innerHTML = "All"

    d.appendChild(a)

    return d
}