// The file that handles the signup action for a new user

export function setHandlers(){
    let submit = document.getElementById("submit");
    submit.addEventListener("click", submitClick);
}

function submitClick(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    // if any of the previous is empty
    if(username == "" || password == "" || password2 == ""){
        alert("Please fill all the fields!");
        return;
    }
    if(password != password2){
        alert("Passwords do not match!");
        return;
    }
    // password should be veriefied to match security concerns
    // all previous controls are repeated in backend to prevent user from bypassing the frontend
    // I hate the users...

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../Server_side/Login/signup_handler.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log("Server returned: " + xhr.responseText);
        // decode the JSON response
        output = JSON.parse(xhr.responseText);
        if(output["status"] == "success"){
            window.location.href = "../Client_side/Village/village.html";
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
    xhr.send("username=" + username + "&password=" + password + "&email=" + email);
}