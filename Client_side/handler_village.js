// this file handles the first base functions of the game

import "./helper_village/helper.js"


// a function to set the handlers for the game
function setHandlers(){
    let t = document.getElementById("townhall");
    t.addEventListener("click", townhallClick);
    let r = document.getElementById("rockmine");
    r.addEventListener("click", rockmineClick);
    
}

// a function to handle the townhall click
function townhallClick(event){
    // get the info div
    let info = document.getElementById("info");
    let background = document.getElementById("background");
    background.style.backgroundColor = "lightblue";
    // write a temporary message
    info.innerHTML = "Loading...";
    // call the getData function to get the townhall data
    let data = getData("townhall");
    // call the getData function to get the player data
    let player = getData("player");
    delete player["name"]; 
    let text = Object.assign(data, player);
    // set the info div to the data
    info.innerHTML = printData(text);
}

// a function to handle the rockmine click
function rockmineClick(event){
    // get the info div
    let info = document.getElementById("info");
    let background = document.getElementById("background");
    background.style.backgroundColor = "grey";
    // write a temporary message
    info.innerHTML = "Loading...";
    // call the getData function to get the townhall data
    let data = getData("rockmine");
    // call the getData function to get the player data
    let player = getData("player");
    delete player["name"];
    delete player["gold"];
    delete player["wood"];
    delete player["food"];
    let text = Object.assign(data, player);
    // set the info div to the data
    info.innerHTML = printData(text);
}