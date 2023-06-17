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

    // cheat handler
    let key = document.getElementById("cheat_key");
    let cheat = document.getElementById("cheat");
    cheat.addEventListener("click", function(event){
        sendData("cleancache", key.value);
    });
}

function warmapClick(event){
    window.location.href = "Map.html";
}

function addPopulation(event){
    // checks if the local storage has the resources data
    if(localStorage.getItem("player") != null){
        localStorage.removeItem("player");    // removes the local data
    }
    // send update to the server
    sendData("addPopulation");
    townhallClick();
}

function upgradeTownhall(event){
    // checks if the local storage has the resources data
    if(localStorage.getItem("player") != null){
        localStorage.removeItem("player");    // removes the local data
    }
    if(localStorage.getItem("townhall") != null){
        localStorage.removeItem("townhall");    // removes the local data
    }
    // send update to the server
    sendData("upgradeTownhall");
    townhallClick();
}

// a function to handle the townhall click
function townhallClick(event){
    // empties the buttons div
    let buttons = document.getElementById("buttons");
    buttons.innerHTML = "";
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

    //spawn a button inside the buttons div
    let pop = document.createElement("button");
    pop.innerHTML = "Add Population + 1 [10 food]";
    pop.classList.add("button");
    pop.addEventListener("click", addPopulation);
    buttons.appendChild(pop);
    let upgrade = document.createElement("button");
    upgrade.innerHTML = "Upgrade Townhall [100 iron, 100 wood, 100 rock]";
    upgrade.addEventListener("click", upgradeTownhall);
    upgrade.classList.add("button");
    buttons.appendChild(upgrade);


}

// a function to handle the rockmine click
function rockmineClick(event){
    // empties the buttons div
    let buttons = document.getElementById("buttons");
    buttons.innerHTML = "";
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
    // empties the buttons div
    let buttons = document.getElementById("buttons");
    buttons.innerHTML = "";
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
