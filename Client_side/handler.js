// this file handles the first base functions of the game

// a function to handle requests for a specific objects to the backend
function getData(dataName) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "Server_side/handler.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let output = "";
    xhr.onload = function() {
      //console.log("Server returned: " + xhr.responseText);
      if (xhr.status === 200) {
        console.log("Server returned: " + xhr.responseText);
        // decode the JSON response
        output = JSON.parse(xhr.responseText);

      } else {
        // Handle error
        console.log("Server returned error: " + xhr.status);
      }
    };
    xhr.onerror = function() {
        // Handle error
        console.log("Error occurred: " + xhr.status);
    };

    //let formData = new FormData();
    //formData.append("data", dataName);
    xhr.send("data=" + dataName);
    return output;
}

// a function that enumerates a data (dictionary) object
function enumerateData(data){
    let text = "";
    for (let key in data){
        text += key + ": " + data[key] + "<br>";
    }
    return text;
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
    info.innerHTML = enumerateData(data);
}