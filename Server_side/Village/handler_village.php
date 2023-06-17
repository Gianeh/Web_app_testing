<?php
    //log the error
    ini_set('display_errors', 1);
    // include the chache class
    include_once('../redis_cache.php');
    /*
    // the session is started to keep track of unique csrf tokens
    session_start();
    // generate the token
    if (!isset($_SESSION["csrf_token"])) {
        $_SESSION["csrf_token"] = bin2hex(random_bytes(32));
    }
    */  //CSRF TOKEN IS NOT THAWAY
    $secret_key = '6Lc6BqUUAAAAAFCZ3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z';
    $user_id = $_POST['user_id'];
    $token = hash("sha256", $secret_key.$user_id);


    // create a new cache object
    $cache = new Cache(array("player", "structures"));

    // get the requested data from frontend (handler.js) inside the POST request and search for the data in the cache
    /*
    $data = $cache->acquireData($_POST["data"], $_SESSION["csrf_token"]);
    */
    $data = $cache->acquireData($_POST["data"], $token);

    //return the data to the frontend
    echo json_encode($data);

