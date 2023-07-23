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
          id = "buttonUp";
          break;
        case "a":
          id = "buttonLeft";
          break;
        case "s":
          id = "buttonDown";
          break;
        case "d":
          id = "buttonRight";
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
          if (CurrentOrigin["x"] + j + 1 == player["x"] && CurrentOrigin["y"] + Rows == player["y"]) {
            newCell.className = "playerVillage";
            newCell.id = "playerVillage";
            newCell.innerHTML = "P";
          } else {
            newCell.innerText = "";
            newCell.className = "terrain_cell";
          }
  
          // check if there is an enemy village
          for (k in enemypos) {
            if (CurrentOrigin["x"] + j + 1 == enemypos[k]["x"] && CurrentOrigin["y"] + Rows == enemypos[k]["y"]) {
              newCell.className = "enemyVillage";
              newCell.id = "enemyVillage";
              newCell.innerHTML = "E";
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
            newCell.className = "terrain_cell";
          }
  
          // check if there is an enemy village
          for (let k in enemypos) {
            if (CurrentOrigin["x"] + j == enemypos[k]["x"] && CurrentOrigin["y"] == enemypos[k]["y"]) {
              newCell.className = "enemyVillage";
              newCell.id = "enemyVillage";
              newCell.innerHTML = "E";
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
          if (CurrentOrigin["x"] == player["x"] && CurrentOrigin["y"] + Rows - i + 1 == player["y"]) {
            newCell.className = "playerVillage";
            newCell.id = "playerVillage";
            newCell.innerHTML = "P";
          } else {
            newCell.innerText = "";
            newCell.className = "terrain_cell";
          }
          
          // check if there is an enemy village
          for (k in enemypos) {
            if (CurrentOrigin["x"] == enemypos[k]["x"] && CurrentOrigin["y"] + Rows - i + 1 == enemypos[k]["y"]) {
              newCell.className = "enemyVillage";
              newCell.id = "enemyVillage";
              newCell.innerHTML = "E";
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
          newCell = table.rows[i].insertCell(Cols-1);
          // i have to check if at the top there is the player village
          if (CurrentOrigin["x"] + Cols - 1 == player["x"] && CurrentOrigin["y"] + Rows - i - 1 == player["y"]) {
            newCell.className = "playerVillage";
            newCell.id = "playerVillage";
            newCell.innerHTML = "P";
          } else {
            newCell.innerText = "";
            newCell.className = "terrain_cell";
          }
  
          // check if there is an enemy village
          for (k in enemypos) {
            if (CurrentOrigin["x"] + Cols - 1 == enemypos[k]["x"] && CurrentOrigin["y"] + Rows - i - 1 == enemypos[k]["y"]) {
              newCell.className = "enemyVillage";
              newCell.id = "enemyVillage";
              newCell.innerHTML = "E";
            }
          }
        }
  
        break;
    }