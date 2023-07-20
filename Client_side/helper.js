// useful functions for client side

// the path to the backend file that handles the requests to cache and database
var backend_village = "../Server_side/Village/data_interface.php";
var backend_map = "../Server_side/Map/data_interface.php";
var backend_database = "../Server_side/Map/database_interface.php";

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

// a function that parses the requirements.json file and returns resources and duration in the string format: "[resource1, resource2, ..., duration seconds]"
export function parseRequirements(data, level=0){
    // open file
    let xhr = new XMLHttpRequest();
    let path = "../Server_side/requirements.json";
    let array;
    xhr.open("GET", path, false);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                //console.log(xhr.responseText); //debug option but too verbose!
                array = JSON.parse(xhr.responseText);
            }
        }else{
            console.log("Error occurred: " + xhr.status);
        }
    }
    xhr.send(null);
    let text = "[";
    for (let key in array){
        if(key == data){
          if(level == 0){
            for (let key2 in array[key]){
                if(key2 == "duration"){
                    text += array[key][key2] + " seconds]";
                    continue;
                }
                text += key2 + ": " + array[key][key2] + ", ";
            }
          }else{
            for (let key2 in array[key][level]){
                if(key2 == "duration"){
                    text += array[key][level][key2] + " seconds]";
                    continue;
                }
                text += key2 + ": " + array[key][level][key2] + ", ";
            }
          }
            
        }
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

// a function to handle requests for a specific objects to the backend inside the database with a parametr for where clause
export function getDataWithParameter(dataName, parameter, colums) {
  let xhr = new XMLHttpRequest();
  // set the path to the backend file that handles the direct request to database
  let path = backend_database;
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

  // send data and parametr for a specific request
  xhr.send("data=" + dataName + "&parameter=" + parameter + "&colums=" + colums);
  return output;
}

// a function to send new data to the backend
export function sendData(func="none", password="", path="") {
    if(path == "village") path = backend_village;
    else if(path == "map") path = backend_map;
    else path = backend_village;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", path, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log("Server returned: " + xhr.responseText);
      } else {
        // Handle error
        console.log("Server returned error: " + xhr.status);
      }
    }
    xhr.onerror = function() {
        // Handle error
        console.log("Error occurred: " + xhr.status);
    }
    xhr.send("function=" + func + "&password=" + password);
}

// a modified version of sendData that sends data to the backend but also returns a response
export function checkEvents(func="none", path="") {
  if(path == "village") path = backend_village;
  else if(path == "map") path = backend_map;
  else path = backend_village;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", path, false);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log("Server returned: " + xhr.responseText);
      return JSON.parse(xhr.responseText);
    } else {
      // Handle error
      console.log("Server returned error: " + xhr.status);
    }
  }
  xhr.onerror = function() {
      // Handle error
      console.log("Error occurred: " + xhr.status);
  }
  xhr.send("function=" + func);
}

// a function that manages the local storage queries and retrieves from the redis cache if needed (redis cache queries the database if needed)
export function getLocalData(dataName, path=""){
    if(path == "village") path = backend_village;
    else if(path == "map") path = backend_map;
    else path = backend_village;

    if(localStorage[dataName] == null){
        let data = getData(dataName, path);
        localStorage[dataName] = JSON.stringify(data);
        return data;
    }else{
        return JSON.parse(localStorage[dataName]);
    }
}

// a function to logout the user
export function logout(path=""){
  if(path == "village") path = backend_village;
    else if(path == "map") path = backend_map;
    else path = backend_village;  // defaults to Village/data_interface.php

    let xhr = new XMLHttpRequest();
    xhr.open("POST", path, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log("Server returned: " + xhr.responseText);
        // href to index.html
        window.location.href = "../../index.html";
      } else {
        // Handle error
        console.log("Server returned error: " + xhr.status);
      }
    }
    xhr.onerror = function() {
        // Handle error
        console.log("Error occurred: " + xhr.status);
    }
    xhr.send("logout=" + 1);
}

// this function may call a global backend function to update the database with events that are just saved in cache

