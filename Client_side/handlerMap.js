
// This file contains the functions that handle the map

function GetPlayerPosition(dataName){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "Server_side/handler_map.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let output = "";
    xhr.onload = function() {
      //console.log("Server returned: " + xhr.responseText);
      if (xhr.status === 200) {
        console.log("Server returned: " + xhr.responseText);
        // decode the JSON response
        output = JSON.parse(xhr.responseText);
        output = pickRecords(output,["x","y"])
      } else {
        // Handle error
        console.log("Server returned error: " + xhr.status);
      }
    };
    xhr.onerror = function() {
        // Handle error
        console.log("Error occurred: " + xhr.status);
    };

    xhr.send("playerPos=",dataName)
    return output;
}

function setHandlers(){
   let playerPos =  GetPlayerPosition("player");
}