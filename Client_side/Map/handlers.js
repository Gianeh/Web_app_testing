const MapWidth = 500;
const MapHeight = 500;

const RowSize = 30; //number of rows
const ColSize = 30; //number of columns

// Player_Focus function to focus on the player cell
export function PlayerFocus(cellSize, x, y) {

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
  } else if (CurrentOrigin[1] + 30 > MapHeight) {
    width = MapHeight;
  } else if (CurrentOrigin[0] + 30 < 0) {
    height = 30;
  } else if (CurrentOrigin[1] + 30 < 0) {
    width = 30;
  } else {
    height = 30 + CurrentOrigin[1];
    width = 30 + CurrentOrigin[0];
  }

  console.log("height: " + height);
  console.log("width: " + width);

  //REMEMBER i regulate the rows and j the columns

  //Create the entire table
  for (let i = CurrentOrigin[1]; i < height; i++) {
    let row = table.insertRow();
    for (let j = CurrentOrigin[0]; j < width; j++) {
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
export function overlayCloseHandler(event) {
  // close the overlay
  let overlay = document.getElementById("PlayerOverlay");
  overlay.style.display = "none";
}

//function to open the overlay for player
export function playerHandler(event) {
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
  console.log("player top: " + top);
  console.log("player left: " + left);
  overlay.style.top = top + "px";
  overlay.style.left = left + "px";
  overlay.zIndex = 9999;
  // show overlay
  overlay.style.display = "block";

}

//function to return to village
export function VillageClick(event) {
  window.location.href = "Village.html";
}

export function moveTable(event) {
  // get elemnt id who trigger the event
  let id = event.target.id;
  let table = document.getElementById("WarMap");

  //I need a function to save the list of the enemy player and theyr postion
  //I need to save the player position
  //I need to save the current origin
  //I need to save the current width and height of the table

  //PROBLEMS

  //1) i need to traslate the entire table
  //2) i need to quick acces to the player village and enemy village position
  //3) player is not very quick moving the map


  //PROS 

   //1) map remain very small
   //2) overall is very fast compared to the other solution
   //3) withount the scollbar looks smother
   //4) i can use the same function to move the map in all direction


  // chose differnt action depending on the id
  switch (id) {
    case "buttonUp":

      // delete the last row
      table.deleteRow(29);

      // move the entire table down of 1 row
      for (let i = 0; i < RowSize; i++) {

        // here i move the entire table up of 1 row

      }

      // check if i need add enemuy village or village
      for (let i = 0; i < ColSize; i++) {

        // here i v've to check if i need to add a new enemy village or player village
        // i need to scroll i considering the CurrentOrigin[1] ("y") + ColSize
        // chek if i need to add a new enemy village or player village in this row 

      }

      break;
    case "buttonDown":
      // delete the first row
      table.deleteRow(0);
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