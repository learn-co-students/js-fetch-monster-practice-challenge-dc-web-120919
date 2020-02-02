document.addEventListener("DOMContentLoaded",function(){
    console.log("connected")
    getForm().addEventListener('submit',newMosterHandler)
    renderAllMonsters()
    forwardButton().addEventListener('click', forwardButtonHandler)
    backButton().addEventListener('click', backButtonHandler)
})

function getForm(){
 return document.getElementById("monster-form")

}
function newMosterHandler(event){
    event.preventDefault()
    // console.log('you clicked me')
    let newName= event.target.name.value
    let newAge =event.target.age.value
    let newDesc =event.target.description.value
    let newMonster = {name: newName,age: newAge, description: newDesc}
    fetch("http://localhost:3000/monsters/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMonster)
        }).then(response => response.json())
        .then(newMonster => buildMonsterDisplay(newMonster))

}
function backButton(){
    return document.getElementById("back")
   
   }
   function forwardButton(){
    return document.getElementById("forward")
   
   }


function renderAllMonsters(){
    fetch("http://localhost:3000/monsters?_limit=50&_page=1")
    .then(response => response.json())
    .then(monsterArray =>{
        monsterArray.forEach(monster =>buildMonsterDisplay(monster))
})
}

function buildMonsterDisplay(monster){
    let container = document.getElementById("monster-container")
    let monsterDisplay = document.createElement("div")
    monsterDisplay.classList += "monster-class"
    
    let monsterName = document.createElement('h2')
    monsterName.className = "name"
    monsterName .innerText = monster.name

    let monsterAge = document.createElement('h4')
    monsterAge.className = "age"
    monsterAge .innerText = `Age: ${monster.age}`

    let monsterDesc = document.createElement('p')
    monsterDesc.className = "age"
    monsterDesc.innerText = `Bio: ${monster.description}`


    container.appendChild(monsterDisplay)
    monsterDisplay.appendChild(monsterName)
    monsterDisplay.appendChild(monsterAge)
    monsterDisplay.appendChild(monsterDesc)
    monsterDisplay.dataset.id = monster.id
    monsterDisplay.addEventListener('click',deleteMonster)
   
    
}
function backButtonHandler(event){
    fetch("http://localhost:3000/monsters/?_limit=50&_page=1")
    .then(response => response.json()) 
    .then(monsterArray => { 
        monsterArray.forEach(monster =>buildMonsterDisplay(monster))
    })
 

}
function forwardButtonHandler(event){
    fetch("http://localhost:3000/monsters/?_limit=50&_page=3")
    .then(response => response.json()) 
    .then(monsterArray => { 
        monsterArray.forEach(monster =>buildMonsterDisplay(monster))
    })
}


function deleteMonster(){
    monsterId = event.currentTarget.dataset.id
    fetch("http://localhost:3000/monsters/" + monsterId, {
      method: 'DELETE',
    }).then(response => response.json())
      .then(json => console.log(json))
      event.currentTarget.remove()
    
}




