<?php
    // A function that handles the copy of all the cache relative to the user to the database
    function logout($token){
        include_once("../database_query.php");
        include_once("../redis_cache.php");

        $db = new DatabaseQuery();
        $cache = new Cache(array("player", "structures"));

        // acquire all the upgrades events from cache and update the database rows with status online = 0 -> time daemons only updates events with status online = 0
        $townhall = $cache->acquireData("townhall_upgrade", $token);
        $barracks = $cache->acquireData("barracks_upgrade", $token);
        $ironmine = $cache->acquireData("ironmine_upgrade", $token);
        $farm = $cache->acquireData("farm_upgrade", $token);
        $rockmine = $cache->acquireData("rockmine_upgrade", $token);
        $woodchopper = $cache->acquireData("woodchopper_upgrade", $token);

        $upgrades = array($townhall, $barracks, $ironmine, $farm, $rockmine, $woodchopper);

        // update upgrade events into database table events
        foreach($upgrades as $upgrade){
            if ($upgrade["status"] != "success") continue; // cache returns a status for upgrades events to prevent not found errors
            $db->update("events", "event_id,user_id,event_type,event_completion,finished,online",
                $upgrade['event_id'].",". $_SESSION['user_id'].",". $upgrade['event_type'].",". $upgrade['event_completion'].",". $upgrade['finished'].",0", "user_id = '". $_SESSION['user_id'] ."'");
        }

        // acquire all the training events
        $infantry = $cache->acquireData("infantry_training", $token);
        $archer = $cache->acquireData("archer_training", $token);
        $cavalry = $cache->acquireData("cavalry_training", $token);
        
        $training = array($infantry, $archer, $cavalry);
        // update training events to database table events
        foreach($training as $unit_type){
            if ($unit_type["status"] != "success") continue;  // cache returns a status for upgrades events to prevent not found errors
            foreach($unit_type as $train){
                $db->update("events", "event_id,user_id,event_type,event_completion,finished,online",
                    $train['event_id'].",". $_SESSION['user_id'].",". $train['event_type'].",". $train['event_completion'].",". $train['finished'].",0", "user_id = '". $_SESSION['user_id'] ."'");
            }
        }
        // add resources events to database table events
        // I need to think about production events

        // add player, structures and resources to database tables
        $player = $cache->acquireData("player", $token);
        $townhall = $cache->acquireData("townhall", $token);
        $barracks = $cache->acquireData("barracks", $token);
        $ironmine = $cache->acquireData("ironmine", $token);
        $farm = $cache->acquireData("farm", $token);
        $rockmine = $cache->acquireData("rockmine", $token);
        $woodchopper = $cache->acquireData("woodchopper", $token);

        // update resources in database table resources
        $db->update("resources", "iron,food,wood,rock,population", $player["iron"] . "," . $player["food"] . "," . $player["wood"] . "," . $player["rock"] . "," . $player["population"] , "user_id = '". $_SESSION['user_id'] ."'");
        // update structures in database table structures
        $db->update("structures", "townhall,woodchopper,rockmine,ironmine,farm,barracks", $townhall["level"] . "," . $woodchopper["level"] . "," . $rockmine["level"] . "," . $ironmine["level"] . "," . $farm["level"] . "," . $barracks["level"], "user_id = '". $_SESSION['user_id'] ."'");

        // more updates may need to get saved here

        // delete all the cache relative to the user
        $cache->deleteData("player", $token);
        $cache->deleteData("townhall", $token);
        $cache->deleteData("barracks", $token);
        $cache->deleteData("ironmine", $token);
        $cache->deleteData("farm", $token);
        $cache->deleteData("rockmine", $token);
        $cache->deleteData("woodchopper", $token);
        $cache->deleteData("townhall_upgrade", $token);
        $cache->deleteData("barracks_upgrade", $token);
        $cache->deleteData("ironmine_upgrade", $token);
        $cache->deleteData("farm_upgrade", $token);
        $cache->deleteData("rockmine_upgrade", $token);
        $cache->deleteData("woodchopper_upgrade", $token);
        $cache->deleteData("infantry_training", $token);
        $cache->deleteData("archer_training", $token);
        $cache->deleteData("cavalry_training", $token);
    }