// Idea for the map
// I will have a 40 x 40 table already centerd on player village
// I will have a CurrentOrigin variable that will be the relative origin of the table
// I will have a function that will draw the table
// That function will consider as origin the CurrentOrigin variable so i will be currentOrigin[0] and j will be currentOrigin[1]
// The limit will be 40 + currentOrigin[0] and 40 + currentOrigin[1]
// If the limit is more than 500 or less than 0 it will table will not be centrered on the player village



import { pickRecords, getLocalData, getDataWithParameter, sendData } from "../helper.js";
import { createTable, playerHandler, enemyHandler, moveTable, ClosePlayerHandlrer, VillageClick, SetDimension } from "./handlers.js";
import { drawPlayerAndEnemy } from "./Graphical_function.js";
//use only getLocalData to get info


export function onLoad() {

  // send a useless message to server to check session presence
  sendData("checkSession", "none", "map");

  // RETRIEVE ALL NEEDED DATA FROM SERVER

  // search in local cache player data
  let player = getLocalData("player", "map");
  // pick only username, x and y from player data      
  player = pickRecords(player, ["user_id","username", "x", "y"]);

  // get the username
  let username = player["username"]

  console.log("player position: " + player["x"] + ", " + player["y"]);
  console.log("player username: " + username);

  // execute the query to get all the enemy positions
  let enemypos = getDataWithParameter("player", " username  <> '" + player["username"] + "'", "*");
  console.log(enemypos);

  // APPLY ALGORITHMS TO DRAW THE MAP

  // get the loading circle and hide it
  let loading = document.getElementById("loading_circle");
  loading.style.display = "none";

  // set the dimension of the table considering the container dimension
  SetDimension();

  // draw the map
  let CurrentOrigin = createTable(player);
  console.log("CurrentOrigin: " + CurrentOrigin["x"] + ", " + CurrentOrigin["y"]);

  // draw rock inside the map
  // drawLandScape();

  // draw player and enemy
  drawPlayerAndEnemy(CurrentOrigin, enemypos, player);

  // insert in localstorage the current origin
  localStorage.setItem("CurrentOrigin", JSON.stringify(CurrentOrigin));
  // insert in localstorage the player data
  localStorage.setItem("player", JSON.stringify(player));
  // insert in localstorage the enemy data
  localStorage.setItem("enemypos", JSON.stringify(enemypos));

  // set the infoDiv to display the welcome message
  let info = document.getElementById("info");
  info.innerHTML = "Welcome to your War Map " + username + ", are you ready to conquer the world?";

  setHandlers();
}

function setHandlers() {

  // add event listeners to player village
  let playerCell = document.getElementById("playerVillage");
  playerCell.addEventListener("click", playerHandler);

  //add event listeners to enemy villages 
  let enemyCells = document.getElementsByClassName("enemyVillage");
  for (let i = 0; i < enemyCells.length; i++) {
    enemyCells[i].addEventListener("click", enemyHandler);
  }
  // add event listener to close player village overlay
  let button = document.getElementById("ClosePlayerVillage");
  button.addEventListener("click", ClosePlayerHandlrer);

  //add event listener to return to village button
  let villages = document.getElementById("ReturnToVillage")
  villages.addEventListener("click", VillageClick);

  // add event listener to move the table by buttons
  let buttonUp = document.getElementById("buttonUp");
  buttonUp.addEventListener("click", moveTable);
  let buttonDown = document.getElementById("buttonDown");
  buttonDown.addEventListener("click", moveTable);
  let buttonLeft = document.getElementById("buttonLeft");
  buttonLeft.addEventListener("click", moveTable);
  let buttonRight = document.getElementById("buttonRight");
  buttonRight.addEventListener("click", moveTable);

  // add event listener to move the table by keyboard
  document.addEventListener("keydown", moveTable); 1

  // clear local storage on unload
  window.addEventListener("beforeunload", function () {
    // empties the local storage
    localStorage.clear();
  });

}
