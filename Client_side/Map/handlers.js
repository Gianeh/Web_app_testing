import {
	getDataWithParameter
} from "../helper.js";

// map constant
const MapWidth = 500;
const MapHeight = 500;

// cell constant
const CellWidth = 30; // width of the cell in px

let Rows = 0; //number of rows
let Cols = 0; //number of columns



// Calculate the number of rows and columns are drawable in the container
export function SetDimension() {
  let container = document.getElementById("MapContainer");
  Rows = Math.floor(container.offsetHeight / CellWidth);
  Cols = Math.floor(container.offsetWidth / CellWidth);
  console.log("Rows: " + Rows);
  console.log("Cols: " + Cols);
}




// HandlerDrawMap function to draw the map
export function createTable(player, enemypos) {

  // Get the table
  let table = document.getElementById("WarMap");

  // Set the current origin
  let width = 0;
  let height = 0;

  // Set the height and width of the relative table CHECK SPAWN POSIION POLICY
	let CurrentOrigin = {
		x: player["x"] - Math.floor(Cols / 2),
		y: player["y"] - Math.floor(Rows / 2)
	};
  height = Rows + CurrentOrigin["y"];
  width = Cols + CurrentOrigin["x"];

  if (CurrentOrigin["x"] + Cols > MapWidth) {
    width = MapWidth;
    CurrentOrigin["x"] = MapWidth - Cols;
  }
  if (CurrentOrigin["y"] + Rows > MapHeight) {
    height = MapHeight;
    CurrentOrigin["y"] = MapHeight - Rows;
  }
  if (CurrentOrigin["x"] < 0) {
    width = Cols;
    CurrentOrigin["x"] = 0;
  }
  if (CurrentOrigin["y"] < 0) {
    height = Rows;
    CurrentOrigin["y"] = 0;
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
            cell.id = "enemyVillage";
            cell.innerHTML = "E";
        }
      }
    }
  }
  return CurrentOrigin;

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



// function to open the overlay for enemy
export function enemyHandler(event) {

  // get the enemy village
  let enemy = event.target;

  // this specific enemy position
  let x = enemy.cellIndex;
  let y = enemy.parentNode.rowIndex;

  console.log("enemyCellIndex: " + x);
  console.log("enemyRowIndex: " + y);

  // get the enemy position and current origin
  let enemypos = JSON.parse(localStorage.getItem("enemypos"));
  let CurrentOrigin = JSON.parse(localStorage.getItem("CurrentOrigin"));

  for(let k in enemypos){
    if(enemypos[k]["x"]== (x+CurrentOrigin["x"]) && enemypos[k]["y"] == (y+CurrentOrigin["y"])){
      // set enemy overlay
      let overlay = document.getElementById("EnemyOverlay");
      let top = enemy.offsetTop;
      let left = enemy.offsetLeft;
      top += 50;
      left += 50;
      overlay.style.top = top + "px";
      overlay.style.left = left + "px";
      overlay.zIndex = 9999;

      //set enemy data
      let enemyName = document.getElementById("enemyName");
      enemyName.innerHTML = enemypos[k]["name"];

      let enemyLevel = document.getElementById("enemyLevel");
      enemyLevel.innerHTML = enemypos[k]["level"];

      // get enemy structures data
      let enemyResurces= getDataWithParameter("resources","user_id ="+ enemypos[k]["user_id"],"*");   

      console.log(enemyResurces);

      // set enemy resurces data
      let enemyWoood = document.getElementById("enemyWood");
      enemyWoood.innerHTML = enemyResurces[0]["wood"];

      let enemyRock = document.getElementById("enemyStone");
      enemyStone.innerHTML = enemyResurces[0]["Rock"];

      let enemyIron = document.getElementById("enemyIron");
      enemyIron.innerHTML = enemyResurces[0]["iron"];

      let enemyFood = document.getElementById("enemyFood");
      enemyFood.innerHTML = enemyResurces[0]["food"];

    }
  }
  //open the overlay
  let overlay = document.getElementById("EnemyOverlay");
  // get top, left enemy village position on screen

}



//funxtion that close the player overlay
export function ClosePlayerHandlrer() {

  let overlay = document.getElementById("PlayerOverlay");
  overlay.style.display = "none";

}


// function that close the enemy overlay
export function CloseEnemyHandlrer() {

  let overlay = document.getElementById("EnemyOverlay");
  overlay.style.display = "none";

}


//function to return to village
export function VillageClick(event) {
  window.location.href = "Village.html";
}




// function that handle movement inside the map
export function moveTable(event) {

  // close player/enemy overlay if the table is moving 

  let playerOverlay = document.getElementById("PlayerOverlay");

  if (playerOverlay.style.display == "block") {
    playerOverlay.style.display = "none";
  }

  let enemyOverlay = document.getElementById("EnemyOverlay");

  if (enemyOverlay.style.display == "block") {
    enemyOverlay.style.display = "none";
  }



  // get key or the elemnt id of the button clicked
  let id = event.target.id;
  if (event.target.id != null) {
    let key = event.key;  // getting the key pressed
    switch (key) {
      case "w":
        id = "buttonDown";
        break;
      case "a":
        id = "buttonRight";
        break;
      case "s":
        id = "buttonUp";
        break;
      case "d":
        id = "buttonLeft";
        break;
    }
    key = null;
  }
  console.log("moveTable, id: " + id);

  let table = document.getElementById("WarMap");

  // get the current origin, player position and enemy position from local-storage
  let CurrentOrigin = JSON.parse(localStorage.getItem("CurrentOrigin"));
  let player = JSON.parse(localStorage.getItem("player"));
  let enemypos = JSON.parse(localStorage.getItem("enemypos"));

  let newCell = null;
  let currentCell = null;
  let prevCell = null;
  let k = null;

  // chose differnt action depending on the id
  switch (id) {

    //CASE I MOVE UP
    case "buttonUp":

      // check if i can move up
      if (CurrentOrigin["y"] + Rows + 1 > MapHeight) {
        console.log("I can't move up");
        break;
      }

      // traslate the table down by one row starting by the last row to the first
      for (let i = Rows - 1; i > 0; i--) {
        for (let j = 0; j < Cols; j++) {
          currentCell = table.rows[i].cells[j];
          prevCell = table.rows[i - 1].cells[j];
          currentCell.className = prevCell.className;
          currentCell.innerHTML = prevCell.innerHTML;
          currentCell.id = prevCell.id;
        }
      }

      // delete the first row
      table.deleteRow(0);

      // modify current origin cause i move up so i increase the y coordinate
      CurrentOrigin["y"] += 1;
      localStorage.setItem("CurrentOrigin", JSON.stringify(CurrentOrigin));
      console.log("CurrentOrigin: " + CurrentOrigin["x"] + " " + CurrentOrigin["y"]);
      // insert a new row at the top
      let newTopRow = table.insertRow(0);

      for (let j = 0; j < Cols; j++) {
        newCell = newTopRow.insertCell();
        // i have to check if at the top there is the player village 
        if (CurrentOrigin["x"] + j == player["x"] && CurrentOrigin["y"] + Rows == player["y"]) {
          newCell.className = "playerVillage";
          newCell.id = "playerVillage";
          newCell.innerHTML = "P";
        } else {
          newCell.innerText = "";
          newCell.className = "square";
        }

        // check if there is an enemy village
        for (k in enemypos) {
          if (CurrentOrigin["x"] + j == enemypos[k]["x"] && CurrentOrigin["y"] + Rows == enemypos[k]["y"]) {
            cell.className = "enemyVillage";
            cell.id = "enemyVillage";
            cell.innerHTML = "E";
          }
        }
      }
      break;

    // CASE I MOVE DOWN
    case "buttonDown":

      // check if i can move down
      if (CurrentOrigin["y"] - 1 < 0) {
        console.log("I can't move down");
        break;
      }

      // translate the table up by one row starting from the second row from the bottom
      for (let i = 0; i < Rows - 1; i++) {
        for (let j = 0; j < Cols; j++) {
          currentCell = table.rows[i].cells[j];
          prevCell = table.rows[i + 1].cells[j];
          currentCell.className = prevCell.className;
          currentCell.innerHTML = prevCell.innerHTML;
          currentCell.id = prevCell.id;
        }
      }

      // delete the last row
      table.deleteRow(Rows - 1);

      // modify current origin cause i move down so i decrease the y coordinate
      CurrentOrigin["y"] -= 1;
      localStorage.setItem("CurrentOrigin", JSON.stringify(CurrentOrigin));
      console.log("CurrentOrigin: " + CurrentOrigin["x"] + " " + CurrentOrigin["y"]);

      // insert a new row at the bottom
      let newBottomRow = table.insertRow(Rows - 1);


      for (let j = 0; j < Cols; j++) {
        newCell = newBottomRow.insertCell();
        // i have to check if at the top there is the player village 
        if (CurrentOrigin["x"] + j == player["x"] && CurrentOrigin["y"] == player["y"]) {
          newCell.className = "playerVillage";
          newCell.id = "playerVillage";
          newCell.innerHTML = "P";
        } else {
          newCell.innerText = "";
          newCell.className = "square";
        }

        // check if there is an enemy village
        for (let k in enemypos) {
          if (CurrentOrigin["x"] + j == enemypos[k]["x"] && CurrentOrigin["y"] == enemypos[k]["y"]) {
            cell.className = "enemyVillage";
            cell.id = "enemyVillage";
            cell.innerHTML = "E";
          }
        }
      }
      break;

    // CASE I MOVE LEFT
    case "buttonLeft":

      // check if i can move left
      if (CurrentOrigin["x"] - 1 < 0) {
        console.log("I can't move left");
        break;
      }

      // Move the entire table to the right by one column
      for (let j = Cols - 1; j > 0; j--) {
        for (let i = 0; i < Rows - 1; i++) {
          currentCell = table.rows[i].cells[j];
          prevCell = table.rows[i].cells[j - 1];
          currentCell.className = prevCell.className;
          currentCell.innerHTML = prevCell.innerHTML;
          currentCell.id = prevCell.id;
        }
      }

      // delete the first column
      for (let i = 0; i < Rows; i++) {
        table.rows[i].deleteCell(0);
      }

      // modify current origin cause i move left so i decrease the x coordinate
      CurrentOrigin["x"] -= 1;
      localStorage.setItem("CurrentOrigin", JSON.stringify(CurrentOrigin));

      // insert a new column at the left
      for (let i = 0; i < Rows; i++) {
        newCell = table.rows[i].insertCell(0);
        // i have to check if at the top there is the player village
        if (CurrentOrigin["x"] == player["x"] && CurrentOrigin["y"] + Rows - i == player["y"]) {
          newCell.className = "playerVillage";
          newCell.id = "playerVillage";
          newCell.innerHTML = "P";
        } else {
          newCell.innerText = "";
          newCell.className = "square";
        }
        // check if there is an enemy village
        for (k in enemypos) {
          if (CurrentOrigin["x"] == enemypos[k]["x"] && CurrentOrigin["y"] + Rows - i == enemypos[k]["y"]) {
            cell.className = "enemyVillage";
            cell.id = "enemyVillage";
            cell.innerHTML = "E";
          }
        }
      }

      break;

    // CASE I MOVE RIGHT
    case "buttonRight":

      // check if i can move right
      if (CurrentOrigin["x"] + Cols + 1 > MapWidth) {
        console.log("I can't move right");
        break;
      }

      // Move the entire table to the left by one column
      for (let j = 0; j < Cols - 1; j++) {
        for (let i = 0; i < Rows; i++) {
          currentCell = table.rows[i].cells[j];
          prevCell = table.rows[i].cells[j + 1];
          currentCell.className = prevCell.className;
          currentCell.innerHTML = prevCell.innerHTML;
          currentCell.id = prevCell.id;
        }
      }

      // delete the last column
      for (let i = 0; i < Rows; i++) {
        table.rows[i].deleteCell(Cols - 1);
      }

      // modify current origin cause i move right so i increase the x coordinate
      CurrentOrigin["x"] += 1;
      localStorage.setItem("CurrentOrigin", JSON.stringify(CurrentOrigin));

      // insert a new column at the right
      for (let i = 0; i < Rows; i++) {
        newCell = table.rows[i].insertCell(29);
        // i have to check if at the top there is the player village
        if (CurrentOrigin["x"] + Cols - 1 == player["x"] && CurrentOrigin["y"] + Rows - i == player["y"]) {
          newCell.className = "playerVillage";
          newCell.id = "playerVillage";
          newCell.innerHTML = "P";
        } else {
          newCell.innerText = "";
          newCell.className = "square";
        }

        // check if there is an enemy village
        for (k in enemypos) {
          if (CurrentOrigin["x"] + Cols - 1 == enemypos[k]["x"] && CurrentOrigin["y"] + Rows - i == enemypos[k]["y"]) {
            cell.className = "enemyVillage";
            cell.id = "enemyVillage";
            cell.innerHTML = "E";
          }
        }
      }

      break;
  }


  // reset the event listener on the overlay of the player village
 
  // player can desappear if he is not in the map
  if (playerOverlay != null) {
    playerOverlay.addEventListener("click", playerHandler);
  }
  // enemy can desappear if he is not in the map
  if (enemyOverlay != null) {
    for (let i = 0; i < enemyOverlay.length; i++) {
      enemyOverlay[i].addEventListener("click", enemyHandler);
    }
  }

}



