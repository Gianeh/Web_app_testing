import { pickRecords, printData, getLocalData, sendData } from "../helper.js";

var upgrade_id = 0;

// a function to handle the woodchopper click
export function woodchopperClick(event) {
    let info = setInfoDiv("brown");
    // call the getData function to get the woodchopper data
    let data = getLocalData("woodchopper", "village");
    delete data["cached"];
    // call the getData function to get the player data
    let player = getLocalData("player", "village");
    pickRecords(player, ["wood"]);
    let text = Object.assign(data, player);
    // set the info div to the data
    info.innerHTML = printData(text);
}

// a function to handle the rockmine click
export function rockmineClick(event) {
    let info = setInfoDiv("grey");
    // call the getData function to get the rockmine data
    let data = getLocalData("rockmine", "village");
    delete data["cached"];
    // call the getData function to get the player data
    let player = getLocalData("player", "village");
    pickRecords(player, ["rock"]);
    let text = Object.assign(data, player);
    // set the info div to the data
    info.innerHTML = printData(text);
}

// a function to handle the ironmine click
export function ironmineClick(event) {
    let info = setInfoDiv("silver");
    // call the getData function to get the ironmine data
    let data = getLocalData("ironmine", "village");
    delete data["cached"];
    // call the getData function to get the player data
    let player = getLocalData("player", "village");
    pickRecords(player, ["iron"]);
    let text = Object.assign(data, player);
    // set the info div to the data
    info.innerHTML = printData(text);
}

// a function to handle the farm click
export function farmClick(event) {
    let info = setInfoDiv("yellow");
    // call the getData function to get the farm data
    let data = getLocalData("farm", "village");
    delete data["cached"];
    // call the getData function to get the player data
    let player = getLocalData("player", "village");
    pickRecords(player, ["food"]);
    let text = Object.assign(data, player);
    // set the info div to the data
    info.innerHTML = printData(text);
}

// a function to handle the barracks click
export function barracksClick(event) {
    let info = setInfoDiv("red");
    // call the getData function to get the barracks data
    let data = getLocalData("barracks", "village");
    delete data["cached"];
    // call the getData function to get the player data
    let player = getLocalData("player", "village");
    pickRecords(player, ["infantry", "archer", "cavalry"]);
    let text = Object.assign(data, player);
    // set the info div to the data
    info.innerHTML = printData(text);
}

// a function to handle the townhall click
export function townhallClick(event) {
    // reset the upgrade span updater
    if(upgrade_id != 0) clearInterval(upgrade_id);
    // get the buttons div
    let info = setInfoDiv("lightblue");
    // call the getData function to get the townhall data
    let data = getLocalData("townhall", "village");
    delete data["cached"];
    // call the getData function to get the player data
    let player = getLocalData("player", "village");
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

    // retieve the upgrade data from starage and append remaining time to upgrade span
    upgrade_id = setInterval(function(){ setUpgradeSpan("townhall_upgrade"); }, 999);

}

export function warmapClick(event) {
    window.location.href = "Map.html";
}

export function addPopulation(event) {
    // checks if the local storage has the resources data
    if (localStorage.getItem("player") != null) {
        localStorage.removeItem("player");    // removes the local data
    }
    // send update to the server
    sendData("addPopulation");
    townhallClick();
}

export function upgradeTownhall(event) {
    // checks if the local storage has the resources data
    if (localStorage.getItem("player") != null) {
        localStorage.removeItem("player");    // removes the local data
    }
    if (localStorage.getItem("townhall") != null) {
        localStorage.removeItem("townhall");    // removes the local data
    }
    // send update to the server
    sendData("upgradeTownhall");
    // remove data from local storage relative to townhall_upgrade
    localStorage.removeItem("townhall_upgrade");
    townhallClick();
}


function setInfoDiv(color){
    // empties the buttons div
    let buttons = document.getElementById("buttons");
    buttons.innerHTML = "";
    // get the info div
    let info = document.getElementById("info");
    // empties the info div
    info.innerHTML = "";
    // set the background color
    let background = document.getElementById("background");
    background.style.backgroundColor = color;
    // write a temporary message
    info.innerHTML = "Loading...";
    return info;
}

function setUpgradeSpan($upgrade){
    let upgradeData = getLocalData($upgrade, "village");
    let upgradeSpan = document.getElementById("upgrade");
    if (upgradeData["status"] != "success"){
        upgradeSpan.innerHTML = "Structure is not being upgraded";
    }else{
        upgradeSpan.innerHTML = "remaining time: " + upgradeData["remaining_time"];
    }
}

export function updateUpgrades(){
    for(let key in localStorage){
        if(key.includes("upgrade") && JSON.parse(localStorage[key])["status"] == "success"){
            let upgrade = JSON.parse(localStorage[key]);
            upgrade["remaining_time"] -= 1;
            localStorage[key] = JSON.stringify(upgrade);

            // if the remaining time is 0, call the backend check function
        }
        // if the remaining time is 0, call the backend check function
        // to be implemented
    }
}