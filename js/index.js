document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Loaded :)")
    renderMonsters()
    forwardButton().addEventListener('click', forwardButtonHandler)
    backButton().addEventListener('click', backButtonHandler)
    
})

function renderMonsters(){
    fetch("http://localhost:3000/monsters/?_limit=50&_page=1")
    .then(response => response.json()) 
    .then(monsterArray => { 
        monsterArray.forEach(mons => buildMonsterCards(mons) )
    })
}

function buildMonsterCards(monster) {
    let monsterContainer = document.getElementById("monster-container")
    let monsterCard = document.createElement('div')
    monsterCard.classList += "monster-card"

    let monsterName = document.createElement('div')
    monsterName.className = "name"
    monsterName.innerText = monster.name
    monsterCard.appendChild(monsterName)

    let monsterAge = document.createElement('div')
    monsterAge.className = "age"
    monsterAge.innerText = monster.age 
    monsterCard.appendChild(monsterAge)

    let monsterDesc = document.createElement('div')
    monsterDesc.className = "description"
    monsterDesc.innerText = monster.description
    monsterCard.appendChild(monsterDesc) 

    monsterContainer.appendChild(monsterCard)
    
}

function backButton(){
    return document.getElementById("back")
}

function forwardButton(){
    return document.getElementById("forward")
}


function forwardButtonHandler(e){
    console.log("I'm clicked!")
    fetch("http://localhost:3000/monsters/?_limit=50&_page=3")
    .then(response => response.json()) 
    .then(monsterArray => { 
        monsterArray.forEach(mons => buildMonsterCards(mons) )
    })

}

function forwardButtonHandler(e){
    console.log("I'm clicked!")
    fetch("http://localhost:3000/monsters/?_limit=50&_page=3")
    .then(response => response.json()) 
    .then(monsterArray => { 
        monsterArray.forEach(mons => buildMonsterCards(mons) )
    })

}

function backButtonHandler(e){
    location.reload()
    fetch("http://localhost:3000/monsters/?_limit=50&_page=1")
    .then(response => response.json()) 
    .then(monsterArray => { 
        monsterArray.forEach(mons => buildMonsterCards(mons) )
    })

}






// Above your list of monsters, you should have a form to create a new monster. 
//You should have fields for name, age, and description, and a 'Create Monster Button'. 

