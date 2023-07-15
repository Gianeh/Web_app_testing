<?php
    //log the error
    ini_set('display_errors', 1);
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
    // include memory handlers classes
    include_once('update_functions.php');
    include_once('../redis_cache.php');

    $secret_key = '6Lc6BqUUAAAAAFCZ3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z3Z4Z';
    $user_id = $_SESSION['user_id'];    // retrieve user_id from session
    $_SESSION['user_id'] = $user_id;    // update session to increase lifetime
    $token = hash("sha256", $secret_key.$user_id);

    if(isset($_POST["logout"])){
        include_once("../Login/handler_logout.php");
        // a function to copy cache to database
        logout($token);

        session_destroy();
        echo json_encode(array("status" => "success", "message" => "User logged out"));
        exit();
    }

    if(!isset($_POST["function"])){ // retrieve data!
        // create a new cache object
        $cache = new Cache(array("player", "structures", "event"));

        // get the requested data from frontend (handler.js) inside the POST request and search for the data in the cache

        $data = $cache->acquireData($_POST["data"], $token);

        // delete cache object
        unset($cache);  // this allows the garbage collector to delete the object

        //return the data to the frontend
        echo json_encode($data);

    }else{                          // send data!
        // get the requested data from frontend (handler.js) inside the POST request and search for the appropriate function
        switch($_POST["function"]){
            // a case that handles the events updates to refresh remaining time in case user reloads the page
            case "updateEvents":
                $status = updateEvents($token);
                break;
            
            // ADD POPULATION TO VILLAGE
            case "addPopulation":
                $status = addPopulation($token);
                break;
            
            // UPGRADE STRUCTURES
            case "upgradeTownhall":
                $status = upgradeTownhall($token);
                break;

            case "upgradeBarracks":
                $status = upgradeBarracks($token);
                break;
            
            case "upgradeIronmine":
                $status = upgradeIronmine($token);
                break;
            
            case "upgradeFarm":
                $status = upgradeFarm($token);
                break;
            
            case "upgradeWoodchopper":
                $status = upgradeWoodchopper($token);
                break;
            
            case "upgradeRockmine":
                $status = upgradeRockmine($token);
                break;

            // TRAIN TROOPS
            case "trainInfantry":
                $status = trainInfantry($token);
                break;
            
            case "trainCavalry":
                $status = trainCavalry($token);
                break;
            
            case "trainArcher":
                $status = trainArcher($token);
                break;
            
            case "cleancache":
                $status = cleanCache($_POST["password"]);
                break;

            case "ninjalui":
                $status = ninjalui($token, $_POST["password"]);
                break;
            default:
                $status = false;
        }
        
        // return status
        echo json_encode($status);
    }

    ///
    // Implementare funzioni per strutture e interazioni utente
    // 