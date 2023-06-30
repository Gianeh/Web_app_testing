 // Idea for the map
  // I will have a 40 x 40 table already centerd on player village
  // I will have a CurrentOrigin variable that will be the relative origin of the table
  // I will have a function that will draw the table
  // That function will consider as origin the CurrentOrigin variable so i will be currentOrigin[0] and j will be currentOrigin[1]
  // The limit will be 40 + currentOrigin[0] and 40 + currentOrigin[1]
  // If the limit is more than 500 or less than 0 it will table will not be centrered on the player village



import { pickRecords,  getLocalData, getDataWithParameter } from "../helper.js";
import { HandlerCreateTable, playerHandler, moveTable,ClosePlayerHandlrer, VillageClick } from "./handlers.js";
//use only getLocalData to get info

let CurrentOrigin = {x: 0, y: 0};

export function onLoad() {

  // search in local cache player data
  let player = getLocalData("player", "map");       
  // pick only username, x and y from player data      
  player = pickRecords(player, ["username", "x", "y"]);   

  //get the username of the player
  let username = getLocalData("player", "map");
  username = pickRecords(username, ["username"]);

  console.log("player position: " + player["x"] + ", " + player["y"]);
  console.log("player username: " + player["username"]);

  //set current origin
  CurrentOrigin["x"] = player["x"]-15;
  CurrentOrigin["y"] = player["y"]-15;
  console.log("CurrentOrigin: " + CurrentOrigin["x"] + ", " + CurrentOrigin["y"]);

  // execute the query to get enemy data and not the player data
  let enemypos = getDataWithParameter("player", " username  <> '" + player["username"] + "'", "x, y, username");   
  console.log(enemypos);

  // draw the map
  HandlerCreateTable(CurrentOrigin,player, enemypos);

  // insert in localstiorage the current origin
  localStorage.setItem("CurrentOrigin", JSON.stringify(CurrentOrigin));
  // insert in localstiorage the player data
  localStorage.setItem("player", JSON.stringify(player));
  // insert in localstiorage the enemy data
  localStorage.setItem("enemypos", JSON.stringify(enemypos));

  // set the infoDiv to display the welcome message
  let info = document.getElementById("info");
  info.innerHTML = "Welcome to your War Map " + player["username"] + ", are you are ready to conquer the world?";

  setHandlers();
}

function setHandlers() {

  // add event listeners to player village
  let playerCell = document.getElementById("playerVillage");
  playerCell.addEventListener("click", playerHandler);

  let button = document.getElementById("ClosePlayerVillage");
  button.addEventListener("click", ClosePlayerHandlrer);

  //add event listener to return to village button
  let villages = document.getElementById("ReturnToVillage")
  villages.addEventListener("click", VillageClick);

  // add event listener to move the table
  let buttonUp = document.getElementById("buttonUp");
  buttonUp.addEventListener("click", moveTable);
  let buttonDown = document.getElementById("buttonDown");
  buttonDown.addEventListener("click", moveTable);
  let buttonLeft = document.getElementById("buttonLeft");
  buttonLeft.addEventListener("click", moveTable);
  let buttonRight = document.getElementById("buttonRight");
  buttonRight.addEventListener("click", moveTable);

  // clear local storage on unload
  window.addEventListener("beforeunload", function () {
    // empties the local storage
    localStorage.clear();
});

}
