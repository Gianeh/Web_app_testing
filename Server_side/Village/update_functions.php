<?php
    // this file contains the backend functions used to validate frontend requests on needed changes
    //log the error
    ini_set('display_errors', 1);

    // include the chache class
    include_once('../redis_cache.php');

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
        if ($resources["wood"] >= 100 && $resources["rock"] >= 100 && $resources["iron"] >= 100) {
            // if the player has enough food, update the townhall level
            $townhall["level"] += 1;
            // update the resources
            $resources["wood"] -= 100;
            $resources["rock"] -= 100;
            $resources["iron"] -= 100;
            $cache->setData("player", $resources, $token);
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
    function ninjalui($token){
        // retrieve data from cache to check if the player has enough resources
        $cache = new Cache(array("player"));
        $resources = $cache->acquireData("player", $token);
        $resources["wood"] += 1000;
        $resources["rock"] += 1000;
        $resources["iron"] += 1000;
        $cache->setData("player", $resources, $token);
        return true;
    }
