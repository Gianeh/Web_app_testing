<?php
    ini_set('display_errors', 1);
    include_once('database_query.php');
    session_start();


    class Cache{
        public $redis;
        public $db;       // the database query object need to stay here?
        function __construct($classes, $server='AOS-Web-Testing.redis.cache.windows.net', $pass='1QJ5aC5vpZESy1MYbw5oU42lnMixqxm0PAzCaHl4QH4='){
            // include every class that should be cached
            // this may be useless and removed from constructor
            for ($i = 0; $i < count($classes); $i++) {
                include_once("Asset/".$classes[$i].".php");
            }
            // connect to the redis server
            $this->redis = new Redis();
            $this->redis->connect($server, 6379);
            $this->redis->auth($pass); // password for redis server

            // CONNECTION MAY NEED TO BE CREATED ON DEMAND INSIDE EACH FUNCTION


        }

        // a function that get data from teh db and add it to the cache
        function addInCache($data){
            // connect to database creating a new databaseQuery object
            // this should only happen once thing are not in the cache -- as opposed to the constructor scope!
            $this->db = new databaseQuery();
            // save the user_id in a variable
            $user_id = $_SESSION["user_id"];
            switch ($data) {
    
                case "player":
                    $player = $this->db->retriveData("*","player, resources", "player.user_id = resources.user_id");
                    //$name="Undefined!", $population=5, $iron=0, $wood=0, $rock=0, $food=0, $x=rand(1,89), $y=rand(1,89)
                    $player = new Player($player[$user_id]["user_id"], $player[$user_id]["population"], $player[$user_id]["iron"], $player[$user_id]["wood"], $player[$user_id]["rock"], $player[$user_id]["food"], $player[$user_id]["x"], $player[$user_id]["y"]);
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
                    
                case "troops":
                    $troops = $this->db->retriveData("*","troops", "troops.user_id = user1");
                    $troops = new Troops($troops[0]["user_id"], $troops[0]["archer"], $troops[0]["infantry"], $troops[0]["cavalary"]);
                    $output = $troops->get_data();
                    break;

                default:
                    // handle error
                    $output = array("error" => "invalid data requested");
                    break;
            }
            $output["cached"] = "false";
            return $output;
        }


        public function acquireData($dataName, $token){
            if(!is_string($dataName)){
                // invalid data requested
                return array("error" => "invalid data requested");
            }
            $cache_key = $dataName . "_data_" . $token;
            if($this->redis === null){
                // Redis connection not established
                return array("error" => "Redis connection not established");
            }
            $output = $this->redis->get($cache_key);

            if($output == false){
                // data not found in cache, find object data in the database and store in cache
                $output = $this->addInCache($dataName);
                // save the data in the cache - third parameter is the time to live in seconds
                $this->redis->set($cache_key, json_encode($output), 3600);
            } else {
                // data found in cache, decode the JSON string
                // log that the data was found in the cache
                $output = json_decode($output, true);
                $output["cached"] = "true";
            }

            // close the cache connection
            $this->redis->close();
            return $output;

        }

        //a function that updates a data in the cache
        /*
        public function updateCache($data, $token){
            if($this->redis === null){
                // Redis connection not established
                return array("error" => "Redis connection not established");
            }
            $cache_key = $data . "_data_" . $token;   // the key is the data name + the token
            $output = $this->redis->get($cache_key);  // get the data from the cache
            if($output == false){
                // data not found in cache, instantiate object and store data in cache
                $output = $this->addInCache($data);
                // save the data in the cache - third parameter is the time to live in seconds
                $this->redis->set($cache_key, json_encode($output), 3600);
            } else {
                // data found in cache, decode the JSON string
                // log that the data was found in the cache
                $output = json_decode($output, true);
                $output["cached"] = "true";
            }
            return $output;
        }
        */ //using the cache as the most fresh storage for the whole game this function is not needed in theory
        /*
        public function updateData($dataName, $data, $token){
            if($this->redis === null){
                // Redis connection not established
                return array("error" => "Redis connection not established");
            }
            $stored = $this->acquireData($dataName, $token);       // get the data from the db and add it to the cache
            $cache_key = $dataName . "_data_" . $token;   // the key is the data name + the token
            // update $stored with the new data
            $stored[$dataName] += $data;
            $this->redis->set($cache_key, json_encode($stored), 3600); // save the data in the cache - third parameter is the time to live in seconds
            return array("status" => "key '$dataName' updated successfuly in redis cache");
        }
        */

        // a function that sets specific data in the cache
        public function setData($dataName, $data, $token){
            if($this->redis === null){
                // Redis connection not established
                return array("error" => "Redis connection not established");
            }
            $cache_key = $dataName . "_data_" . $token;   // the key is the data name + the token
            $this->redis->set($cache_key, json_encode($data), 3600); // save the data in the cache - third parameter is the time to live in seconds
            // close the cache connection
            $this->redis->close();
            return array("status" => "key '$dataName' updated successfuly in redis cache");
        }

        //a function that delete something from the cache by the key
        public function deleteData($data, $token){
            if($this->redis === null){
                // Redis connection not established
                return array("error" => "Redis connection not established");
            }
            $cache_key = $data . "_data_" . $token;   // the key is the data name + the token
            $deleted = $this->redis->del($cache_key); // del returns TRUE or FALSE

            // close the cache connection
            $this->redis->close();

            if($deleted){
                return array("status" => "key '$data' deleted successfuly from redis cache");
            }else{
                return array("status" => "key '$data' deleted successfuly from redis cache");
            }

        }

        //a function that delete all the cache
        public function deleteAllCache(){
            if($this->redis === null){
                // Redis connection not established
                return array("error" => "Redis connection not established");
            }
            $deleted = $this->redis->flushAll(); // del returns TRUE or FALSE

            // close the cache connection
            $this->redis->close();

            if($deleted){
                return array("all keys deleted successfuly from redis cache");
            }else{
                return array("all keys deleted successfuly from redis cache");
            }

        }
    }