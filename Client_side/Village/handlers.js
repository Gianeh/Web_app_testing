import { pickRecords, printData, getLocalData, sendData, checkEvents, parseRequirements } from "../helper.js";
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

    //spawn a button inside the buttons div
    let upgrade = document.createElement("button");
    upgrade.innerHTML = "Upgrade Woodchopper " + parseRequirements("woodchopper_upgrade", (parseInt(data["level"])+1).toString());
    upgrade.addEventListener("click", upgradeWoodchopper);
    upgrade.classList.add("button");
    buttons.appendChild(upgrade);

    // retieve the upgrade data from storage and append remaining time to upgrade span
    upgrade_id = setInterval(function(){ setUpgradeSpan("woodchopper_upgrade"); }, 1000);
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

    //spawn a button inside the buttons div
    let upgrade = document.createElement("button");
    upgrade.innerHTML = "Upgrade Rockmine " + parseRequirements("rockmine_upgrade", (parseInt(data["level"])+1).toString());
    upgrade.addEventListener("click", upgradeRockmine);
    upgrade.classList.add("button");
    buttons.appendChild(upgrade);

    // retieve the upgrade data from storage and append remaining time to upgrade span
    upgrade_id = setInterval(function(){ setUpgradeSpan("rockmine_upgrade"); }, 1000);
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

    //spawn a button inside the buttons div
    let upgrade = document.createElement("button");
    upgrade.innerHTML = "Upgrade Ironmine " + parseRequirements("ironmine_upgrade", (parseInt(data["level"])+1).toString());
    upgrade.addEventListener("click", upgradeIronmine);
    upgrade.classList.add("button");
    buttons.appendChild(upgrade);

    // retieve the upgrade data from storage and append remaining time to upgrade span
    upgrade_id = setInterval(function(){ setUpgradeSpan("ironmine_upgrade"); }, 1000);
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

    //spawn a button inside the buttons div
    let upgrade = document.createElement("button");
    upgrade.innerHTML = "Upgrade Farm " + parseRequirements("farm_upgrade", (parseInt(data["level"])+1).toString());
    upgrade.addEventListener("click", upgradeFarm);
    upgrade.classList.add("button");
    buttons.appendChild(upgrade);

    // retieve the upgrade data from starage and append remaining time to upgrade span
    upgrade_id = setInterval(function(){ setUpgradeSpan("farm_upgrade"); }, 1000);
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

    //spawn buttons inside the buttons div
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

    // retieve the upgrade data from storage and append remaining time to upgrade span
    upgrade_id = setInterval(function(){ setUpgradeSpan("barracks_upgrade"); }, 1000);

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

    // retieve the upgrade data from storage and append remaining time to upgrade span
    upgrade_id = setInterval(function(){ setUpgradeSpan("townhall_upgrade"); }, 1000);

}

export function warmapClick(event) {
    window.location.href = "Map.html";
    localStorage.clear();
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

function upgradeTownhall(event) {
    // checks if the local storage has the resources data
    if (localStorage.getItem("player") != null) {
        localStorage.removeItem("player");    // removes the local data
    }
    if (localStorage.getItem("townhall") != null) {
        localStorage.removeItem("townhall");    // removes the local data
    }
    // ceck if the local storage has the townhall_upgrade data
    if (localStorage.getItem("townhall_upgrade") != null) {
        localStorage.removeItem("townhall_upgrade");    // removes the local data
    }
    // send update to the server
    sendData("upgradeTownhall");
    // remove data from local storage relative to townhall_upgrade
    localStorage.removeItem("townhall_upgrade");
    townhallClick();
}

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

function upgradeWoodchopper(event) {
    // checks if the local storage has the resources data
    if (localStorage.getItem("player") != null) {
        localStorage.removeItem("player");    // removes the local data
    }
    if (localStorage.getItem("woodchopper") != null) {
        localStorage.removeItem("woodchopper");    // removes the local data
    }
    // send update to the server
    sendData("upgradeWoodchopper");
    // remove data from local storage relative to woodchopper_upgrade
    localStorage.removeItem("woodchopper_upgrade");
    woodchopperClick();
}

function upgradeRockmine(event) {
    // checks if the local storage has the resources data
    if (localStorage.getItem("player") != null) {
        localStorage.removeItem("player");    // removes the local data
    }
    if (localStorage.getItem("rockmine") != null) {
        localStorage.removeItem("rockmine");    // removes the local data
    }
    // send update to the server
    sendData("upgradeRockmine");
    // remove data from local storage relative to rockmine_upgrade
    localStorage.removeItem("rockmine_upgrade");
    rockmineClick();
}

function upgradeIronmine(event) {
    // checks if the local storage has the resources data
    if (localStorage.getItem("player") != null) {
        localStorage.removeItem("player");    // removes the local data
    }
    if (localStorage.getItem("ironmine") != null) {
        localStorage.removeItem("ironmine");    // removes the local data
    }
    // send update to the server
    sendData("upgradeIronmine");
    // remove data from local storage relative to ironmine_upgrade
    localStorage.removeItem("ironmine_upgrade");
    ironmineClick();
}

function upgradeFarm(event) {
    // checks if the local storage has the resources data
    if (localStorage.getItem("player") != null) {
        localStorage.removeItem("player");    // removes the local data
    }if (localStorage.getItem("farm") != null) {
        localStorage.removeItem("farm");    // removes the local data
    }
    // send update to the server
    sendData("upgradeFarm");
    // remove data from local storage relative to farm_upgrade
    localStorage.removeItem("farm_upgrade");
    farmClick();
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

function trainArcher(event) {
    // checks if the local storage has the resources data
    if (localStorage.getItem("player") != null) {
        localStorage.removeItem("player");    // removes the local data
    }
    // send update to the server
    sendData("trainArcher");
    barracksClick();
}

function trainCavalry(event) {
    // checks if the local storage has the resources data
    if (localStorage.getItem("player") != null) {
        localStorage.removeItem("player");    // removes the local data
    }
    // send update to the server
    sendData("trainCavalry");
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
    if (upgradeData["status"] == "no data found"){
        upgradeSpan.innerHTML = "Structure is not being upgraded";
    }else if(upgradeData["status"] == "success"){
        upgradeSpan.innerHTML = "remaining time: " + upgradeData["remaining_time"];
    }else{
        // something went wrong
        upgradeSpan.innerHTML = "Something went wrong";
    }
}

export function updateUpgrades(){
    for(let key in localStorage){
        if(key.includes("upgrade") && JSON.parse(localStorage[key])["status"] == "success"){
            let upgrade = JSON.parse(localStorage[key]);
            upgrade["remaining_time"] -= 1;
            localStorage[key] = JSON.stringify(upgrade);

            // if the remaining time is 0, call the backend check function
            if(upgrade["remaining_time"] <= 0){
                let updated = checkEvents("checkEvents", "village").split(",");
                // check the updated data in order to recall the click function related and if needed retrieve the player data again
                for(let up in updated){
                    if(up == "townhall"){
                        localStorage.removeItem("townhall");
                        townhallClick();
                    }else if(up == "barracks"){
                        localStorage.removeItem("barracks");
                        barracksClick();
                    }else if(up == "woodchopper"){
                        localStorage.removeItem("woodchopper");
                        woodchopperClick();
                    }else if(up == "rockmine"){
                        localStorage.removeItem("rockmine");
                        rockmineClick();
                    }else if(up == "ironmine"){
                        localStorage.removeItem("ironmine");
                        ironmineClick();
                    }else if(up == "farm"){
                        localStorage.removeItem("farm");
                        farmClick();
                    }
                    // then check if data is related to the player - that is if it's a resource or a troop
                    else if(up == "iron" || up == "wood" || up == "rock" || up == "food" || up == "infantry" || up == "archer" || up == "cavalry"){
                        localStorage.removeItem("player");
                        townhallClick();
                    }
                }
            }
        }

    }
}
