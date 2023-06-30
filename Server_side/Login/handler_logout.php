<?php
    // A function that handles the copy of all the cache relative to the user to the database
    function logout($secret_key){
        include_once("../database_query.php");
        include_once("../redis_cache.php");
        // parse the buffer file and add all the update events to databse table
        $db = new DatabaseQuery();
        $cache = new Cache(array("player", "structures"));
        $townhall = $cache->getUpdates("townhall_upgrade");
        $barracks = $cache->getUpdates("barracks_upgrade");
        $ironmine = $cache->getUpdates("ironmine_upgrade");
        $farm = $cache->getUpdates("farm_upgrade");
        $rockmine = $cache->getUpdates("rockmine_upgrade");
        $woodchopper = $cache->getUpdates("woodchopper_upgrade");

        $upgrades = array($townhall, $barracks, $ironmine, $farm, $rockmine, $woodchopper);

        // add upgrades events to database table events
        foreach($upgrades as $upgrade){
            if (!$upgrade) continue; // cache returns false if there is no buffered event
            $db->insert("events", "(event_id, user_id, event_type, event_completion, finished)", "(". $upgrade['event_id'].", ". $_SESSION['user_id'].", ". $upgrade['event_type'].", ". $upgrade['event_completion'].", ". $upgrade['finished'].")");
        }
        // add training events to database table events
        $training = array($cache->getUpdates("infantry_training"), $cache->getUpdates("archer_training"), $cache->getUpdates("cavalry_training"));
        foreach($training as $unit_type){
            if (!$unit_type) continue;  // cache returns false if there is no buffered event
            foreach($unit_type as $train){
                $db->insert("events", "(event_id, user_id, event_type, event_completion, finished)", "(". $train['event_id'].", ". $_SESSION['user_id'].", ". $train['event_type'].", ". $train['event_completion'].",". $train['finished'].")");
            }
        }
        // add resources events to database table events
        // I need to think about production events

        // add player, structures and resources to database tables
        $token = hash("sha256", $secret_key.$_SESSION['user_id']);
        $player = $cache->acquireData("player", $token);
        $townhall = $cache->acquireData("townhall", $token);
        $barracks = $cache->acquireData("barracks", $token);
        $ironmine = $cache->acquireData("ironmine", $token);
        $farm = $cache->acquireData("farm", $token);
        $rockmine = $cache->acquireData("rockmine", $token);
        $woodchopper = $cache->acquireData("woodchopper", $token);

        // update resources in database table resources
        $db->update("resources", "(iron, food, wood, rock, population)", "(" . $player["iron"] . ", " . $player["food"] . ", " . $player["wood"] . ", " . $player["rock"] . ", " . $player["population"] . ")", "user_id = '" . $_SESSION['user_id']);
        
        /*
        // update structures levels in database table structures
        $db->update("structures", "(townhall, woodchopper, rockmine, ironmine, farm, barracks)", "(" . $townhall["level"] . ", " . $woodchopper["level"] . ", " . $rockmine["level"] . ", " . $ironmine["level"] . ", " . $farm["level"] . ", " . $barracks["level"] . ")", "user_id = " . $_SESSION['user_id']);
        */
        // more updates may need to get saved here
    }