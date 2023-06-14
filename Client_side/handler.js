// this file handles the first base functions of the game

// a function to handle requests for apecific objects to the backend
function getData(dataName) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "handler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        // Process data for the requested data name
        return data;
      } else {
        // Handle error
        console.log("Server returned error: " + xhr.status);
      }
    };
    xhr.onerror = function() {
        // Handle error
        console.log("Error occurred: " + xhr.status);
    };

    let formData = new FormData();
    formData.append("data", dataName);
    xhr.send(formData);
  }

// a function to set the handlers for the game
function setHandlers(){
    let t = document.getElementById("townhall");
    t.addEventListener("click", townhallClick);
    
}

// a function to handle the townhall click
function townhallClick(event){
    // get the info div
    let info = document.getElementById("info");
    // write a temporary message
    info.innerHTML = "Loading...";
    // call the getData function to get the townhall data
    let data = getData("townhall");
    // set the info div to the data
    info.innerHTML = data;
}