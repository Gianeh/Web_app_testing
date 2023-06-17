<?php

    // create function for the switch adn the db query


    ini_set('display_errors', 1);
    include_once('database_query.php');

    // information needed to connect to the database
    $server = "tcp:AOS-Web-Testing.database.windows.net,1433";
    $db     = "AOS-Web-Testing";
    $user   = "aosadmin";
    $pass   = "AOSpassword!"; 

    class Cache{
        
        public $redis;
<<<<<<< HEAD
        public $db;       // the database query object need to stay here?
=======
        public $database;
>>>>>>> f0ff9fb2a28240dbd29a943e70f6978787f083ca

        function __construct($classes, $server='AOS-Web-Testing.redis.cache.windows.net', $pass='1QJ5aC5vpZESy1MYbw5oU42lnMixqxm0PAzCaHl4QH4='){
            // include every class that should be cached
            for ($i = 0; $i < count($classes); $i++) {
                include_once("Asset/".$classes[$i].".php");
            }
            // connect to the redis server
            $this->redis = new Redis();
            $this->redis->connect($server, 6379);
            $this->redis->auth($pass); // password for redis server

<<<<<<< HEAD
            // create a new istance for the database query
            $this->db = new databaseQuery($server, $user, $pass, $db);

=======
            // connect to the database
            $this->database = new Database();
>>>>>>> f0ff9fb2a28240dbd29a943e70f6978787f083ca
        }

        // a function that get data from teh db and add it to the cache
        function addInCache($data){
            switch ($data) {
    
                case "player":
                    $player = $this->db->RetriveData("Dummy_player_data", "*", "Username = 'test'");
                    $output = $player->get_data();
                    break;
    
                case "townhall":
                    $townhall = new Townhall(1, "townhall");
                    $output = $townhall->get_data();
                    break;
    
                case "rockmine":
                    $rockmine = new Rockmine(1, "rockmine");
                    $output = $rockmine->get_data();
                    break;
                
                case "woodchopper":
                    $woodchopper = new Woodchopper(1, "woodchopper");
                    $output = $woodchopper->get_data();
                    break;

<<<<<<< HEAD
                // add more cases for other objects as needed
    
=======
        // a function that handles the switch and the db query
        function populateRecord($data){

            switch ($data) {
                // ###############################################
                // # Data should be generated and added to cache #
                // # Based on the Database records but now we    #
                // # Just create a new object from scratch       #
                // # every time                                  #
                // ###############################################
        
                case "player":
                    $player = new Player("player1234", 5, 0, 0, 0, 0);
                    $output = $player->get_data();
                    break;
        
                case "townhall":
                    $townhall = new Townhall(1, "townhall");
                    $output = $townhall->get_data();
                    break;
        
                case "rockmine":
                    $rockmine = new Rockmine(1, "rockmine");
                    $output = $rockmine->get_data();
                    break;
                
                case "woodchopper":
                    $woodchopper = new Woodchopper(1, "woodchopper");
                    $output = $woodchopper->get_data();
                    break;

                // add more cases for other objects as needed
        
>>>>>>> f0ff9fb2a28240dbd29a943e70f6978787f083ca
                default:
                    // handle error
                    $output = array("error" => "invalid data requested");
                    break;
            }
<<<<<<< HEAD
        }

      
=======
            return $output;
        }

>>>>>>> f0ff9fb2a28240dbd29a943e70f6978787f083ca

        public function acquireData($data, $token){
            if(!is_string($data)){
                // invalid data requested
                return array("error" => "invalid data requested");
            }
            $cache_key = $data . "_data_" . $token;
            if($this->redis === null){
                // Redis connection not established
                return array("error" => "Redis connection not established");
            }
            $output = $this->redis->get($cache_key);

            if($output == false){
                // data not found in cache, instantiate object and store data in cache
<<<<<<< HEAD
               $output = addInCache($data);
=======
                $output = $this->populateRecord($data);
>>>>>>> f0ff9fb2a28240dbd29a943e70f6978787f083ca
                // save the data in the cache - third parameter is the time to live in seconds
                $this->redis->set($cache_key, json_encode($output), 3600);
            } else {
                // data found in cache, decode the JSON string
                $output = json_decode($output, true);
            }

            return $output;

        }


        //a function that delete something from the cache by the key
        public function deleteData($data, $token){
            if($this->redis === null){
                // Redis connection not established
                return array("error" => "Redis connection not established");
            }
            $cache_key = $data . "_data_" . $token;   // the key is the data name + the token
            $deleted = $this->redis->del($cache_key); // del returns TRUE or FALSE
            if($deleted){
                return array("key '$data' deleted successfuly from redis cache");
            }else{
                return array("key '$data' deleted successfuly from redis cache");
            }

        }

      

    }