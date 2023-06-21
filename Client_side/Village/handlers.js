import { pickRecords, printData, getLocalData, sendData } from "../helper.js";

// a function to handle the woodchopper click
export function woodchopperClick(event) {
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
    let data = getLocalData("rockmine", "village");
    delete data["cached"];
    // call the getData function to get the player data
    let player = getLocalData("player", "village");
    pickRecords(player, ["rock"]);
    let text = Object.assign(data, player);
    // set the info div to the data
    info.innerHTML = printData(text);
}

// a function to handle the townhall click
export function townhallClick(event) {
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
    townhallClick();
}
