// Player_Focus function to focus on the player cell
export function PlayerFocus() {

    let tableContainer = document.querySelector(".table-container");
    let playerCell = document.getElementById("playerVillage");
  
    // calcultate the offset of the player cell
    let offsetTop = playerCell.offsetTop - (tableContainer.offsetHeight / 2) + (playerCell.offsetHeight / 2);
    let offsetLeft = playerCell.offsetLeft - (tableContainer.offsetWidth / 2) + (playerCell.offsetWidth / 2);
  
    // apply the offset to the container
    tableContainer.scrollTop = offsetTop;
    tableContainer.scrollLeft = offsetLeft;
  }
  
  export function setHandlers() {
    let tableContainer = document.querySelector(".table-container");
    tableContainer.addEventListener("scroll", ScrollHandler);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    let PlayerReFocus = document.getElementById("PlayerReFocus");
    PlayerReFocus.addEventListener("click", PlayerFocus);
  }
  // ScrollHandler function to handle the scroll event and add more rows and columns
    function ScrollHandler() {
    

    let table = document.getElementById("WarMap");
    let tableContainer = document.querySelector(".table-container");
  
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
  
    // Check if user has reached the bottom of the table and add 2 more rows
    if (tableContainer.scrollTop - 1 == 0) {
      for (let i = 0; i < 2; i++) {
        let row = table.insertRow(0);
        for (let j = 0; j < table.rows[1].cells.length; j++) {
          let cell = row.insertCell();
          cell.innerHTML = "m";
          cell.classList.add("square");
        }
      }
    }
  }
  
  function handleMouseMove(event) {
    let startX = event.pageX;
    let startY = event.pageY;
    var deltaX = event.pageX - startX;
    var deltaY = event.pageY - startY;
    let table = document.getElementById("WarMap");
    table.scrollLeft = startScrollLeft - deltaX;
    table.scrollTop = startScrollTop - deltaY;
    let tableContainer = document.getElementById("table-container");
  }
  
  function handleMouseUp(event) {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }
