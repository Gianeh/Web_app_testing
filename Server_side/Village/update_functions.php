<?php
    // this file contains the backend functions used to validate frontend requests on needed changes
    //log the error
    ini_set('display_errors', 1);

    // include the chache class
    include_once('../redis_cache.php');
    include_once('../database_query.php');

    // a function to add a training event to events table in the cache
    function addTraining($event_type, $last_completion, $database){
        // parse requirements json to get the duration of the event
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true);
        
        $completion = time() + $requirements[$event_type]["duration"] + $last_completion;
        // compute event_id
        $event_id = hash("sha256", $event_type.$_SESSION['user_id'].$completion);
        // add the event in database
        $database->insert("events", "event_id, user_id, event_type, level, event_completion, online, finished", "'".$event_id."', '".$_SESSION['user_id']."', '".$event_type."', 1, '".$completion."', 1, 0"); // 0 means that the event is not finished yet
    }


    function addUpgrade($event_type, $level, $database){
        // parse requirements json to get the duration of the event
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true);
        // add the duration to the current date and time
        // get current date and time
        $now = time();
        $completion = $now + $requirements[$event_type][$level]["duration"];
        // compute event_id
        $event_id = hash("sha256", $event_type.$_SESSION['user_id'].$completion);
        // add event in database
        $database->insert("events", "event_id, user_id, event_type, level, event_completion, online, finished", "'".$event_id."', '".$_SESSION['user_id']."', '".$event_type."', '".$level."', '".$completion."', 1, 0"); // 0 means that the event is not finished yet
    }


    // a function that deletes the events records from cache and triggers a new databse call trough the acquireData function
    function updateEvents($token){
        $cache = new Cache(array("player", "structures", "event"));
        // upgrades deletion
        $cache->deleteData("townhall_upgrade", $token);
        $cache->deleteData("barracks_upgrade", $token);
        $cache->deleteData("farm_upgrade", $token);
        $cache->deleteData("woodchopper_upgrade", $token);
        $cache->deleteData("rockmine_upgrade", $token);
        $cache->deleteData("ironmine_upgrade", $token);
        // training deletion
        $cache->deleteData("infantry_training", $token);
        $cache->deleteData("archer_training", $token);
        $cache->deleteData("cavalry_training", $token);
        // production will need to be added here
        
        // upgrades retrieval
        $cache->acquireData("townhall_upgrade", $token);
        $cache->acquireData("barracks_upgrade", $token);
        $cache->acquireData("farm_upgrade", $token);
        $cache->acquireData("woodchopper_upgrade", $token);
        $cache->acquireData("rockmine_upgrade", $token);
        $cache->acquireData("ironmine_upgrade", $token);
        // training retrieval
        $cache->acquireData("infantry_training", $token);
        $cache->acquireData("archer_training", $token);
        $cache->acquireData("cavalry_training", $token);
        unset($cache);
        return true;
    }

    function addPopulation($token){
        // retrieve data from cache to check if the player has enough food
        $cache = new Cache(array("player"));
        $resources = $cache->acquireData("player", $token);
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true)["add_population"];
        foreach ($requirements as $key => $value) {
            if($resources[$key] < $value) return false;
        }
        // add population as duration is 0
        $resources["population"] += 1;
        // update the resources
        foreach ($requirements as $key => $value) {
            if($key == "duration") continue; // skip duration check as it's not a resource
            $resources[$key] -= $value;
        }
        // add population is an immediate action so it can be added to the cache
        $cache->setData("player", $resources, $token);
        return true;

    }
    // UPGRADES FUNCTIONS:
    function upgradeTownhall($token){
        // retrieve data from cache to check if the player has enough resources
        $cache = new Cache(array("player"));
        $resources = $cache->acquireData("player", $token);
        $townhall = $cache->acquireData("townhall", $token);

        // make sure to remove upgrade event from cache as it's first added onclick
        $ongoing = $cache->acquireData("townhall_upgrade", $token);
        if($ongoing["status"] == "success"){
            return "upgrade already ongoing";
        }

        //parse the requirements json file
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true)["townhall_upgrade"][$townhall["level"] + 1];
        foreach ($requirements as $key => $value) {
            if($key == "duration") continue; // skip duration check as it's not a resource
            if($resources[$key] < $value) return false;
        }
        // update the resources
        foreach ($requirements as $key => $value) {
            if($key == "duration") continue; // skip duration check as it's not a resource
            $resources[$key] -= $value;
        }
        // resources can and should be updated as soon as the player clicks the upgrade button but 
        // level should be updated only after the upgrade is completed (time daemon checks this concurrently with the frontend)

        $cache->setData("player", $resources, $token);
        unset($cache);
        $db = new databaseQuery();

        // the update is added to the events table in the database
        addUpgrade("townhall_upgrade", $townhall["level"] + 1, $db);
        //$cache->setData("townhall", $townhall, $token);
        return true;

    }

    function upgradeBarracks($token){
        // retrieve data from cache to check if the player has enough resources
        $cache = new Cache(array("player"));
        $resources = $cache->acquireData("player", $token);
        $barracks = $cache->acquireData("barracks", $token);

        // make sure to remove upgrade event from cache as it's first added onclick
        $ongoing = $cache->acquireData("barracks_upgrade", $token);
        if($ongoing["status"] == "success"){
            return "upgrade already ongoing";
        }

        //parse the requirements json file
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true)["barracks_upgrade"][$barracks["level"] + 1];
        foreach ($requirements as $key => $value) {
            if($key == "duration") continue; // skip duration check as it's not a resource
            if($resources[$key] < $value) return false;
        }
        // update the resources
        foreach ($requirements as $key => $value) {
            if($key == "duration") continue; // skip duration check as it's not a resource
            $resources[$key] -= $value;
        }
        // resources can and should be updated as soon as the player clicks the upgrade button but 
        // level should be updated only after the upgrade is completed (time daemon checks this concurrently with the frontend)

        $cache->setData("player", $resources, $token);
        unset($cache);
        $db = new databaseQuery();

        // the update is added to the events table in the database
        addUpgrade("barracks_upgrade", $barracks["level"] + 1, $db);
        //$cache->setData("barracks", $barracks, $token);
        return true;

    }

    // TRAINING FUNCTIONS:
    function trainInfantry($token){
        // retrieve data from cache to check if the player has enough resources
        $cache = new Cache(array("player"));
        $resources = $cache->acquireData("player", $token);

        // make sure to remove upgrade event from cache as it's first added onclick
        $ongoing = $cache->acquireData("infantry_training", $token);
        // pick only the last training retrieved from cache
        if($ongoing["status"] == "success") $last_completion = $ongoing[count($ongoing)-1]["event_completion"];
        else $last_completion = 0;

        //parse the requirements json file
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true)["infantry_training"];
        foreach ($requirements as $key => $value) {
            if($key == "duration") continue; // skip duration check as it's not a resource
            if($resources[$key] < $value) return false;
        }
        // update the resources
        foreach ($requirements as $key => $value) {
            if($key == "duration") continue; // skip duration check as it's not a resource
            $resources[$key] -= $value;
        }
        // resources can and should be updated as soon as the player clicks the upgrade button but

        $cache->setData("player", $resources, $token);
        unset($cache);
        $db = new databaseQuery();

        // the update is added to the events table in the database
        addTraining("infantry_training", $last_completion, $db);
        //$cache->setData("barracks", $barracks, $token);
        return true;

    }


    //SPECIAL FUNCTIONS (require password: "gianeh!"):

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
