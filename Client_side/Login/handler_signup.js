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
        console.log("Please fill all the fields!");
        return;
    }
    if(password != password2){
        alert("Passwords do not match!");
        console.log("Passwords do not match!");
        return;
    }
    
    // check for password validity (a valid pass contains a number , an upper and a lower case letter and is at least 8 characters long)
    let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if(!passRegex.test(password)){
        alert("Password must contain at least 8 characters, one number, one uppercase and one lowercase letter!");
        console.log("Password must contain at least 8 characters, one number, one uppercase and one lowercase letter!");
        return;
    }
    // check for username validity (a valid username contains only letters and numbers and is at least 4 characters long)
    let userRegex = /^[a-zA-Z0-9]{4,}$/;
    if(!userRegex.test(username)){
        alert("Username must contain at least 4 characters and contain only letters and numbers!");
        console.log("Username must contain at least 4 characters and contain only letters and numbers!");
        return;
    }

    // all previous controls are repeated in backend to prevent user from bypassing the frontend
    // I hate the users...

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../Server_side/Login/handler_signup.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log("Server returned: " + xhr.responseText);
        // decode the JSON response
        let output = JSON.parse(xhr.responseText);
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
    xhr.send("username=" + username + "&password=" + password + "&password2=" + password2);
}