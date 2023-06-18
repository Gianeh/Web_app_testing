<?php

// this file contains the backend functions used to validate frontend requests on needed changes
//log the error
ini_set('display_errors', 1);

// include the chache class
include_once('../redis_cache.php');

 // example action on map: Send troops to a village
 function SendTroops($token, $user_target_id, $troops){
     // retrieve data from cache to check if the player has enough food
     $cache = new Cache(array("player"));
     $PlayerTroops = $cache->acquireData("player", $token);
     if($PlayerTroops["archer"] < 10 || $PlayerTroops["infantry"] < 10 || $PlayerTroops["cavalary"] < 10){
         return array("status" => "error", "message" => "Not enough troops!");
     }else{
            // if the player has enough troops he can attack someone
            $
     }  
 }