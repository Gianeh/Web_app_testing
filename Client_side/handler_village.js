// this file handles the first base functions of the Viallage page

import {pickRecords, printData, getLocalData, sendData} from "./helper.js";
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

    // a refresh handling
    window.addEventListener("beforeunload", function(){
        // empties the local storage
        localStorage.clear();
    });
}

function warmapClick(event){
    window.location.href = "Map.html";
}

function addPopulation(event){
    // checks if the local storage has the townhall data
    if(localStorage.getItem("player") != null){
        localStorage.removeItem("player");    // removes the local data
    }
    // send update to the server
    sendData("player", "population", 5, "add");
    townhallClick();
    // 
}

// a function to handle the townhall click
function townhallClick(event){
    // get the info div
    let info = document.getElementById("info");
    // empties the info div
    info.innerHTML = "";
    // set the background color
    let background = document.getElementById("background");
    background.style.backgroundColor = "lightblue";
    // write a temporary message
    info.innerHTML = "Loading...";
    // call the getData function to get the townhall data
    let data = getLocalData("townhall");
    delete data["cached"];
    // call the getData function to get the player data
    let player = getLocalData("player");
    pickRecords(player, ["population", "iron", "wood", "food", "rock"]);
    let text = Object.assign(data, player);
    // set the info div to the data
    info.innerHTML = printData(text);

    //spawn a button inside the info div
    let button = document.createElement("button");
    button.innerHTML = "Add Population +5";
    button.addEventListener("click", addPopulation);
    info.appendChild(button);

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
    let data = getLocalData("rockmine");
    delete data["cached"];
    // call the getData function to get the player data
    let player = getLocalData("player");
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
    let data = getLocalData("woodchopper");
    delete data["cached"];
    // call the getData function to get the player data
    let player = getLocalData("player");
    pickRecords(player, ["wood"]);
    let text = Object.assign(data, player);
    // set the info div to the data
    info.innerHTML = printData(text);
}
