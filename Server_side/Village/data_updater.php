<?php
    //log the error
    ini_set('display_errors', 1);
    // include the chache class
    include_once('redis_cache.php');
    include_once('update_functions.php');

    $secret_key = '6Lc6BqUUAAAAAFCZ3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z';
    $user_id = $_POST['user_id'];
    $token = hash("sha256", $secret_key.$user_id);

    // create a new cache object
    $cache = new Cache(array("player", "structures"));

    // get the requested data from frontend (handler.js) inside the POST request and search for the appropriate function
    switch($_POST["function"]){
        case "addPopulation":
            $status = addPopulation($token);
            break;
    }
    
    // return status
    echo json_encode($status);
