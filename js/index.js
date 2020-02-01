

document.addEventListener("DOMContentLoaded",(e) =>{

    console.log("connected");
    let page = 1;
    setPageNumber(page);
    let pageNumber = findPageNumber();

    fetchMonsters(pageNumber);
    //add button and form event listeners
    let forwardButton = getForwardButton();
    let backwardButton = getBackwardButton();
    forwardButton.addEventListener('click', (e) => pageTurner(e))
    backwardButton.addEventListener('click', (e) => pageTurner(e))
    let formSubmission = getFormSubmit();
    formSubmission.addEventListener('submit', (e) => formHandler(e));
    let randButton = randomButton();
    randButton.addEventListener('click', (e) => randomPage(e));

})

function fetchMonsters(page){
    eraseMonsters();
    let monsters = fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(result => result.json())
    .then(data => {
        console.log(`successful json for page ${page}`)
        data.forEach(monster => {
            renderMonster(monster);
        });
        setPageNumber(page);
    })
}

function getFormSubmit(){
    return document.querySelector('#create-monster form');
}

function formHandler(event){
    event.preventDefault();
    let formName = event.target.name.value;
    let formAge = parseInt(event.target.age.value, 10);
    let formDescription = event.target.description.value;
    let newMonster = {name: formName, age: formAge, description: formDescription};
    
    let newPost = fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }, 
        body: JSON.stringify(newMonster)
    }).then(response => response.json())
    .then(newMonster => {
        console.log(newMonster)
        alert(`${formName} has been recorded!`);
    });
}

function getForwardButton(){
    return document.getElementById('forward');
}

function getBackwardButton(){
    return document.getElementById('back');
}

function pageTurner(event){
    let currentPage = findPageNumber();
    
    if(event.target.id==="forward"){
        console.log(`You've turned the page forward`);
        eraseMonsters();
        setPageNumber(currentPage++);
        fetchMonsters(currentPage);
    }
    else if(event.target.id==="back"){
        if(currentPage === 1){alert(`You're at the beginning of the book!`)}
        else{
            console.log(`You've turned the page backward`);
            eraseMonsters();
            setPageNumber(currentPage--);
            fetchMonsters(currentPage);
        }
    }
}

function eraseMonsters(){
    //erases all current monsters before loading a page
    let monsterContainer = getMonsterContainer();
    while(monsterContainer.firstChild){
        monsterContainer.removeChild(monsterContainer.firstChild);
    }

}

function randomPage(event){
    event.preventDefault();
    console.log(event);
    let randPage = Math.floor((Math.random() * 20) + 1);
    fetchMonsters(randPage)
    alert(`You've turned to page ${randPage}!`);
}

function randomButton(){
    return document.getElementById('random-button');
}

function getPageNumberDiv(){
    return document.getElementById('page-number');
}

function setPageNumber(number){
    let pageNumDiv = getPageNumberDiv();
    pageNumDiv.dataset.id = number;
    return pageNumDiv;
}

function findPageNumber(){
    let pageNumDiv = getPageNumberDiv();
    return parseInt(pageNumDiv.dataset.id, 10);
}

function getMonsterContainer(){

    return document.getElementById('monster-container');
}


function renderMonster(monster){

    let monsterName = monster.name;
    let monsterAge = monster.age;
    let monsterID = monster.id;
    let monsterDesc = monster.description;

    //make monster elements 
    let monsterContainer = getMonsterContainer();
    let monsterDivider = document.createElement('div');
    monsterDivider.id = `${monsterName}-div`;
    monsterDivider.dataset.id = monsterID;

    let monsterNameHeader = document.createElement('h2');
    monsterNameHeader.id = `${monsterName}-name`;
    monsterNameHeader.innerText = monsterName;

    let monsterAgeSub = document.createElement('h3');
    monsterAgeSub.id = `${monsterName}-age`;
    monsterAgeSub.innerText = `Age: ${monsterAge}`;

    let monsterParagraph = document.createElement('p');
    monsterParagraph.id = `${monsterName}-desc`;
    monsterParagraph.innerText = monsterDesc;

    //attach monster elements to the parent container 
    monsterContainer.appendChild(monsterDivider);
    monsterContainer.appendChild(monsterNameHeader);
    monsterContainer.appendChild(monsterAgeSub);
    monsterContainer.appendChild(monsterParagraph);
}

