// useful functions for client side

// a function that deletes records from a dictionary
export function pickRecords(data, records){
    for (let key in data){
        if(!(records.includes(key))) delete data[key];
    }
    return data;
}

// a function that enumerates a data (dictionary) object
export function printData(data){
    let text = "<h3>"+data["type"]+":</h3><br />";
    for (let key in data){
        if(key == "type") continue;
        text += key + ": " + data[key] + "<br />";
    }
    return text;
}

// a function to handle requests for a specific objects to the backend
export function getData(dataName, path) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", path, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let output = "";
    xhr.onload = function() {
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