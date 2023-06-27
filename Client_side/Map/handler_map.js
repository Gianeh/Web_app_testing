import { pickRecords, printData, getData, sendData, getLocalData, getDataWithParameter } from "../helper.js";
import { PlayerFocus, setHandlers, HandlerDrawMap } from "./handlers.js";
//use only getLocalData to get info

const mapWidth = 500;
const mapHeight = 500;
const cellSize = 30;

let canvas, ctx;
let zoomLevel = 1;

export function onLoad() {
  // create the canvas
  canvas = document.getElementById("MapCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = mapWidth * cellSize;
  canvas.height = mapHeight * cellSize;
 
  // draw the map
  // let table = document.getElementById("WarMap");
  let player = getLocalData("player", "map");           // search in local cache player data
  player = pickRecords(player, ["username", "x", "y"]);   // pick only username, x and y from player data

  let username = getLocalData("player", "map");
  username = pickRecords(username, ["username"]);

  console.log("player position: " + player["x"] + ", " + player["y"]);
  console.log("player username: " + player["username"]);
  // execute the query to get enemy data and not the player data
  let enemypos = getDataWithParameter("player", "x<60 AND y<60 AND username  <> '" + player["username"] + "'", "x, y, username")      // search in local cache enemy data
  console.log(enemypos);

  HandlerDrawMap(cellSize, player, enemypos);

  // set the infoDiv to display the welcome message
  let info = document.getElementById("info");
  info.innerHTML = "Welcome to your War Map " + player["username"] + ", are you are ready to conquer the world?";

  setHandlers(player["x"], player["y"]);
  PlayerFocus(player["x"], player["y"]);
}

