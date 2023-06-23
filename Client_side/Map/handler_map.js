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

      if (i == playerpos["x"] && j == playerpos["y"]) {
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
          let cell = table.rows[j].insertCell();
          cell.innerHTML = "m";
          cell.classList.add("square");

        }
      }
    }

    // Check if user has reached the bottom of the table
    if (tableContainer.scrollTop == 0) {
      for (let i = 0; i < 2; i++) {
        let row = table.insertRow();
        for (let j = 0; j < table.rows[0].cells.length; j++) {
          let cell = row.insertCell();
          cell.innerHTML = "m";
          cell.classList.add("square");
        }
      }
    }
});

}



function handleMouseMove(event) {
  var deltaX = event.pageX - startX;
  var deltaY = event.pageY - startY;
  table.scrollLeft = startScrollLeft - deltaX;
  table.scrollTop = startScrollTop - deltaY;
  let tableContainer = document.getElementById("table-container");
}

function handleMouseUp(event) {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}