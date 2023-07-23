<?php 
    // log the error
    ini_set('display_errors', 1);
    if (session_status() !== PHP_SESSION_ACTIVE) {
        ini_set('session.gc_maxlifetime', 30); // 1800 seconds = 30 minutes
        session_start();
    }

    if(!isset($_POST["username"]) || !isset($_POST["password"])){
        echo json_encode(array("status" => "error", "message" => "Missing parameters"));
        exit();
    }

    //get username and password
    $username = strtolower($_POST["username"]);
    $password = $_POST["password"];

    // check the database to be sure that the username exist
    include_once("../database_query.php");

    $key = 42;
    $user_id = hash("sha256", $username.$key);
    $connection = new DatabaseQuery();
    $matching_users = $connection->select("*", "users", "username = '$username' AND password = '$password'");

    if(count($matching_users) == 0){
        echo json_encode(array("status" => "error", "message" => "Wrong username or password"));
        exit();
    }

    
    $_SESSION["user_id"] = $user_id;

    // here the database should be updated to with online status for every event in order for the Daemon not to touch them
    include_once("../database_query.php");
    $db = new DatabaseQuery();
    $db->update("events", "online", "1", "user_id = '$user_id'");

    // if everything is ok, log the user in
    echo json_encode(array("status" => "success", "message" => "User logged in"));