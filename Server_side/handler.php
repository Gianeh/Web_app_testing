<?php
    //log the error
    ini_set('display_errors', 1);

    // the session is sterted to keep track of unique csrf tokens
    session_start();
    // generate the token
    if (!isset($_SESSION["csrf_token"])) {
        $_SESSION["csrf_token"] = bin2hex(random_bytes(32));
    }

    // include the class files
    include_once('structures.php');

    // other inclusions here .........


    // instantiate a minimal cache object and save not already existing data
    $redis = new Redis();
    $redis->connect('AOS-Web-Testing.redis.cache.windows.net', 6379);
    $redis->auth('1QJ5aC5vpZESy1MYbw5oU42lnMixqxm0PAzCaHl4QH4='); // password for redis server

    // get the requested data from frontend (handler.js)
    $requestedData = $_POST["data"];
    // create the cache key based on the requested data and the csrf token
    $cache_key = $requestedData . "_data_" . $_SESSION["csrf_token"];
    //$cache_key = $requestedData;

    // check if the requested data is already in the cache otherwise get it from the database and save it in the cache
    $data = $redis->get($cache_key);
    if($data == false){
        // data not found in cache, instantiate object and store data in cache
        switch ($requestedData) {

            // ###############################################
            // # Data should be generated and added to cache #
            // # Based on the Database records but now we    #
            // # Just create a new object from scratch       #
            // # every time                                  #
            // ###############################################

            case "townhall":
                $townhall = new Townhall(1, "townhall");
                $data = $townhall->get_data();
                break;
            /*
            case "woodchopper":
                $school = new School(1, "school");
                $data = $school->getData();
                break;
            */
            // add more cases for other objects as needed

            default:
                // handle error
                $data = array("error" => "invalid data requested");
                break;
        }
        // save the data in the cache - third parameter is the time to live in seconds
        $redis->set($cache_key, json_encode($data), 3600);
    } else {
        // data found in cache, decode the JSON string
        $data = json_decode($data, true);
    }
    
    
    //return the data to the frontend
    //header("Content-Type: application/json");
    echo json_encode($data);

