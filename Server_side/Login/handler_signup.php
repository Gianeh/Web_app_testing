<?php
    // log the error
    ini_set('display_errors', 1);

    $MAP_WIDTH = 500;
    $MAP_HEIGHT = 500;
    $MAX_DISTANCE = 25;
    $MIN_DISTANCE = 10;


    if(!isset($_POST["username"]) || !isset($_POST["password"]) || !isset($_POST["password2"])){
        echo json_encode(array("status" => "error", "message" => "Missing parameters"));
        exit();
    }

    $username = $_POST["username"];
    $password = $_POST["password"];
    $password2 = $_POST["password2"];

    // check if passwords match
    if($password != $password2){
        echo json_encode(array("status" => "error", "message" => "Passwords don't match"));
        exit();
    }

    // various checks on username validity and password strength should be done here

    

    // check the database to be sure that the username is not already taken
    include_once("../database_query.php");
    include_once("user_id_encoder.php");

    $connection = new DatabaseQuery();
    $matching_users = $connection->select("*", "users", "username = '$username'");

    if(count($matching_users) > 0){
        echo json_encode(array("status" => "error", "message" => "Username already taken"));
        exit();
    }

    
    
    //Generate a random position for the player
    $existingPositions = $connection->select("x, y", "player");
    // this for loop is needed to convert the array of 2 distinct values into an array of arrays of 2 values
    foreach($existingPositions as $key => $value){
        $existingPositions[$key] = array($value["x"], $value["y"]);
    }


    //idea for player spawn

    // The spawn will be generrate randomy by the last player that joined the game
    // The first player will spawn in the middle of the map as it is
    // The second player will spawn in a random position that is at least $MIN_DISTANCE away from the first player
    // The third player will spawn in a random position that is at least $MIN_DISTANCE in every direction away from teh second player

    // i need to check ifthe new player dose not spawn in a position where there is already a player


    // Following code is incomplete, after a first spawn the next player won't be able to spawn covering the whole map but just in a $MAX_DISTANCE radius from the first player
    if(count($existingPositions) == 0){
        $x = floor($MAP_WIDTH/2);
        $y = floor($MAP_HEIGHT/2);
        $position = array($x, $y);
    }else{
        $near = true;
        while ($near) {
            $lastElement = end($existingPositions);                                        // get the last player position
            $x = rand($lastElement[0] - $MAX_DISTANCE, $lastElement[0] + $MAX_DISTANCE);   // generate a random position for the new player considering the last player position
            $y = rand($lastElement[1] - $MAX_DISTANCE, $lastElement[1] + $MAX_DISTANCE);   
            $within_range = true;
            foreach($existingPositions as $key => $value){                
                if($x != $value[0] && $y != $value[1]){                                      // check if the new player position is not the same of one of the player position
                $distance = sqrt(($value[0] - $x) ** 2 + ($value[1] - $y) ** 2);             
                if ($distance < $MIN_DISTANCE || $distance > $MAX_DISTANCE) {
                    $within_range = false;
                    break;
                }
            }
            }

            if ($within_range) {
                $near = false;
            }
        }
        $position = array($x, $y);
    }


    // encode the username to get the user_id and insert all needed records in the database
    $user_id = encode($username);
    // if everything is ok, insert the new user in the database
    $connection->insert("users", "user_id, username, password", "'$user_id','$username', '$password'");
    $connection->insert("player", "user_id, username, x, y, level", "'$user_id', '$username', '$x', '$y',0");
    $connection->insert("structures", "user_id, townhall, farm, woodchopper, rockmine, ironmine, barracks", "'$user_id', 0, 0, 0, 0, 0, 0");
    $connection->insert("resources", "user_id, iron, food, wood, rock, population", "'$user_id', 200, 200, 200, 200, 50");
    $connection->insert("troops", "user_id, archer, infantry, cavalry", "'$user_id', 0, 0, 0");
    // every new table rows needs to be added here
    
    
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
    $_SESSION["user_id"] = $user_id;
    echo json_encode(array("status" => "success", "message" => "User created"));
?>