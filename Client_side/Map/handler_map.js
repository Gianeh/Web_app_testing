import { pickRecords, printData, getData, sendData, getLocalData } from "../helper.js";

//use only getLocalData to get info

export function onLoad() {
  let table = document.getElementById("WarMap");
  let playerpos = getLocalData("player", "map");    // search in local cache player data
  playerpos = pickRecords(playerpos, ["x", "y"]);
  console.log(playerpos);


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
  
  // handle the scroll event
  tableContainer.addEventListener("scroll", function(event){

    let tableContainer = document.getElementById("table-container");
    let table = document.getElementById("WarMap");
  
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  

    // Check if user has reached the right end of the table
    if (tableContainer.scrollLeft + tableContainer.clientWidth >= tableContainer.scrollWidth - 1) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < table.rows.length; j++) {
          let cell = table.rows[j].insertCell();
          cell.innerHTML = "New";
          cell.classList.add("square");
          cell.style.width = "30px";
          cell.style.height = "30px";
          cell.style.border = "1px solid black";
          cell.style.backgroundColor = "green";
        }
      }
    }

    // Check if user has reached the bottom of the table
    if (tableContainer.scrollTop + tableContainer.clientHeight >= tableContainer.scrollHeight - 1) {
      for (let i = 0; i < 2; i++) {
        let row = table.insertRow();
        for (let j = 0; j < table.rows[0].cells.length; j++) {
          let cell = row.insertCell();
          cell.innerHTML = "New";
          cell.classList.add("square");
          cell.style.width = "30px";
          cell.style.height = "30px";
          cell.style.border = "1px solid black";
          cell.style.backgroundColor = "green";
        }
      }
    }
});

  /*  
    tableContainer.addEventListener("scroll", function() {
      // always readd this properties to cells:
      // width: 30px;
      // height: 30px;
      // border: 1px solid black;
      // background-color: green;
  
  
      // check if the player has now at the top or bottom of the table
  
      if (tableContainer.scrollTop + tableContainer.clientHeight >= tableContainer.scrollHeight) {
        // generate more rows and append to the table
        for (let i = 0; i < 2; i++) {
          let row = table.insertRow();
          for (let j = 0; j < table.rows[0].cells.length; j++) {
            let cell = row.insertCell();
            cell.innerHTML = "m";
            cell.classList.add("square");
            cell.style.width = "30px";
            cell.style.height = "30px";
            cell.style.border = "1px solid black";
            cell.style.backgroundColor = "green";
          }
        }
      } else if (tableContainer.scrollTop === 0) {
        // generate more rows and prepend to the table
        for (let i = 0; i < 2; i++) {
          let row = table.insertRow(0);
          for (let j = 0; j < table.rows[0].cells.length; j++) {
            let cell = row.insertCell();
            cell.innerHTML = "m";
            cell.classList.add("square");
            cell.style.width = "30px";
            cell.style.height = "30px";
            cell.style.border = "1px solid black";
            cell.style.backgroundColor = "green";
          }
        }
        // adjust scroll position to maintain the same view
        tableContainer.scrollTop += tableContainer.scrollHeight / 10;
      }
      
      if (tableContainer.scrollLeft + tableContainer.clientWidth >= tableContainer.scrollWidth) {
        // generate more columns and append to the table
        for(let i = 0; i < 2; i++){
          for (let j = 0; j < table.rows.length + 1 - i; j++) {
            let cell = table.rows[j].insertCell();
            cell.innerHTML = "m";
            cell.classList.add("square");
            cell.style.width = "30px";
            cell.style.height = "30px";
            cell.style.border = "1px solid black";
            cell.style.backgroundColor = "green";
          }
        }
      } else if (tableContainer.scrollLeft === 0) {
        // generate more columns and prepend to the table
        for(let i = 0; i < 2; i++){
          for (let j = 0; j < table.rows.length + 1 - i; j++) {
            let cell = table.rows[j].insertCell(0);
            cell.innerHTML = "m";
            cell.classList.add("square");
            cell.style.width = "30px";
            cell.style.height = "30px";
            cell.style.border = "1px solid black";
            cell.style.backgroundColor = "green";
          }
        }
        // adjust scroll position to maintain the same view
        tableContainer.scrollLeft += tableContainer.scrollWidth / table.rows[0].cells.length;
      }
    });
  */
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