<?php 
    // log the error
    ini_set('display_errors', 1);

    if(!isset($_POST["username"]) || !isset($_POST["password"])){
        echo json_encode(array("status" => "error", "message" => "Missing parameters"));
        exit();
    }

    //get username and password
    $username = $_POST["username"];
    $password = $_POST["password"];

    // check the database to be sure that the username exist
    include_once("../database_query.php");
    include_once("user_id_encoder.php");
    $user_id = encode($username);
    $connection = new DatabaseQuery();
    $matching_users = $connection->RetriveData("*", "users", "username = '$username' AND password = '$password'");

    if(count($matching_users) == 0){
        echo json_encode(array("status" => "error", "message" => "Wrong username or password"));
        exit();
    }

    session_start();
    $_SESSION["user_id"] = $user_id;

    // if everything is ok, log the user in
    echo json_encode(array("status" => "success", "message" => "User logged in"));