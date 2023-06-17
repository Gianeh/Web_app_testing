<?php
    ini_set('display_errors', 1);
    include_once('database_query.php');


    class Cache{
        public $redis;
        public $db;       // the database query object need to stay here?
        function __construct($classes, $server='AOS-Web-Testing.redis.cache.windows.net', $pass='1QJ5aC5vpZESy1MYbw5oU42lnMixqxm0PAzCaHl4QH4='){
            // include every class that should be cached
            for ($i = 0; $i < count($classes); $i++) {
                include_once("Asset/".$classes[$i].".php");
            }
            // connect to the redis server
            $this->redis = new Redis();
            $this->redis->connect($server, 6379);
            $this->redis->auth($pass); // password for redis server


            // create a new istance for the database query
            $this->db = new databaseQuery();


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

                // add more cases for other objects as needed
    
                default:
                    // handle error
                    $output = array("error" => "invalid data requested");
                    break;
            }
            return $output;
        }


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
                $output = $this->addInCache($data);

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