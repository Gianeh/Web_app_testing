import { pickRecords, printData, getData, sendData, getLocalData, getDataWithParametr } from "../helper.js";
import { PlayerFocus, setHandlers } from "./handlers.js";
//use only getLocalData to get info

export function onLoad() {
  let table = document.getElementById("WarMap");
  let playerpos = getLocalData("player", "map");    // search in local cache player data
  playerpos = pickRecords(playerpos, ["x", "y"]);
  console.log(playerpos["x"], playerpos["y"]);

  let enemypos = getDataWithParametr("player", "x<10 AND y<10", "x, y")      // search in local cache enemy data
  console.log(enemypos);

  for (var i = 0; i < 100; i++) {
    var row = table.insertRow();
    for (var j = 0; j < 100; j++) {
      var cell = row.insertCell();
      cell.innerHTML = "m";
      cell.classList.add("square");

      if (i == playerpos["x"] && j == playerpos["y"]) {
        cell.innerHTML = "P";                   // Set cell content to "P"
        cell.classList.remove("square");        // Remove square class
        cell.classList.add("playerVillage");    // Add player-village class
        cell.id = "playerVillage";              // Set the id of the cell to "player-village"
      }
    }
  }
  PlayerFocus();
  setHandlers();
}


