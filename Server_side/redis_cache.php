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
                    $player = $this->db->select("*","player, resources, troops", "player.user_id = resources.user_id AND player.user_id = troops.user_id");
                    $player = new Player($player[$user_id]["username"], $player[$user_id]["population"], $player[$user_id]["iron"], $player[$user_id]["wood"], $player[$user_id]["rock"],
                                         $player[$user_id]["food"], $player[$user_id]["archer"], $player[$user_id]["infantry"], $player[$user_id]["cavalry"], $player[$user_id]["x"], $player[$user_id]["y"]);
                    $output = $player->get_data();
                    break;
    
                case "townhall":
                    $townhall = $this->db->select("townhall","structures", "structures.user_id = '$user_id'");
                    $townhall = new Townhall($townhall[0]["townhall"]);
                    $output = $townhall->get_data();
                    break;
    
                case "rockmine":
                    $rockmine = $this->db->select("rockmine","structures", "structures.user_id = '$user_id'");
                    $rockmine = new Rockmine($rockmine[0]["rockmine"]);
                    $output = $rockmine->get_data();
                    break;

                case "ironmine":
                    $ironmine = $this->db->select("ironmine","structures", "structures.user_id = '$user_id'");
                    $ironmine = new Ironmine($ironmine[0]["ironmine"]);
                    $output = $ironmine->get_data();
                    break;
                
                case "woodchopper":
                    $woodchopper = $this->db->select("woodchopper","structures", "structures.user_id = '$user_id'");
                    $woodchopper = new Woodchopper($woodchopper[0]["woodchopper"]);
                    $output = $woodchopper->get_data();
                    break;

                case "farm":
                    $farm = $this->db->select("farm","structures", "structures.user_id = '$user_id'");
                    $farm = new Farm($farm[0]["farm"]);
                    $output = $farm->get_data();
                    break;
                
                case "barracks":
                    $barracks = $this->db->select("barracks","structures", "structures.user_id = '$user_id'");
                    $barracks = new Barracks($barracks[0]["barracks"]);
                    $output = $barracks->get_data();
                    break;

                // add more cases for other objects as needed

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

        // ideally every time the above function is called the database should be updated as well, possibly in async mode, how?
        // should the time_daemon do this?. should another daemon do this?.
        // suppose that a daemon is doing this:
        /*
        database may contain a table like this:
        Updates:
            user_id | data_name | json_encoded_data | cachekey
            1       | player    | {json encoded data}| player_data_123456789
            1       | townhall  | {json encoded data}| townhall_data_123456789
            1       | rockmine  | {json encoded data}| rockmine_data_123456789
            1       | ironmine  | {json encoded data}| ironmine_data_123456789
            2       | player    | {json encoded data}| player_data_987654321
            .....
            n       | player    | {json encoded data}| player_data_123456789
        
        the daemon may check this table periodically and update the other database tables accordingly
        it may need to access the cache or the database directly to get the data (thus the columns cachekey and json_encoded_data are not both needed)

        another option, that would avoid calling the databse through the cache file (saving time) would be to have this sort of table on a local text file
        and have the daemon update the database and the cache file at the same time, this would be faster but would require more work to implement
        code fir this solution might be contained in a function as follows:
        function updateUpdates($user_id, $data_name, $json_encoded_data, $cachekey){
            $updates_file = "updates.txt";
            if(!file_exists($updates_file)){
                $file = fopen($updates_file, "w");
                fwrite($file, $user_id . "|" . $data_name . "|" . $json_encoded_data . "|" . $cachekey . "\n");
                fclose($file);
            }else{
                $file = fopen($updates_file, "a");
                fwrite($file, $user_id . "|" . $data_name . "|" . $json_encoded_data . "|" . $cachekey . "\n");
                fclose($file);
            } // quite redundant code but prevents the deletion of the file if it already exists and creates ex novo if it doesn't
        }
        Daemon should then check the data_name and decode the json, based on a switch case it would then update the database accordingly
        updated rows should then be deleted from the file

        Both options need the daemon to be able to differentiate the data and update tables accordingly



         NEW IDEA!

        To prevent concurrecy issues, while a user is online ($_SESSION["user_id"] is set) the daemon should not update the events, those might be completely stored in cache
        and updated accordingly by backend functions (like the one above) and the daemon should only update the database when the user logs out (or when the session expires)
        */



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