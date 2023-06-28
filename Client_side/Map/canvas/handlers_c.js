// Player_Focus function to focus on the player cell
export function PlayerFocus(cellSize,x,y) {

  let container = document.getElementById("canvasContainer");

  container.scrollTo((cellSize*x)/2,(cellSize*y)/3) // Translate the canvas // finc new parameters
}

export function setHandlers(x,y,cellSize) {

  // add event listeners to refocus button
  let PlayerReFocus = document.getElementById("PlayerRefocus");
  PlayerReFocus.addEventListener("click", PlayerFocus(x,y,cellSize));

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
export function HandlerDrawMap (cellSize, player, enemypos) {
  
  let canvas = document.getElementById("MapCanvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 500; i++) {
    for (let j = 0; j < 500; j++) {
      const cellX = i * cellSize;
      const cellY = j * cellSize;
      if (i == player["x"] && j == player["y"]) {
        // Draw player cell
        ctx.fillStyle = "blue";
        ctx.fillRect(cellX, cellY, cellSize, cellSize);
        ctx.id = "playerVillage";
      }

      for (let k in enemypos) {
        if (i == enemypos[k]["x"] && j == enemypos[k]["y"]) {
          // Draw enemy cell
          ctx.fillStyle = "red";
          ctx.fillRect(cellX, cellY, cellSize, cellSize);
          ctx.id = "enemyVillage";
        }
      }
    }
  }

}

export function zoomIn() {
  zoomLevel *= 1.1;
  applyZoom();
}

export function zoomOut() {
  zoomLevel /= 1.1;
  applyZoom();
}

function applyZoom() {
  let canvas = document.getElementById("MapCanvas");
  let ctx = canvas.getContext("2d");
  const newWidth = mapWidth * cellSize * zoomLevel;
  const newHeight = mapHeight * cellSize * zoomLevel;
  canvas.style.width = newWidth + "px";
  canvas.style.height = newHeight + "px";
  canvas.width = newWidth;
  canvas.height = newHeight;
  drawMap(currentOriginX, currentOriginY, player, enemypos);
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