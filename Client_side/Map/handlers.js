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
  let player = document.getElementById("playerVillage");
  player.addEventListener("mouseover", playerHandler);

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
  }else{
     height = 30 + CurrentOrigin[1];
     width = 30 + CurrentOrigin[0];
  }

  console.log(height);
  console.log(width);

  //Create the entire table
  for (let i= CurrentOrigin[1] ; i < width; i++) {
    let row = table.insertRow();
    for (let j = CurrentOrigin[0] ; j < height; j++) {
      
      // Draw player village cell
      if (i == player["x"] && j == player["y"]) {
        let cell = row.insertCell();
        cell.className = "PlayerVillage";
        cell.id = "playerVillage";
      }
      let cell = row.insertCell();
      cell.className = "square";

      //Draw enemy villages cells
      for (let k in enemypos) {
        if (i == enemypos[k]["x"] && j == enemypos[k]["y"]) {
          cell.className = "enemyVillage";
          cell.id = "EnemyVillage" + enemypos[k]["username"];
        }
      }
    }
  }
}


function overlayCloseHandler(event) {
  // close the overlay
  let overlay = document.getElementById("overlay");
  if (event.target == overlay) {
    overlay.style.display = "none";
  }
}

//function to open the overlay for player
function playerHandler(event) {
  // open the overlay
  let overlay = document.getElementById("overlay");
  overlay.style.display = "block";

  // get the player cell position
  let playerCell = document.getElementById("playerVillage");
  let top = playerCell.offsetTop;
  let left = playerCell.offsetLeft;

  // set the overlay position
  top += 10;
  left += 10;
  overlay.style.top = top + "px";
  overlay.style.left = left + "px";

}

//function to return to village
function VillageClick(event) {
  window.location.href = "Village.html";
}