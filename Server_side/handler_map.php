<?php
    //log the error
    ini_set('display_errors', 1);
    // include the chache class
    include_once('redis_cache.php');
    // the session is started to keep track of unique csrf tokens
    session_start();
    // generate the token
    if (!isset($_SESSION["csrf_token"])) {
        $_SESSION["csrf_token"] = bin2hex(random_bytes(32));
    }

    // create a new cache object
    $cache = new Cache(array("player"));

    // get the requested data from frontend (handler.js)
    $data = $cache->acquireData($_POST["data"], $_SESSION["csrf_token"]);

    //return the data to the frontend
    echo json_encode($data);

