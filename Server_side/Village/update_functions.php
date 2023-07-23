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

    // a function that checks if the event is finished and updates the database accordingly
    // tough this function is called by a specific event on supposed completion it checks all the events in the database related to $_SESSION['user_id']
    function checkEvents($token){
        
        // create a new database object
        $db = new databaseQuery();
        $cache = new Cache(array("player", "structures", "event"));
        // get all the "upgrade" events from database
        $upgrades = $db->select("*", "events", "user_id = '".$_SESSION['user_id']."' AND event_type LIKE '%upgrade%' AND finished = 0");
        // get all the "training" events from database
        $training = $db->select("*", "events", "user_id = '".$_SESSION['user_id']."' AND event_type LIKE '%training%' AND finished = 0");
        // get all the "production" events from database
        $production = $db->select("*", "events", "user_id = '".$_SESSION['user_id']."' AND event_type LIKE '%production%' AND finished = 0");

        // a string containin the names of the completed events should be returned in order to update the localStorage in the frontend
        $completed = "";
        // get current date and time
        $now = time();
        // check upgrades
        foreach($upgrades as $upgrade){
            // check if the event is finished
            if($upgrade["event_completion"] <= $now){
                // update the event in the database
                $db->update("events", "finished", "1", "event_id = '".$upgrade["event_id"]."'");
                // update the structures in the database
                $structure = explode("_", $upgrade["event_type"])[0];
                $db->update("structures", $structure, $upgrade["level"], "user_id = '".$_SESSION['user_id']."'");
                // update the cache regarding the event
                $cache->deleteData($upgrade["event_type"], $token);
                $cache->acquireData($upgrade["event_type"], $token);
                // update the cache regarding the structure
                $cache->deleteData($structure, $token);
                $cache->acquireData($structure, $token);

                // add the name of the structure that has a completed event to the string
                $completed .= $structure.", ";
            }
        }

        // check training considering there may be multiple training events for each troop type
        foreach($training as $train){
            // check if the event is finished
            if($train["event_completion"] <= $now){
                // update the event in the database
                $db->update("events", "finished", "1", "event_id = '".$train["event_id"]."'");
                
                // update the units in the database
                $troop_type = explode("_",$train["event_type"])[0];
                // add 1 unit to the units table in the database at unit_type
                $new = $db->select($troop_type, "troops", "user_id = '".$_SESSION['user_id']."'")[0][$troop_type] + 1;
                $db->update("troops", $troop_type, $new, "user_id = '".$_SESSION['user_id']."'");
                // update the cache regarding the event
                $cache->deleteData($train["event_type"], $token);
                $cache->acquireData($train["event_type"], $token);
                // update the cache regarding the troops - they are included in the "player" cache
                $cache->deleteData("player", $token);
                $cache->acquireData("player", $token);

                // add the name of the troop that has a completed event to the string
                $completed .= $troop_type.", ";
                // note this frontend update still regards the "player" data and not the "troops" data but for a logging purpose it's ok
            }
        }

        // check production considering that for every different resource the requirements.json file needs to be parsed accordingly to the relative structure level
        $woodchopper = $cache->acquireData("woodchopper", $token);
        $rockmine = $cache->acquireData("rockmine", $token);
        $ironmine = $cache->acquireData("ironmine", $token);
        $farm = $cache->acquireData("farm", $token);

        // create a temporary associative array to match the structures data with the resource name
        $structures = array(
            "wood" => $woodchopper,
            "rock" => $rockmine,
            "iron" => $ironmine,
            "food" => $farm
        );

        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true);

        foreach($production as $produce){
            // check if the event is finished
            if($produce["event_completion"] <= $now){
                // update the event in the database
                $db->update("events", "finished", "1", "event_id = '".$produce["event_id"]."'");
                // update the resources in the database
                $resource_type = explode("_", $produce["event_type"])[0];
                // search for the resource type in the requirements json file at the level of the structure
                $ammount = $requirements[$resource_type][$structures[$resource_type]["level"]];
                // add the ammount of resource to the resources table in the database at resource_type
                $new = $db->select($resource_type, "resources", "user_id = '".$_SESSION['user_id']."'")[0][$resource_type] + $ammount;
                $db->update("resources", $resource_type, $new, "user_id = '".$_SESSION['user_id']."'");
                // update the cache regarding the event
                $cache->deleteData($produce["event_type"], $token);

                // THERE A NEW PRODUCTION EVENT SHOULD BE ADDED TO THE DATABASE BEFORE THE CACHE DATA IS NEWLY ACQUIRED

                $cache->acquireData($produce["event_type"], $token);
                // update the cache regarding the resources - they are included in the "player" cache
                $cache->deleteData("player", $token);
                $cache->acquireData("player", $token);

                // add the name of the resource that has a completed event to the string
                $completed .= $resource_type.", ";
                // note this frontend update still regards the "player" data and not the "resources" data but for a logging purpose it's ok
            }
        }

        // delete the last comma from the string
        $completed = substr($completed, 0, -2);
        // return the string to the frontend
        return $completed;
    }

    function addPopulation($token){
        // retrieve data from cache to check if the player has enough food
        $cache = new Cache(array("player"));
        $resources = $cache->acquireData("player", $token);
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true)["add_population"];
        foreach ($requirements as $key => $value) {
            if($key == "duration") continue; // skip duration check as it's not a resource
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
        $db = new databaseQuery();
        $db->update("resources", "wood, food, iron, rock, population", $resources["wood"].", ".$resources["food"].", ".$resources["iron"].", ".$resources["rock"].", ".$resources["population"], "user_id = '".$_SESSION['user_id']."'");
        $cache->deleteData("player", $token);
        $cache->acquireData("player", $token);
        return true;

    }
    // UPGRADES FUNCTIONS:
    function upgradeTownhall($token){
        // retrieve data from cache to check if the player has enough resources
        $cache = new Cache(array("player"));
        $resources = $cache->acquireData("player", $token);
        $townhall = $cache->acquireData("townhall", $token);

        // make sure to remove upgrade event from cache as it's first added onclick
        $cache->deleteData("townhall_upgrade", $token);
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
        $db = new databaseQuery();
        $db->update("resources", "wood, food, iron, rock, population", $resources["wood"].", ".$resources["food"].", ".$resources["iron"].", ".$resources["rock"].", ".$resources["population"], "user_id = '".$_SESSION['user_id']."'");
        $cache->deleteData("player", $token);
        $cache->acquireData("player", $token);

        // the update is added to the events table in the database
        addUpgrade("townhall_upgrade", $townhall["level"] + 1, $db);
        // cache needs to be again emptied and acquired to update the data
        $cache->deleteData("townhall_upgrade", $token);
        $cache->acquireData("townhall_upgrade", $token);
        unset($cache);
        return true;

    }

    function upgradeBarracks($token){
        // retrieve data from cache to check if the player has enough resources
        $cache = new Cache(array("player"));
        $resources = $cache->acquireData("player", $token);
        $barracks = $cache->acquireData("barracks", $token);

        // make sure to remove upgrade event from cache as it's first added onclick
        $cache->deleteData("barracks_upgrade", $token);
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
        $db = new databaseQuery();
        $db->update("resources", "wood, food, iron, rock, population", $resources["wood"].", ".$resources["food"].", ".$resources["iron"].", ".$resources["rock"].", ".$resources["population"], "user_id = '".$_SESSION['user_id']."'");
        $cache->deleteData("player", $token);
        $cache->acquireData("player", $token);

        // the update is added to the events table in the database
        addUpgrade("barracks_upgrade", $barracks["level"] + 1, $db);
        // cache needs to be again emptied and acquired to update the data
        $cache->deleteData("barracks_upgrade", $token);
        $cache->acquireData("barracks_upgrade", $token);
        unset($cache);
        //$cache->setData("barracks", $barracks, $token);
        return true;

    }

    function upgradeFarm($token){
        // retrieve data from cache to check if the player has enough resources
        $cache = new Cache(array("player"));
        $resources = $cache->acquireData("player", $token);
        $farm = $cache->acquireData("farm", $token);

        // make sure to remove upgrade event from cache as it's first added onclick
        $cache->deleteData("farm_upgrade", $token);
        $ongoing = $cache->acquireData("farm_upgrade", $token);
        if($ongoing["status"] == "success"){
            return "upgrade already ongoing";
        }

        //parse the requirements json file
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true)["farm_upgrade"][$farm["level"] + 1];
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
        $db = new databaseQuery();
        $db->update("resources", "wood, food, iron, rock, population", $resources["wood"].", ".$resources["food"].", ".$resources["iron"].", ".$resources["rock"].", ".$resources["population"], "user_id = '".$_SESSION['user_id']."'");
        $cache->deleteData("player", $token);
        $cache->acquireData("player", $token);

        // the update is added to the events table in the database
        addUpgrade("farm_upgrade", $farm["level"] + 1, $db);
        // cache needs to be again emptied and acquired to update the data
        $cache->deleteData("farm_upgrade", $token);
        $cache->acquireData("farm_upgrade", $token);
        unset($cache);
        return true;

    }

    function upgradeRockmine($token){
        // retrieve data from cache to check if the player has enough resources
        $cache = new Cache(array("player"));
        $resources = $cache->acquireData("player", $token);
        $rockmine = $cache->acquireData("rockmine", $token);

        // make sure to remove upgrade event from cache as it's first added onclick
        $cache->deleteData("rockmine_upgrade", $token);
        $ongoing = $cache->acquireData("rockmine_upgrade", $token);
        if($ongoing["status"] == "success"){
            return "upgrade already ongoing";
        }

        //parse the requirements json file
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true)["rockmine_upgrade"][$rockmine["level"] + 1];
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
        $db = new databaseQuery();
        $db->update("resources", "wood, food, iron, rock, population", $resources["wood"].", ".$resources["food"].", ".$resources["iron"].", ".$resources["rock"].", ".$resources["population"], "user_id = '".$_SESSION['user_id']."'");
        $cache->deleteData("player", $token);
        $cache->acquireData("player", $token);

        // the update is added to the events table in the database
        addUpgrade("rockmine_upgrade", $rockmine["level"] + 1, $db);
        // cache needs to be again emptied and acquired to update the data
        $cache->deleteData("rockmine_upgrade", $token);
        $cache->acquireData("rockmine_upgrade", $token);
        unset($cache);
        return true;

    }

    function upgradeIronmine($token){
        // retrieve data from cache to check if the player has enough resources
        $cache = new Cache(array("player"));
        $resources = $cache->acquireData("player", $token);
        $ironmine = $cache->acquireData("ironmine", $token);

        // make sure to remove upgrade event from cache as it's first added onclick
        $cache->deleteData("ironmine_upgrade", $token);
        $ongoing = $cache->acquireData("ironmine_upgrade", $token);
        if($ongoing["status"] == "success"){
            return "upgrade already ongoing";
        }

        //parse the requirements json file
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true)["ironmine_upgrade"][$ironmine["level"] + 1];
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
        $db = new databaseQuery();
        $db->update("resources", "wood, food, iron, rock, population", $resources["wood"].", ".$resources["food"].", ".$resources["iron"].", ".$resources["rock"].", ".$resources["population"], "user_id = '".$_SESSION['user_id']."'");
        $cache->deleteData("player", $token);
        $cache->acquireData("player", $token);

        // the update is added to the events table in the database
        addUpgrade("ironmine_upgrade", $ironmine["level"] + 1, $db);
        // cache needs to be again emptied and acquired to update the data
        $cache->deleteData("ironmine_upgrade", $token);
        $cache->acquireData("ironmine_upgrade", $token);
        unset($cache);
        return true;

    }

    function upgradeWoodchopper($token){
        // retrieve data from cache to check if the player has enough resources
        $cache = new Cache(array("player"));
        $resources = $cache->acquireData("player", $token);
        $woodchopper = $cache->acquireData("woodchopper", $token);

        // make sure to remove upgrade event from cache as it's first added onclick
        $cache->deleteData("woodchopper_upgrade", $token);
        $ongoing = $cache->acquireData("woodchopper_upgrade", $token);
        if($ongoing["status"] == "success"){
            return "upgrade already ongoing";
        }

        //parse the requirements json file
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true)["woodchopper_upgrade"][$woodchopper["level"] + 1];
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
        $db = new databaseQuery();
        $db->update("resources", "wood, food, iron, rock, population", $resources["wood"].", ".$resources["food"].", ".$resources["iron"].", ".$resources["rock"].", ".$resources["population"], "user_id = '".$_SESSION['user_id']."'");
        $cache->deleteData("player", $token);
        $cache->acquireData("player", $token);

        // the update is added to the events table in the database
        addUpgrade("woodchopper_upgrade", $woodchopper["level"] + 1, $db);
        // cache needs to be again emptied and acquired to update the data
        $cache->deleteData("woodchopper_upgrade", $token);
        $cache->acquireData("woodchopper_upgrade", $token);
        unset($cache);
        return true;

    }

    // TRAINING FUNCTIONS:
    function trainInfantry($token){
        // retrieve data from cache to check if the player has enough resources
        $cache = new Cache(array("player", "event"));
        $resources = $cache->acquireData("player", $token);

        // make sure to remove upgrade event from cache as it's first added onclick
        $cache->deleteData("infantry_training", $token);
        $cache->acquireData("infantry_training", $token);
        $cache->deleteData("training", $token);
        $ongoing = $cache->acquireData("training", $token);
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
        // resources can and should be updated as soon as the player clicks the upgrade button
        $db = new databaseQuery();
        $db->update("resources", "wood, food, iron, rock, population", $resources["wood"].", ".$resources["food"].", ".$resources["iron"].", ".$resources["rock"].", ".$resources["population"], "user_id = '".$_SESSION['user_id']."'");
        $cache->deleteData("player", $token);
        $cache->acquireData("player", $token);

        // the update is added to the events table in the database
        addTraining("infantry_training", $last_completion, $db);
        // cache needs to be again emptied and acquired to update the data
        $cache->deleteData("infantry_training", $token);
        $cache->acquireData("infantry_training", $token);
        $cache->deleteData("training", $token);
        $cache->acquireData("training", $token);
        unset($cache);
        return true;

    }

    function trainArcher($token){
        // retrieve data from cache to check if the player has enough resources
        $cache = new Cache(array("player", "event"));
        $resources = $cache->acquireData("player", $token);

        // make sure to remove upgrade event from cache as it's first added onclick
        $cache->deleteData("archer_training", $token);
        $cache->acquireData("archer_training", $token);
        $ongoing = $cache->acquireData("training", $token);
        // pick only the last training retrieved from cache
        if($ongoing["status"] == "success") $last_completion = $ongoing[count($ongoing)-1]["event_completion"];
        else $last_completion = 0;

        //parse the requirements json file
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true)["archer_training"];
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
        $db = new databaseQuery();
        $db->update("resources", "wood, food, iron, rock, population", $resources["wood"].", ".$resources["food"].", ".$resources["iron"].", ".$resources["rock"].", ".$resources["population"], "user_id = '".$_SESSION['user_id']."'");
        $cache->deleteData("player", $token);
        $cache->acquireData("player", $token);

        // the update is added to the events table in the database
        addTraining("archer_training", $last_completion, $db);
        $cache->deleteData("archer_training", $token);
        $cache->acquireData("archer_training", $token);
        unset($cache);
        return true;

    }

    function trainCavalry($token){
        // retrieve data from cache to check if the player has enough resources
        $cache = new Cache(array("player", "event"));
        $resources = $cache->acquireData("player", $token);

        // make sure to remove upgrade event from cache as it's first added onclick
        $cache->deleteData("cavalry_training", $token);
        $cache->acquireData("cavalry_training", $token);
        $ongoing = $cache->acquireData("training", $token);
        // pick only the last training retrieved from cache
        if($ongoing["status"] == "success") $last_completion = $ongoing[count($ongoing)-1]["event_completion"];
        else $last_completion = 0;

        //parse the requirements json file
        $json = file_get_contents('../requirements.json');
        $requirements = json_decode($json, true)["cavalry_training"];
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
        $db = new databaseQuery();
        $db->update("resources", "wood, food, iron, rock, population", $resources["wood"].", ".$resources["food"].", ".$resources["iron"].", ".$resources["rock"].", ".$resources["population"], "user_id = '".$_SESSION['user_id']."'");
        $cache->deleteData("player", $token);
        $cache->acquireData("player", $token);

        // the update is added to the events table in the database
        addTraining("cavalry_training", $last_completion, $db);
        $cache->deleteData("cavalry_training", $token);
        $cache->acquireData("cavalry_training", $token);
        unset($cache);
        return true;

    }

    // ATTACK FUNCTIONS:


    // PRODUCTION FUNCTIONS ARE PROBABLY UNNECESSARY AS LONG AS EVERY PRODUCTION IS AUTOMATICALLY PERIODICALLY ADDED

    //SPECIAL FUNCTIONS (require password: "gianeh!"):

    function cleanCache($password){
        // clean the cache -- NOTE THIS IS A DANGEROUS FUNCTION AND SHOULD BE REMOVED IN PRODUCTION
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
            $resources["food"] += 100;
            $db = new databaseQuery();
            $db->update("resources", "wood, food, iron, rock", $resources["wood"].", ".$resources["food"].", ".$resources["iron"].", ".$resources["rock"], "user_id = '".$_SESSION['user_id']."'");
            $cache->deleteData("player", $token);
            $cache->acquireData("player", $token);
            return true;
        } else {
            return false;
        }
    }
