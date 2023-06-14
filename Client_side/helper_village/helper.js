// some useful functions for the village handler file

// a function that enumerates a data (dictionary) object
function printData(data){
    let text = "<h3>"+data["type"]+":</h3><br />";
    for (let key in data){
        if(key == "type") continue;
        text += key + ": " + data[key] + "<br />";
    }
    return text;
}

// a function to handle requests for a specific objects to the backend
function getData(dataName) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "Server_side/handler_village.php", false);
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