<?php
    // log the error
    ini_set('display_errors', 1);

    $MAP_WIDTH = 500;
    $MAP_HEIGHT = 500;
    $MAX_DISTANCE = 25;
    $MIN_DISTANCE = 10;

    $MAX_PLAYERS = 1000;


    if(!isset($_POST["username"]) || !isset($_POST["password"]) || !isset($_POST["password2"])){
        echo json_encode(array("status" => "error", "message" => "Missing parameters"));
        exit();
    }

    $username = strtolower($_POST["username"]);
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

    $connection = new DatabaseQuery();
    $matching_users = $connection->select("*", "users", "username = '$username'");

    if(count($matching_users) > 0){
        echo json_encode(array("status" => "error", "message" => "Username already taken"));
        exit();
    }

    include_once("./poisson_disk_generator.php");
    
    //Generate a random position for the player
    $existingPositions = $connection->select("x, y", "player");
    // this for loop is needed to convert the array of 2 distinct values into an array of arrays of 2 values
    foreach($existingPositions as $key => $value){
        $existingPositions[$key] = array($value["x"], $value["y"]);
    }

    // if there are no players in the database, generate the list of spawnable points
    if(count($existingPositions) == 0){
        // generate the spawnable points using poisson disk sampling
        $points = generatePoissonDisk($MAP_WIDTH, $MAP_HEIGHT, $MIN_DISTANCE, $MAX_PLAYERS);
        // get the first point
        $position = $points[0];
        $x = floor($position[0]);
        $y = floor($position[1]);
        $position = array($x, $y);

        // store the remaining available points in json in a sorted order
        sortPointsByDistance($points, $position);
        $points = array_slice($points, 1);
        $points = json_encode($points);
        // save a new file
        $file = fopen("spawnable_points.json", "w");
        fwrite($file, $points);
        fclose($file);
    }else if(count($existingPositions) < $MAX_PLAYERS){ // retrieve the json containing the stored points in poisson disk and decode it, then sort the array to find the minimum spawnable distance from last player
        $file = fopen("spawnable_points.json", "r");
        $points = fread($file, filesize("spawnable_points.json"));
        fclose($file);
        $points = json_decode($points);
        $position = $points[0];
        $x = floor($position[0]);
        $y = floor($position[1]);
        // erease the first element of the array
        $points = array_slice($points, 1);
        // save the new array in json
        $points = json_encode($points);
        $file = fopen("spawnable_points.json", "w");
        fwrite($file, $points);
        fclose($file);
    }else{
        echo json_encode(array("status" => "error", "message" => "Server full"));
        exit();
    }


    // encode the username to get the user_id and insert all needed records in the database
    $key = 42;
    $user_id = hash("sha256", $username.$key);
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