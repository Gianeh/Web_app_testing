// Player_Focus function to focus on the player cell
export function PlayerFocus() {

  // get the table container and the player cell
  let tableContainer = document.getElementById("tableContainer");
  let playerCell = document.getElementById("playerVillage");

  // calcultate the offset of the player cell
  let offsetTop = playerCell.offsetTop - (tableContainer.offsetHeight / 2) + (playerCell.offsetHeight / 2);
  let offsetLeft = playerCell.offsetLeft - (tableContainer.offsetWidth / 2) + (playerCell.offsetWidth / 2);

  // apply the offset to the container
  tableContainer.scrollTop = offsetTop;
  tableContainer.scrollLeft = offsetLeft;
}

export function setHandlers() {
  // add event listeners to the table container
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  // add event listeners to refocus button
  let PlayerReFocus = document.getElementById("PlayerRefocus");
  PlayerReFocus.addEventListener("click", PlayerFocus);

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

function handleMouseMove(event) {
  let startX = event.pageX;
  let startY = event.pageY;
  var deltaX = event.pageX - startX;
  var deltaY = event.pageY - startY;
  let table = document.getElementById("WarMap");
  table.scrollLeft = startScrollLeft - deltaX;
  table.scrollTop = startScrollTop - deltaY;
  let tableContainer = document.getElementById("tableContainer");
}

function handleMouseUp(event) {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
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
  top+=10;
  left+=10;
  overlay.style.top = top +"px";
  overlay.style.left = left +"px";

}

//function to return to village
function VillageClick(event) {
  window.location.href = "Village.html";
}