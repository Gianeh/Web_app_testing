// Player_Focus function to focus on the player cell
export function PlayerFocus() {

  let tableContainer = document.getElementById(".tableContainer");
  let playerCell = document.getElementById("playerVillage")[0];

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

  // add event listeners to overlay and set it to invisible
  let closeOverlay = document.getElementById("overlayClose");
  let overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  closeOverlay.addEventListener("click", overlayCloseHandler);

  // add event listeners to player village
  let player = document.getElementById("playerVillage");
  player.addEventListener("click", playerHandler);

  //add event listener to return to village button
  let villages = document.getElementsById("ReturnToVillage")
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

function playerHandler(event) {
  // open the overlay
  let overlay = document.getElementById("overlay");
  overlay.style.display = "block";
}

export function VillageClick(event) {
  window.location.href = "Village.html";
}