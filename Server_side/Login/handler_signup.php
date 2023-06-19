<?php
    // log the error
    ini_set('display_errors', 1);

    if(!isset($_POST["username"]) || !isset($_POST["password"]) || !isset($_POST["email"])){
        echo json_encode(array("status" => "error", "message" => "Missing parameters"));
        exit();
    }

    $username = $_POST["username"];
    $password = $_POST["password"];
    $password2 = $_POST["password2"];

    // check if passwords match
    if($password != $password2){
        echo json_encode(array("status" => "error", "message" => "Passwords don't match"));
        exit();
    }

    // various checks on username validity and password strength

    // check the database to be sure that the username is not already taken
    include_once("../database_query.php");
    include_once("user_id_encoder.php");
    $user_id = encode($username);
    $connection = new DatabaseQuery();
    $matching_users = $connection->retriveData("*", "user", "username = '$username'");

    if(count($matching_users) > 0){
        echo json_encode(array("status" => "error", "message" => "Username already taken"));
        exit();
    }

    // if everything is ok, insert the new user in the database
    $connection->insert("users", "user_id, username, password", "'$user_id','$username', '$password'");
    session_start();
    $_SESSION["user_id"] = $user_id;
    echo json_encode(array("status" => "success", "message" => "User created"));
?>