import { pickRecords, printData, getData, sendData, getLocalData } from "../helper.js";

//use only getLocalData to get info

export function onLoad() {
  let table = document.getElementById("WarMap");
  let playerpos = getLocalData("player", "map");    // search in local cache player data
  playerpos = pickRecords(playerpos, ["x", "y"]);
  console.log(playerpos["x"]);


  for (var i = 0; i < 100+playerpos["x"]; i++) {
    var row = table.insertRow();
    for (var j = 0; j < 100+playerpos["y"]; j++) {
      var cell = row.insertCell();
      cell.innerHTML = "m";
      cell.classList.add("square");

      if (i-1 == playerpos["x"] && j-1 == playerpos["y"]) {
        cell.innerHTML = "P";                   // Set cell content to "P"
        cell.classList.remove("square");        // Remove square class
        cell.classList.add("playerVillage");    // Add player-village class
        cell.id = "playerVillage";              // Set the id of the cell to "player-village"
      }
    }
  }
  setHandlers();
  Player_Focus();
}


function Player_Focus() {

  let tableContainer = document.querySelector(".table-container");
  let playerCell = document.getElementById("playerVillage");

  // calcultate the offset of the player cell
  let offsetTop = playerCell.offsetTop - (tableContainer.offsetHeight / 2) + (playerCell.offsetHeight / 2);
  let offsetLeft = playerCell.offsetLeft - (tableContainer.offsetWidth / 2) + (playerCell.offsetWidth / 2);

  // apply the offset to the container
  tableContainer.scrollTop = offsetTop;
  tableContainer.scrollLeft = offsetLeft;
}

function setHandlers() {
  let tableContainer = document.getElementById("table-container");
  // handle the scroll event
  tableContainer.addEventListener("scroll", function(event){

   
    let table = document.getElementById("WarMap");
  
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  

    // Check if user has reached the right end of the table
    if (tableContainer.scrollLeft + tableContainer.clientWidth >= tableContainer.scrollWidth - 1) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < table.rows.length; j++) {
          // Add a cell to the end of each row for all rows
          let cell = table.rows[j].insertCell();
          cell.innerHTML = "m";
          cell.classList.add("square");

        }
      }
    }

    // Check if user has reached the top of the table
    if (tableContainer.scrollTop == 0) {
      for (let i = 0; i < 2; i++) {
        // Add a row to the top of the table
        let row = table.insertRow(0);
        for (let j = 0; j < table.rows[1].cells.length; j++) {
          // Add cells to the new row
          let cell = row.insertCell();
          cell.innerHTML = "m";
          cell.classList.add("square");
        }
      }
    }
});

}



function handleMouseMove(event) {
  let startX = event.pageX;
  let startY = event.pageY;
  let deltaX = event.pageX - startX;
  let deltaY = event.pageY - startY;
  table.scrollLeft = startScrollLeft - deltaX;
  table.scrollTop = startScrollTop - deltaY;
  let tableContainer = document.getElementById("table-container");
}

function handleMouseUp(event) {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}