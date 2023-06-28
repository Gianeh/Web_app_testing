const MapWidth = 500;
const MapHeight = 500;


// Player_Focus function to focus on the player cell
export function PlayerFocus(cellSize, x, y) {

}


export function setHandlers(x, y, cellSize) {

  // add event listeners to refocus button
  let PlayerReFocus = document.getElementById("PlayerRefocus");
  PlayerReFocus.addEventListener("click", PlayerFocus(x, y, cellSize));

  // add event listeners to overlay close button
  let closeOverlay = document.getElementById("overlayClose");
  closeOverlay.addEventListener("click", overlayCloseHandler);

  // add event listeners to player village
  let playerCell = document.getElementById("playerVillage");
  playerCell.addEventListener("click", playerHandler);

  let button = document.getElementById("button");
  button.addEventListener("click", playerHandler);

  //add event listener to return to village button
  let villages = document.getElementById("ReturnToVillage")
  villages.addEventListener("click", VillageClick);


}

// HandlerDrawMap function to draw the map
export function HandlerCreateTable(CurrentOrigin, player, enemypos) {

  // Get the table
  let table = document.getElementById("WarMap");

  // Set the current origin
  let width = 0;
  let height = 0;

  // Set the height and width of the table
  if (CurrentOrigin[0] + 30 > MapWidth) {
    height = MapWidth;
  }else if(CurrentOrigin[1] + 30 > MapHeight){
    width = MapHeight;
  }else if(CurrentOrigin[0]+30<0){
    height = 30;
  }else if(CurrentOrigin[1]+30<0){
    width = 30;
  }else{
     height = 30 + CurrentOrigin[1];
     width = 30 + CurrentOrigin[0];
  }

  console.log("height: "+height);
  console.log("width: "+width);

  //REMEMBER i regulate the rows and j the columns

  //Create the entire table
  for (let i = CurrentOrigin[1]; i < height; i++) {
    let row = table.insertRow();
    for ( let j = CurrentOrigin[0]; j < width; j++) {
       // draw empty cells
       let cell = row.insertCell();
       cell.className = "square";
      
      // Draw player village cell
      if (j == player["x"] && i == player["y"]) {
        cell.className = "playerVillage";
        cell.id = "playerVillage";
        cell.innerHTML = "P";
      }
     
      //Draw enemy villages cells
      for (let k in enemypos) {
        if (j == enemypos[k]["x"] && i == enemypos[k]["y"]) {
          cell.className = "enemyVillage";
          cell.id = "EnemyVillage" + enemypos[k]["username"];
          cell.innerHTML = "E";
        }
      }
    }
  }
 
}

//close the overlay
function overlayCloseHandler(event) {
  // close the overlay
  let overlay = document.getElementById("PlayerOverlay");
  overlay.style.display = "none";
}

//function to open the overlay for player
function playerHandler(event) {
  // open the overlay
  console.log("player clicked");
  let overlay = document.getElementById("PlayerOverlay");

  // get top, left player village position on screen
  let player = document.getElementById("playerVillage");
  let rect = player.getBoundingClientRect();
  let top = rect.top;
  let left = rect.left;

  // set the overlay position
  top += 20;
  left += 20;
  console.log("player top: "+top);
  console.log("player left: "+left);
  overlay.style.top = top + "px";
  overlay.style.left = left + "px";
  overlay.zIndex = 9999;
  // show overlay
  overlay.style.display = "block";
 
}

//function to return to village
function VillageClick(event) {
  window.location.href = "Village.html";
}