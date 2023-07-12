import { pickRecords, printData, getLocalData, sendData, parseRequirements } from "../helper.js";
var upgrade_id = 0;

// a function to handle the woodchopper click
export function woodchopperClick(event) {
    // reset the upgrade span updater
    if(upgrade_id != 0) clearInterval(upgrade_id);
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
    // reset the upgrade span updater
    if(upgrade_id != 0) clearInterval(upgrade_id);
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
    // reset the upgrade span updater
    if(upgrade_id != 0) clearInterval(upgrade_id);
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
    // reset the upgrade span updater
    if(upgrade_id != 0) clearInterval(upgrade_id);
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
    // reset the upgrade span updater
    if(upgrade_id != 0) clearInterval(upgrade_id);
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

    //spawn a button inside the buttons div
    let infantry = document.createElement("button");
    infantry.innerHTML = "Train Infantry" + parseRequirements("infantry_training");
    infantry.classList.add("button");
    infantry.addEventListener("click", trainInfantry);
    buttons.appendChild(infantry);
    let archer = document.createElement("button");
    archer.innerHTML = "Train Archer" + parseRequirements("archer_training");
    archer.classList.add("button");
    archer.addEventListener("click", trainArcher);
    buttons.appendChild(archer);
    let cavalry = document.createElement("button");
    cavalry.innerHTML = "Train Cavalry" + parseRequirements("cavalry_training");
    cavalry.classList.add("button");
    cavalry.addEventListener("click", trainCavalry);
    buttons.appendChild(cavalry);
    let upgrade = document.createElement("button");
    upgrade.innerHTML = "Upgrade Barracks " + parseRequirements("barracks_upgrade", (parseInt(data["level"])+1).toString());
    upgrade.addEventListener("click", upgradeBarracks);
    upgrade.classList.add("button");
    buttons.appendChild(upgrade);

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
    pop.innerHTML = "Add Population + 1 " + parseRequirements("add_population");
    pop.classList.add("button");
    pop.addEventListener("click", addPopulation);
    buttons.appendChild(pop);
    let upgrade = document.createElement("button");
    upgrade.innerHTML = "Upgrade Townhall " + parseRequirements("townhall_upgrade", (parseInt(data["level"])+1).toString());
    upgrade.addEventListener("click", upgradeTownhall);
    upgrade.classList.add("button");
    buttons.appendChild(upgrade);

    // retieve the upgrade data from starage and append remaining time to upgrade span
    upgrade_id = setInterval(function(){ setUpgradeSpan("townhall_upgrade"); }, 999);

}

export function warmapClick(event) {
    window.location.href = "Map.html";
}

// ADD POPULATION FUNCTION -> TOWNHALL ONLY:

function addPopulation(event) {
    // checks if the local storage has the resources data
    if (localStorage.getItem("player") != null) {
        localStorage.removeItem("player");    // removes the local data
    }
    // send update to the server
    sendData("addPopulation");
    townhallClick();
}

// UPGRADE STRUCTURES FUNCTIONS:

// handles the upgrade click on townhall
function upgradeTownhall(event) {
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


// handle the upgrade click on barracks
function upgradeBarracks(event) {
    // checks if the local storage has the resources data
    if (localStorage.getItem("player") != null) {
        localStorage.removeItem("player");    // removes the local data
    }
    if (localStorage.getItem("barracks") != null) {
        localStorage.removeItem("barracks");    // removes the local data
    }
    // send update to the server
    sendData("upgradeBarracks");
    // remove data from local storage relative to barracks_upgrade
    localStorage.removeItem("barracks_upgrade");
    barracksClick();
}



// TRAIN TROOPS FUNCTIONS:
function trainInfantry(event) {
    // checks if the local storage has the resources data
    if (localStorage.getItem("player") != null) {
        localStorage.removeItem("player");    // removes the local data
    }
    // send update to the server
    sendData("trainInfantry");
    barracksClick();
}

// VARIOUS SCOPE SPECIFIC HELPER FUNCTIONS:

function setInfoDiv(color){
    // empties the buttons div
    let buttons = document.getElementById("buttons");
    buttons.innerHTML = "";
    // empties the upgrade span
    let upgradeSpan = document.getElementById("upgrade");
    upgradeSpan.innerHTML = "";
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

// a function that every 5 seconds call the sendData function to trigger a cache update