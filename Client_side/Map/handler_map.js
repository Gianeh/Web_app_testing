import { pickRecords, printData, getData, sendData, getLocalData } from "../helper.js";

//use only getLocalData to get info

export function onLoad() {
  let table = document.getElementById("WarMap");

  let playerpos = getLocalData("player", "map");    // search in local cache player data
  playerpos = pickRecords(playerpos,["x","y"]);
 // console.log(playerpos,["x","y"]);

  for (var i = 0; i < 90; i++) {  
    var row = table.insertRow();
    for (var j = 0; j < 90; j++) {
      var cell = row.insertCell();
      cell.innerHTML = "m";
      cell.classList.add("square");

      if (i === playerpos["x"] && j === playerpos["y"]) {
        cell.innerHTML = "P";                   // Set cell content to "P"
        cell.classList.remove("square");        // Remove square class
        cell.classList.add("playerVillage");    // Add player-village class
        cell.id = "playerVillage";              // Set the id of the cell to "player-village"
      }
    }
  }
  setHandlers();
}

/*
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
*/

function setHandlers() {
  //document.addEventListener("DOMContentLoaded", Player_Focus());
  let tableContainer = document.getElementById("table-container");
  let table = document.getElementById("my-table");
  tableContainer.addEventListener("scroll", function() {
    if (tableContainer.scrollTop + tableContainer.clientHeight >= tableContainer.scrollHeight) {
        // generate more rows and append to the table
        for(let i = 0; i < 10; i++) {
          let row = table.insertRow();
          for (let j = 0; j < table.rows[0].length; j++) {
            let cell = row.insertCell();
            cell.innerHTML = "m";
            cell.classList.add("square");
          }
        }
    }else if (tableContainer.scrollLeft + tableContainer.clientWidth >= tableContainer.scrollWidth) {
        // generate more columns and append to the table
        for(let i = 0; i < table.rows.length; i++) {
          let cell = table.rows[i].insertCell();
          cell.innerHTML = "m";
          cell.classList.add("square");
          }
    }else if (tableContainer.scrollTop === 0) {
        // generate more rows and prepend to the table
        for(let i = 0; i < 10; i++) {
          let row = table.insertRow(0);
          for (let j = 0; j < table.rows[0].length; j++) {
            let cell = row.insertCell();
            cell.innerHTML = "m";
            cell.classList.add("square");
          }
        }
    }else if (tableContainer.scrollLeft === 0) {
        // generate more columns and prepend to the table
        for(let i = 0; i < table.rows.length; i++) {
          let cell = table.rows[i].insertCell(0);
          cell.innerHTML = "m";
          cell.classList.add("square");
          }
    }
  });

  table.addEventListener("mousedown", function(event) {
      var startX = event.pageX;
      var startY = event.pageY;
      var startScrollLeft = table.scrollLeft;
      var startScrollTop = table.scrollTop;

      function handleMouseMove(event) {
          var deltaX = event.pageX - startX;
          var deltaY = event.pageY - startY;
          table.scrollLeft = startScrollLeft - deltaX;
          table.scrollTop = startScrollTop - deltaY;
      }

      function handleMouseUp(event) {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });
}