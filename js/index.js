document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Loaded :)")
    renderMonsters()
    forwardButton().addEventListener('click', forwardButtonHandler)
    backButton().addEventListener('click', backButtonHandler)
    getForm().addEventListener('submit', submitNewMonster)
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
    
    monsterCard.dataset.id = monster.id
    monsterCard.addEventListener("click", deleteMonster)
}

function getForm(){
    return document.getElementById("monster-form")
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


function backButtonHandler(e){
    location.reload()
    fetch("http://localhost:3000/monsters/?_limit=50&_page=1")
    .then(response => response.json()) 
    .then(monsterArray => { 
        monsterArray.forEach(mons => buildMonsterCards(mons) )
    })

}

function submitNewMonster(event) {
    event.preventDefault()
    // console.log('Submit Button clicked!')
    let newName = event.target.name.value
    let newAge = event.target.age.value
    let newDesc = event.target.description.value

    let newMonster = {name: newName, age: newAge, description: newDesc}
    fetch("http://localhost:3000/monsters/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMonster)
        }).then(response => response.json())
        .then(newMonster => buildMonsterCards(newMonster))
    
    
}

function deleteMonster(){
    monsterId = event.currentTarget.dataset.id
    fetch("http://localhost:3000/monsters/" + monsterId, {
      method: 'DELETE',
    }).then(response => response.json()).then(json => console.log(json))
    event.currentTarget.remove()
}



// Above your list of monsters, you should have a form to create a new monster. 
//You should have fields for name, age, and description, and a 'Create Monster Button'. 

