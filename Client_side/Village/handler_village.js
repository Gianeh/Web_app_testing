// this file handles the first base functions of the Viallage page

import { sendData, logout } from "../helper.js";
import { townhallClick, rockmineClick, woodchopperClick, warmapClick } from "./handlers.js";
import { showCheats, hideCheats } from "./shortcuts.js";
// a function to set the handlers for the game

export function onLoad() {

    // this is the base graphics of the village for now
    let table = document.getElementById("Village");
    for (let i = 0; i < 30; i++) {
        let row = table.insertRow();
        for (let j = 0; j < 30; j++) {
            let cell = row.insertCell();

            if (i == 15 && j == 15) {
                cell.id = "townhall";
                cell.classList.add("townhall");
                cell.innerHTML = "T";
                continue;
            } else if (i == 12 && j == 9) {
                cell.id = "rockmine";
                cell.classList.add("rockmine");
                cell.innerHTML = "R";
                continue;
            } else if (i == 19 && j == 22) {
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


function handleKeyPress(event) {
    if (event.key === "j" && document.getElementById("cheat_section").style.display === "none") {
        showCheats();
    }else if(event.key === "j" && document.getElementById("cheat_section").style.display !== "none"){
        hideCheats();
    }
    if(event.key === "t") townhallClick();
    if(event.key === "r") rockmineClick();
    if(event.key === "w") woodchopperClick();
    if(event.key === "m") warmapClick();
}


function setHandlers() {
    // set listeners for the structures
    let t = document.getElementById("townhall");
    t.addEventListener("click", townhallClick);
    let r = document.getElementById("rockmine");
    r.addEventListener("click", rockmineClick);
    let w = document.getElementById("woodchopper");
    w.addEventListener("click", woodchopperClick);

    // set listeners for the buttons
    let b = document.getElementById("warmap");
    b.addEventListener("click", warmapClick);
    let l = document.getElementById("logout");
    l.addEventListener("click", logout);

    // set listener for the key shortcuts
    document.addEventListener("keydown", handleKeyPress);

    // set listener for the cheat buttons and key value
    let key = document.getElementById("cheat_key");

    let cheat = document.getElementById("cache");
    cheat.addEventListener("click", function () {
        sendData("cleancache", key.value);
        // refresh the page
        location.reload();
    });

    cheat = document.getElementById("ninjalui");
    cheat.addEventListener("click", function () {
        sendData("ninjalui", key.value);
        // destroy local storage
        localStorage.clear();
        townhallClick();
    });

    // clear local storage on unload
    window.addEventListener("beforeunload", function () {
        // empties the local storage
        localStorage.clear();
    });
}