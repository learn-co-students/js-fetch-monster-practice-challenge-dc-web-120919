document.addEventListener("DOMContentLoaded", ()=>{ 
    
    renderMonsters()
    let fowardBtn = document.getElementById('forward')
    let backBtn = document.getElementById('back')
    fowardBtn.addEventListener('click', newMonsters)
    // backBtn.addEventListener('click',oldMonsters)
   newMonster().addEventListener('submit', monsterForm)

})

 
 function renderMonsters () { 
     fetch ("http://localhost:3000/monsters/?_limit=50")
     .then  (respone => respone.json() )
     .then ( monstersArray => { 
         monstersArray.forEach(
             monster => makeMonster(monster)
         )

     })
     
 }
function newMonster() { 
   
    return document.querySelector('form')
}
 function makeMonster (monster) { 
     let container = document.getElementById("monster-container")
     let monsterCard = document.createElement('div')
     
     monsterCard.className = "card"
     container.appendChild(monsterCard)
    
     let monsterName = document.createElement('h2')
     monsterName.innerText = monster.name
     monsterCard.appendChild(monsterName)

     let monsterAge = document.createElement('div')
     monsterAge.innerText = `Age: ${monster.age}`
     monsterCard.appendChild(monsterAge)

     monsterDesc = document.createElement('p')
     monsterDesc.innerText = monster.description
     monsterCard.appendChild(monsterDesc)

     
 }
function monsterForm(event) { 
    event.preventDefault()
    let desc = document.getElementById("monsterDescForm")
    let newMonsterName = event.target.name.value
    let newMonsterAge = event.target.age.value 
    let newMonsterDesc = desc.value 
    let newMonster = {name: newMonsterName, age: newMonsterAge, description: newMonsterDesc}
     event.target.reset()
    fetch ('http://localhost:3000/monsters',{ 
     method: "POST", 
     headers: { 
        "Content-Type": "application/json"
       },
       body: JSON.stringify(newMonster)
    }).then(response => response.json() )
    .then(monster => makeMonster(monster)) 
}

 function newMonsters () { 
     window.location.reload()


 }