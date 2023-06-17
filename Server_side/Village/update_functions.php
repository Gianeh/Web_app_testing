<?php
    // this file contains the backend functions used to validate frontend requests on needed changes
    //log the error
    ini_set('display_errors', 1);

    // include the chache class
    include_once('redis_cache.php');

    // example rule: the player needs to have 10 food to add 1 population to village
    function addPopulation($token){
        // retrieve data from cache to check if the player has enough food
        $cache = new Cache(array("player"));
        $data = $cache->acquireData("player", $token);
        if ($data["food"] >= 10) {
            // if the player has enough food, update the population
            $data["population"] += 1;
            // update the food
            $data["food"] -= 10;
            $cache->setData("player", $data, $token);
            return true;
        } else {
            // if the player doesn't have enough food, return false
            return false;
        }

    }