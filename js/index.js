console.log("connected to js")
let page = 1

document.addEventListener("DOMContentLoaded", ()=> {
    renderAllMonsters()
    formContainer().addEventListener("submit", renderForm)
    nextButton().addEventListener("click", showMoreMonsters)

})

// setting up containers
function monsterContainer(){
    return document.getElementById("monster-container")
}

function formContainer(){
    return document.querySelector("form")
}

function nextButton(){
    return document.getElementById("forward")
}


// fetching
function renderAllMonsters(){
    console.log("going to db")
    fetch("http://localhost:3000/monsters/?_limit=50&_page=1")
    .then(response => response.json())
   // .then(console.log)
    .then(monsters => {
        monsters.forEach(
            monster => buildMonsterCard(monster)
            )})
}

function renderForm(event){
    event.preventDefault()
    
    let newName = event.target.name.value
    let newAge = event.target.age.value
    let newDesc = event.target.description.value
    let formInfo = {name: newName, age: newAge, description: newDesc}

    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formInfo)
    })
    .then(response => response.json())
    .then(newMonster => buildMonsterCard(newMonster))
}

function buildMonsterCard(monster){
    console.log("building monsters")

    let monsterCard = document.createElement("div")
    monsterCard.className = "card"

    let monsterName = document.createElement("h3")
    monsterName.className = "name"
    monsterName.innerText = monster.name

    let monsterAge = document.createElement("p")
    monsterAge.className = "age"
    monsterAge.innerText = monster.age

    let monsterDescription = document.createElement("p")
    monsterDescription.className = "description"
    monsterDescription.innerText = monster.description

    monsterContainer().appendChild(monsterCard)
    monsterCard.appendChild(monsterName)
    monsterName.appendChild(monsterAge)
    monsterAge.appendChild(monsterDescription)
}

function showMoreMonsters(){
    fetch("http://localhost:3000/monsters/?_limit=50&_page=5")
    .then(response => response.json())
    .then(monsters => {
        monsters.forEach(
            monster => buildMonsterCard(monster)
            )})
}
