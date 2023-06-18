import { pickRecords, printData, getData, sendData, getLocalData } from "../helper.js";

//use only getLocalData to get info

export function onLoad() {
  let table = document.getElementById("WarMap");

  let playerpos = getLocalData("player", "map"); // search in local cache player data
  playerpos = pickRecords(playerpos,["x","y"]);
 // console.log(playerpos,["x","y"]);

  for (var i = 0; i < 90; i++) {  
    var row = table.insertRow();
    for (var j = 0; j < 90; j++) {
      var cell = row.insertCell();
      cell.innerHTML = "m";
      cell.classList.add("square");

      if (i === playerpos["x"] && j === playerpos["y"]) {
        cell.innerHTML = "P";                   // Set cell content to "P"
        cell.classList.remove("square");        // Remove square class
        cell.classList.add("playerVillage");    // Add player-village class
        cell.id = "playerVillage";              // Set the id of the cell to "player-village"
      }
    }
  }
  setHandlers();
}


 function Player_Focus() {

  let tableContainer = document.querySelector(".table-container");
  let playerCell = document.getElementById("playerVillage");

  // calcultate the offset of the player cell
  let offsetTop = playerCell.offsetTop - (tableContainer.offsetHeight / 2) + (playerCell.offsetHeight / 2);
  let offsetLeft = playerCell.offsetLeft - (tableContainer.offsetWidth / 2) + (playerCell.offsetWidth / 2);

  // apply the offset to the container
  tableContainer.scrollTop = offsetTop;
  tableContainer.scrollLeft = offsetLeft;
}

function setHandlers() {
  document.addEventListener("DOMContentLoaded", Player_Focus());
}