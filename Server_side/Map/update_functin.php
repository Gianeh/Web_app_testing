<?php

// this file contains the backend functions used to validate frontend requests on needed changes
//log the error
ini_set('display_errors', 1);

// include the chache class
include_once('../redis_cache.php');

 // example action on map: Send troops to a village
 function SendTroops(){
     // retrieve data from cache to check if the player has enough food
     $cache = new Cache(array("player"));
     $troops = $cache->acquireData("player", $token);
     if(   
 }