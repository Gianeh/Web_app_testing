<?php
    //log the error
    ini_set('display_errors', 1);
    // include the chache class
    include_once('update_functions.php');
    include_once('../redis_cache.php');

    $secret_key = '6Lc6BqUUAAAAAFCZ3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z';
    $user_id = $_SESSION['user_id'];    // retrieve user_id from session
    $_SESSION['user_id'] = $user_id;    // update session to increase lifetime
    $token = hash("sha256", $secret_key.$user_id);

    if(!isset($_POST["function"])){ // retrieve data!
        // create a new cache object
        $cache = new Cache(array("player", "structures"));

        // get the requested data from frontend (handler.js) inside the POST request and search for the data in the cache
        /*
        $data = $cache->acquireData($_POST["data"], $_SESSION["csrf_token"]);
        */
        $data = $cache->acquireData($_POST["data"], $token);

        //return the data to the frontend
        echo json_encode($data);

    }else{                          // send data!
        // get the requested data from frontend (handler.js) inside the POST request and search for the appropriate function
        switch($_POST["function"]){
            case "SendTroops":
                $status = SendTroops($token);
                break;
            }
        
        // return status
        echo json_encode($status);
    }

    ///
    // Implementare funzioni per strutture e interazioni utente
    // 