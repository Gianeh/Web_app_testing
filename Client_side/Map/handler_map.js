import { pickRecords,  getLocalData, getDataWithParameter } from "../helper.js";
import { PlayerFocus, setHandlers, HandlerCreateTable } from "./handlers.js";
//use only getLocalData to get info

let CurrentOrigin = [0, 0];

export function onLoad() {
  // let table = document.getElementById("WarMap");
  let player = getLocalData("player", "map");           // search in local cache player data
  player = pickRecords(player, ["username", "x", "y"]);   // pick only username, x and y from player data

  //get the username of the player
  let username = getLocalData("player", "map");
  username = pickRecords(username, ["username"]);

  console.log("player position: " + player["x"] + ", " + player["y"]);
  console.log("player username: " + player["username"]);

  // Idea

  // I will have a 40 x 40 table already centerd on player village
  // I will have a CurrentOrigin variable that will be the relative origin of the table
  // I will have a function that will draw the table
  // That function will consider as origin the CurrentOrigin variable so i will be currentOrigin[0] and j will be currentOrigin[1]
  // The limit will be 40 + currentOrigin[0] and 40 + currentOrigin[1]
  // If the limit is more than 500 or less than 0 it will table will not be centrered on the player village

  //set current origin
  CurrentOrigin[0] = player["x"]-15;
  CurrentOrigin[1] = player["y"]-15;
  console.log("CurrentOrigin: " + CurrentOrigin[0] + ", " + CurrentOrigin[1]);

  // execute the query to get enemy data and not the player data
  let enemypos = getDataWithParameter("player", "x<90 AND y<90 AND username  <> '" + player["username"] + "'", "x, y, username")      // search in local cache enemy data
  console.log(enemypos);

  // draw the map
  HandlerCreateTable(CurrentOrigin,player, enemypos);

  // set the infoDiv to display the welcome message
  let info = document.getElementById("info");
  info.innerHTML = "Welcome to your War Map " + player["username"] + ", are you are ready to conquer the world?";

  setHandlers(player["x"], player["y"]);
  //PlayerFocus(player["x"], player["y"]);
}

