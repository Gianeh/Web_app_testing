
// This file contains the functions that handle the map

// a function that deletes records from a dictionary
function pickRecords(data, records){
  for (let key in data){
      if(!(records.includes(key))) delete data[key];
  }
  return data;
}

function GetPlayerPosition(dataName){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "Server_side/Map/handler_map.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let output = "";
    xhr.onload = function() {
      //console.log("Server returned: " + xhr.responseText);
      if (xhr.status === 200) {
        console.log("Server returned: " + xhr.responseText);
        // decode the JSON response
        output = JSON.parse(xhr.responseText);
        output = pickRecords(output,["x","y"])
        console.log(output);
      } else {
        // Handle error
        console.log("Server returned error: " + xhr.status);
      }
    };
    xhr.onerror = function() {
        // Handle error
        console.log("Error occurred: " + xhr.status);
    };

    xhr.send("data="+dataName)
    return output;
}

function setHandlers(){
   let playerPos =  GetPlayerPosition("player");
}