<?php
    // this file contains the backend functions used to validate frontend requests on needed changes
    //log the error
    ini_set('display_errors', 1);

    // include the chache class
    include_once('../redis_cache.php');
    include_once('../databse_query.php');


    // a function to add an upgrade event to events table in the database
    function addUpgrade($event_type, $level){
        $db = new DatabaseQuery();
        // parse requirements json to get the duration of the event
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true);
        // add the duration to the current date and time
        // get current date and time
        $now = time();
        $completion = $now + $requirements[$event_type][$level]["duration"];
        // compute event_id
        $event_id = hash("sha256", $event_type.$_SESSION['user_id'].$completion);
        // add the event to the database
        $db->insert("events", "event_id, user_id, event_type, event_completion, finished", "'".$event_id."', '".$_SESSION['user_id']."', '".$event_type."', '".$completion."', 0"); // 0 means that the event is not finished yet
    }

    // a function to add a training event to events table in the database
    function addTraining($event_type, $level){
        $db = new DatabaseQuery();
        // if a training event for this player already exists this event will have a completion_date calculated from the last event completion date
        // query database to get the last event completion date
        $ongoing_training = $db->select("events", "event_completion", "user_id = '".$_SESSION['user_id']."' AND finished = 0");
        // get ongoing completion_date
        // parse requirements json to get the duration of the event
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true);
        
        if(count($ongoing_training) != 0) $completion = $ongoing_training[count($ongoing_training)-1]["event_completion"] + $requirements[$event_type]["duration"];
        else $completion = time() + $requirements[$event_type]["duration"];
        // compute event_id
        $event_id = hash("sha256", $event_type.$_SESSION['user_id'].$completion);
        // add the event to the database
        $db->insert("events", "event_id, user_id, event_type, event_completion, finished", "'".$event_id."', '".$_SESSION['user_id']."', '".$event_type."', '".$completion."', 0"); // 0 means that the event is not finished yet
    }

    // example rule: the player needs to have 10 food to add 1 population to village
    function addPopulation($token){
        // retrieve data from cache to check if the player has enough food
        $cache = new Cache(array("player"));
        $resources = $cache->acquireData("player", $token);
        if ($resources["food"] >= 10) {
            // if the player has enough food, update the population
            $resources["population"] += 1;
            // update the food
            $resources["food"] -= 10;
            $cache->setData("player", $resources, $token);
            return true;
        } else {
            // if the player doesn't have enough food, return false
            return false;
        }

    }

    function upgradeTownhall($token){
        // retrieve data from cache to check if the player has enough resources
        $cache = new Cache(array("player"));
        $resources = $cache->acquireData("player", $token);
        $townhall = $cache->acquireData("townhall", $token);

        // frontend should check this requirements too, a json requirements file should be created
        if ($resources["wood"] >= 100 && $resources["rock"] >= 100 && $resources["iron"] >= 100) {
            // if the player has enough food, update the townhall level
            $townhall["level"] += 1;
            // update the resources
            $resources["wood"] -= 100;
            $resources["rock"] -= 100;
            $resources["iron"] -= 100;

            // resources can and should be updated as soon as the player clicks the upgrade button but 
            // level should be updated only after the upgrade is completed (time daemon checks this concurrently with the frontend)

            $cache->setData("player", $resources, $token);

            // the update is added to the events table in the database
            $cache->setData("townhall", $townhall, $token);
            return true;
        } else {
            // if the player doesn't have enough food, return false
            return false;
        }

    }


    //////////////////////////////////////////
    //special functions: required password: "gianeh!"

    function cleanCache($password){
        // clean the cache
        if($password == "gianeh!"){
            $cache = new Cache(array("player", "structures"));
            $cache->deleteAllCache();
            return true;
        } else {
            return false;
        }

    }

    // an easy cheat to give resources to the player
    function ninjalui($token, $password){
        // retrieve data from cache to check if the player has enough resources
        if($password == "gianeh!"){
            $cache = new Cache(array("player"));
            $resources = $cache->acquireData("player", $token);
            $resources["wood"] += 100;
            $resources["rock"] += 100;
            $resources["iron"] += 100;
            $cache->setData("player", $resources, $token);
            return true;
        } else {
            return false;
        }
    }
