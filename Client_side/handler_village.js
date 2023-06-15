// this file handles the first base functions of the game
/*
// a function that deletes records from a dictionary
function pickRecords(data, records){
    for (let key in data){
        if(!(records.includes(key))) delete data[key];
    }
    return data;
}

// a function that enumerates a data (dictionary) object
function printData(data){
    let text = "<h3>"+data["type"]+":</h3><br />";
    for (let key in data){
        if(key == "type") continue;
        text += key + ": " + data[key] + "<br />";
    }
    return text;
}

// a function to handle requests for a specific objects to the backend
function getData(dataName) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "Server_side/handler_village.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let output = "";
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log("Server returned: " + xhr.responseText);
        // decode the JSON response
        output = JSON.parse(xhr.responseText);

      } else {
        // Handle error
        console.log("Server returned error: " + xhr.status);
      }
    };
    xhr.onerror = function() {
        // Handle error
        console.log("Error occurred: " + xhr.status);
    };

    //let formData = new FormData();
    //formData.append("data", dataName);
    xhr.send("data=" + dataName);
    return output;
}
*/
import {pickRecords, printData, getData} from "./helper.js";
// a function to set the handlers for the game
export function setHandlers(){
    let t = document.getElementById("townhall");
    t.addEventListener("click", townhallClick);
    let r = document.getElementById("rockmine");
    r.addEventListener("click", rockmineClick);
    let w = document.getElementById("woodchopper");
    w.addEventListener("click", woodchopperClick);
}

var backend_path = "Server_side/Village/handler_village.php";

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
