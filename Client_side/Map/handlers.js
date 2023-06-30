const MapWidth = 500;
const MapHeight = 500;

const RowSize = 30; //number of rows
const ColSize = 30; //number of columns

// HandlerDrawMap function to draw the map
export function HandlerCreateTable(CurrentOrigin, player, enemypos) {

  // Get the table
  let table = document.getElementById("WarMap");

  // Set the current origin
  let width = 0;
  let height = 0;

  // Set the height and width of the table CHECK SPAWN POSIION POLICY
  if (CurrentOrigin["x"] + 30 > MapWidth) {
    height = MapWidth;
  } else if (CurrentOrigin["y"] + 30 > MapHeight) {
    width = MapHeight;
  } else if (CurrentOrigin["x"] + 30 < 0) {
    height = 30;
  } else if (CurrentOrigin["y"] + 30 < 0) {
    width = 30;
  } else {
    height = 30 + CurrentOrigin["y"];
    width = 30 + CurrentOrigin["x"];
  }

  console.log("height: " + height);
  console.log("width: " + width);

  //REMEMBER i regulate the rows and j the columns

  //Create the entire table
  for (let i = CurrentOrigin["y"]; i < height; i++) {
    let row = table.insertRow();
    for (let j = CurrentOrigin["x"]; j < width; j++) {
      // draw empty cells
      let cell = row.insertCell();
      cell.className = "square";
      cell.id = "terrain";

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
export function overlayCloseHandler(event) {
  // close the overlay
  let overlay = document.getElementById("PlayerOverlay");
  overlay.style.display = "none";
}









//function to open the overlay for player
export function playerHandler() {
  // open the overlay
  let overlay = document.getElementById("PlayerOverlay");

  // get top, left player village position on screen
  let player = document.getElementById("playerVillage");
  let rect = player.getBoundingClientRect();
  let top = rect.top;
  let left = rect.left;

  // set the overlay position
  top += 50;
  left += 50;
  console.log("player top: " + top);
  console.log("player left: " + left);
  overlay.style.top = top + "px";
  overlay.style.left = left + "px";
  overlay.zIndex = 9999;
  // show overlay
  overlay.style.display = "block";

}









//funxtion that close the player overlay
export function ClosePlayerHandlrer() {

  let overlay = document.getElementById("PlayerOverlay");
  overlay.style.display = "none";

}





//function to return to village
export function VillageClick(event) {
  window.location.href = "Village.html";
}





// function that handle movement inside the map
export function moveTable(event) {

  // get elemnt id of the button clicked
  let id = event.target.id;
  let table = document.getElementById("WarMap");

  // get the current origin, player position and enemy position from local-storage
  let CurrentOrigin = JSON.parse(localStorage.getItem("CurrentOrigin"));
  let player = JSON.parse(localStorage.getItem("player"));
  let enemypos = JSON.parse(localStorage.getItem("enemypos"));

  // chose differnt action depending on the id
  switch (id) {

    //CASE I MOVE UP
    case "buttonUp":

      // traslate the table down by one row starting by the last row to the first
      for (let i = table.rows.length - 1; i > 0; i--) {
        for (let j = 0; j < 30; j++) {
          const currentCell = table.rows[i].cells[j];
          const prevCell = table.rows[i - 1].cells[j];
          currentCell.className = prevCell.className;
          currentCell.innerHTML = prevCell.innerHTML;
          currentCell.id = prevCell.id;
        }
      }

      // delete the last row
      table.deleteRow(0);

      // modify current origin cause i move up so i increase the y coordinate
      CurrentOrigin["y"] += 1;

      // insert a new row at the top
      const newTopRow = table.insertRow(0);
      for (let j = 0; j < ColSize; j++) {
        const newCell = newTopRow.insertCell();

        // i have to check if at the top there is the player village 
        if (CurrentOrigin["x"] + RowSize == player["x"] && i + CurrentOrigin["y"] == player["y"]) {
          newCell.className = "playerVillage";
          newCell.id = "playerVillage";
          newCell.innerHTML = "P";
        } else {
          newCell.innerText = "";
          newCell.className = "square";
        }

        // check if there is an enemy village
        for (let k in enemypos) {
          if (CurrentOrigin["x"] + RowSize == enemypos[k]["x"] && i + CurrentOrigin["y"] == enemypos[k]["y"]) {
            cell.className = "enemyVillage";
            cell.id = "EnemyVillage" + enemypos[k]["username"];
            cell.innerHTML = "E";
          }
        }
      }

      // reset the event listener on the overlay
      const overlay = document.getElementById("PlayerOverlay");
      // overlay.removeEventListener("click", playerHandler);
      overlay.addEventListener("click", playerHandler);

      break;

    // CASE I MOVE DOWN
    case "buttonDown":

      // traslate the table up by one row starting from the second row from the bottom
      for (let i = 1; i < table.rows.length - 1; i++) {
        for (let j = 0; j < 30; j++) {
          const currentCell = table.rows[i].cells[j];
          const prevCell = table.rows[i + 1].cells[j];
          currentCell.className = prevCell.className;
          currentCell.innerHTML = prevCell.innerHTML;
          currentCell.id = prevCell.id;
          // currentCell.id = prevCell.id;
          // Copy any other desired styles from the previous cell to the current cell
        }
      }

      // delete the first row
      table.deleteRow(29);

      // modify current origin cause i move down so i decrease the y coordinate
      CurrentOrigin["y"] -= 1;

      // insert a new row at the bootom
      const newBottomRow = table.insertRow(29);
      for (let j = 0; j < 30; j++) {
        const newCell = newBottomRow.insertCell();
        newCell.innerText = "";
        newCell.className = "square";
      }

      // insert a new row at the bottom


      break;

    case "buttonLeft":
      // delete the last column
      for (let i = 0; i < 30; i++) {
        table.rows[i].deleteCell(29);
      }
      // insert a new column at the left

      break;

    case "buttonRight":
      // delete the first column
      for (let i = 0; i < 30; i++) {
        table.rows[i].deleteCell(0);
      }
      // insert a new column at the right

      break;
  }
}