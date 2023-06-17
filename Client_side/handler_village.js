// this file handles the first base functions of the Viallage page

import {pickRecords, printData, getData} from "./helper.js";
// a function to set the handlers for the game

export function onLoad(){
    let table = document.getElementById("Village");
    for (let i = 0; i < 30; i++) {
        let row = table.insertRow();
        for (let j = 0; j < 30; j++) {
            let cell = row.insertCell();
            
            if(i == 15 && j == 15){
                cell.id = "townhall";
                cell.classList.add("townhall");
                cell.innerHTML = "T";
                continue;
            }else if(i == 12 && j == 9){
                cell.id = "rockmine";
                cell.classList.add("rockmine");
                cell.innerHTML = "R";
                continue;
            }else if(i == 19 && j == 22){
                cell.id = "woodchopper";
                cell.classList.add("woodchopper");
                cell.innerHTML = "W";
                continue;
            }
            cell.innerHTML = "e";
            cell.classList.add("square");
        }
    }
    setHandlers();
}

function setHandlers(){
    let t = document.getElementById("townhall");
    t.addEventListener("click", townhallClick);
    let r = document.getElementById("rockmine");
    r.addEventListener("click", rockmineClick);
    let w = document.getElementById("woodchopper");
    w.addEventListener("click", woodchopperClick);

    let b = document.getElementById("warmap");
    b.addEventListener("click", warmapClick);
}

function warmapClick(event){
    window.location.href = "Map.html";
}

var backend_path = "../Server_side/Village/handler_village.php";

var player = getData("player",backend_path);
console.log(player);

// a function to handle the townhall click
function townhallClick(event){
    // get the info div
    let info = document.getElementById("info");
    let background = document.getElementById("background");
    background.style.backgroundColor = "lightblue";
    // write a temporary message
    info.innerHTML = "Loading...";
    // call the getData function to get the townhall data
    let data = getData("townhall",backend_path);
    // call the getData function to get the player data
    let player = getData("player",backend_path);
    pickRecords(player, ["population", "iron", "wood", "food", "rock"]);
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
    let data = getData("rockmine",backend_path);
    // call the getData function to get the player data
    let player = getData("player",backend_path);
    pickRecords(player, ["rock"]);
    let text = Object.assign(data, player);
    // set the info div to the data
    info.innerHTML = printData(text);
}

// a function to handle the woodchopper click
function woodchopperClick(event){
    // get the info div
    let info = document.getElementById("info");
    let background = document.getElementById("background");
    background.style.backgroundColor = "brown";
    // write a temporary message
    info.innerHTML = "Loading...";
    // call the getData function to get the townhall data
    let data = getData("woodchopper",backend_path);
    // call the getData function to get the player data
    let player = getData("player",backend_path);
    pickRecords(player, ["wood"]);
    let text = Object.assign(data, player);
    // set the info div to the data
    info.innerHTML = printData(text);
}
