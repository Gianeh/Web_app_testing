import { pickRecords, printData, getData, sendData, getLocalData, getDataWithParameter } from "../helper.js";
import { PlayerFocus, setHandlers } from "./handlers.js";
//use only getLocalData to get info

export function onLoad() {
  let table = document.getElementById("WarMap");
  let player = getLocalData("player", "map");           // search in local cache player data
  player = pickRecords(player, ["username","x", "y"]);   // pick only username, x and y from player data
  
  let username = getLocalData("player", "map");
  username = pickRecords(username, ["username"]);     
  
  console.log("player position: " + player["x"] + ", " + player["y"]);
  console.log("player username: " + player["username"]);
  // execute the query to get enemy data and not the player data
  let enemypos = getDataWithParameter("player", "x<60 AND y<60 AND username  <> '"+player["username"]+"'", "x, y, username")      // search in local cache enemy data
  console.log(enemypos);

  let container = document.getElementById("container");
  container.innerHTML = "Loading War Map for " + player["username"] + "!";

 // create the table
  for (var i = 0; i < 500; i++) {
    var row = table.insertRow();
    for (var j = 0; j < 500; j++) {
      var cell = row.insertCell();
      cell.innerHTML = "m";
      cell.classList.add("square");

      if (i == player["x"] && j == player["y"]) {
        cell.innerHTML = "P";                   // Set cell content to "P"
        cell.classList.remove("square");        // Remove square class
        cell.classList.add("playerVillage");    // Add player-village class
        cell.id = "playerVillage";              // Set the id of the cell to "player-village"

      }
      for (let k in enemypos) {
        if (i == enemypos[k]["x"] && j == enemypos[k]["y"]) {
          cell.innerHTML = "E";                   // Set cell content to "E"
          cell.classList.remove("square");        // Remove square class
          cell.classList.add("enemyVillage");     // Add enemy-village class
          cell.id = enemypos[k]["username"];      // Set the id of the cell to "username"
        }
      }
    }
  }
  PlayerFocus();
  setHandlers();
}

