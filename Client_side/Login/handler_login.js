import {pickRecords, printData, getLocalData, sendData} from "../helper.js";

//a function that set handlers for the login page
export function setHandlers(){
    let submit = document.getElementById("submit");
    submit.addEventListener("click", submitClick);
}

//a function that handles the login action
function submitClick(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    // if any of the previous is empty
    if(username == "" || password == ""){
        alert("Please fill all the fields!");
        return;
    }
    // password should be veriefied to match security concerns
    // all previous controls are repeated in backend to prevent user from bypassing the frontend
    // I hate the users...

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../Server_side/Login/login_handler.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log("Server returned: " + xhr.responseText);
        // decode the JSON response
        let output = JSON.parse(xhr.responseText);
        //if the login was successful, redirect to the village page adding on param the username 
        // is not the safest way i know it
        if(output["status"] == "success"){
            window.location.href = "Village.html";
        }else{
            alert(output["message"]);
        }
      } else {
        // Handle error
        console.log("Server returned error: " + xhr.status);
      }
    };
    xhr.onerror = function() {
        // Handle error
        console.log("Error occurred: " + xhr.status);
    };
    xhr.send("username=" + username + "&password=" + password);
}

