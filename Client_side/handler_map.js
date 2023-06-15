import { pickRecords, printData, getData } from "./helper.js";


export function onLoad() {
  var table = document.getElementById("WarMap");

  let playerpos = getData("player", "../Server_side/Map/handler_map.php");
  playerpos = pickRecords(playerpos,["x","y"]);
  console.log(playerpos);
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

  var tableContainer = document.querySelector(".table-container");
  var playerCell = document.getElementById("playerVillage");

  // calcultate the offset of the player cell
  var offsetTop = playerCell.offsetTop - (tableContainer.offsetHeight / 2) + (playerCell.offsetHeight / 2);
  var offsetLeft = playerCell.offsetLeft - (tableContainer.offsetWidth / 2) + (playerCell.offsetWidth / 2);

  // apply the offset to the container
  tableContainer.scrollTop = offsetTop;
  tableContainer.scrollLeft = offsetLeft;
}

function setHandlers() {
  document.addEventListener("DOMContentLoaded", Player_Focus());
}