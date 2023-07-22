<?php
    ini_set('display_errors', 1);
    include_once('database_query.php');
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }


    class Cache{
        public $redis;
        public $db;       // the database query object need to stay here?
        function __construct($classes, $server='aos.redis.cache.windows.net', $pass='J8FXqCoVrIILcaeKVL5qiu9NVCUpVOq3cAzCaF2CDPY='){
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
                    $townhall = new Townhall($townhall[$user_id]["townhall"]);
                    $output = $townhall->get_data();
                    break;
    
                case "rockmine":
                    $rockmine = $this->db->select("rockmine","structures", "structures.user_id = '$user_id'");
                    $rockmine = new Rockmine($rockmine[$user_id]["rockmine"]);
                    $output = $rockmine->get_data();
                    break;

                case "ironmine":
                    $ironmine = $this->db->select("ironmine","structures", "structures.user_id = '$user_id'");
                    $ironmine = new Ironmine($ironmine[$user_id]["ironmine"]);
                    $output = $ironmine->get_data();
                    break;
                
                case "woodchopper":
                    $woodchopper = $this->db->select("woodchopper","structures", "structures.user_id = '$user_id'");
                    $woodchopper = new Woodchopper($woodchopper[$user_id]["woodchopper"]);
                    $output = $woodchopper->get_data();
                    break;

                case "farm":
                    $farm = $this->db->select("farm","structures", "structures.user_id = '$user_id'");
                    $farm = new Farm($farm[$user_id]["farm"]);
                    $output = $farm->get_data();
                    break;
                
                case "barracks":
                    $barracks = $this->db->select("barracks","structures", "structures.user_id = '$user_id'");
                    $barracks = new Barracks($barracks[$user_id]["barracks"]);
                    $output = $barracks->get_data();
                    break;

                // add more cases for other objects as needed
                // also remember to add the logout copy instance!
                
                // UPGRADE CASES
                case "townhall_upgrade":
                    $upgrade = $this->db->select("*","events", "events.user_id = '$user_id' AND events.event_type = 'townhall_upgrade' AND events.finished = 0");
                    if(count($upgrade) == 0) {
                        $output = array("status" => "no data found");
                        break;
                    }
                    $upgrade = new Upgrade($upgrade[$user_id]["event_id"], $upgrade[$user_id]["event_type"], $upgrade[$user_id]["event_completion"], $upgrade[$user_id]["finished"], $upgrade[$user_id]["level"]);
                    $output = array_merge($upgrade->get_data(), ["status" => "success"]);
                    break;
                
                case "barracks_upgrade":
                    $upgrade = $this->db->select("*","events", "events.user_id = '$user_id' AND events.event_type = 'barracks_upgrade' AND events.finished = 0");
                    if(count($upgrade) == 0) {
                        $output = array("status" => "no data found");
                        break;
                    }
                    $upgrade = new Upgrade($upgrade[$user_id]["event_id"], $upgrade[$user_id]["event_type"], $upgrade[$user_id]["event_completion"], $upgrade[$user_id]["finished"], $upgrade[$user_id]["level"]);
                    $output = array_merge($upgrade->get_data(), ["status" => "success"]);
                    break;
                
                case "rockmine_upgrade":
                    $upgrade = $this->db->select("*","events", "events.user_id = '$user_id' AND events.event_type = 'rockmine_upgrade' AND events.finished = 0");
                    if(count($upgrade) == 0) {
                        $output = array("status" => "no data found");
                        break;
                    }
                    $upgrade = new Upgrade($upgrade[$user_id]["event_id"], $upgrade[$user_id]["event_type"], $upgrade[$user_id]["event_completion"], $upgrade[$user_id]["finished"], $upgrade[$user_id]["level"]);
                    $output = array_merge($upgrade->get_data(), ["status" => "success"]);
                    break;
                
                case "ironmine_upgrade":
                    $upgrade = $this->db->select("*","events", "events.user_id = '$user_id' AND events.event_type = 'ironmine_upgrade' AND events.finished = 0");
                    if(count($upgrade) == 0) {
                        $output = array("status" => "no data found");
                        break;
                    }
                    $upgrade = new Upgrade($upgrade[$user_id]["event_id"], $upgrade[$user_id]["event_type"], $upgrade[$user_id]["event_completion"], $upgrade[$user_id]["finished"], $upgrade[$user_id]["level"]);
                    $output = array_merge($upgrade->get_data(), ["status" => "success"]);
                    break;
                
                case "woodchopper_upgrade":
                    $upgrade = $this->db->select("*","events", "events.user_id = '$user_id' AND events.event_type = 'woodchopper_upgrade' AND events.finished = 0");
                    if(count($upgrade) == 0) {
                        $output = array("status" => "no data found");
                        break;
                    }
                    $upgrade = new Upgrade($upgrade[$user_id]["event_id"], $upgrade[$user_id]["event_type"], $upgrade[$user_id]["event_completion"], $upgrade[$user_id]["finished"], $upgrade[$user_id]["level"]);
                    $output = array_merge($upgrade->get_data(), ["status" => "success"]);
                    break;
                
                case "farm_upgrade":
                    $upgrade = $this->db->select("*","events", "events.user_id = '$user_id' AND events.event_type = 'farm_upgrade' AND events.finished = 0");
                    if(count($upgrade) == 0) {
                        $output = array("status" => "no data found");
                        break;
                    }
                    $upgrade = new Upgrade($upgrade[$user_id]["event_id"], $upgrade[$user_id]["event_type"], $upgrade[$user_id]["event_completion"], $upgrade[$user_id]["finished"], $upgrade[$user_id]["level"]);
                    $output = array_merge($upgrade->get_data(), ["status" => "success"]);
                    break;
                
                // TRAINING CASES
                case "infantry_training":
                    $training = $this->db->select("*","events", "events.user_id = '$user_id' AND events.event_type = 'infantry_training' AND events.finished = 0 ORDER BY events.event_completion ASC");
                    if(count($training) == 0) {
                        $output = array("status" => "no data found");
                        break;
                    }
                    $infantry = array();
                    foreach($training as $train){
                        $infantry[] = new Training($train["event_id"], $train["event_type"], $train["event_completion"], $train["finished"], "infantry");
                    }
                    $output = array_merge($infantry[0]->get_data(), ["status" => "success"]);
                    break;

                case "archer_training":
                    $training = $this->db->select("*","events", "events.user_id = '$user_id' AND events.event_type = 'archer_training' AND events.finished = 0 ORDER BY events.event_completion ASC");
                    if(count($training) == 0) {
                        $output = array("status" => "no data found");
                        break;
                    }
                    $archer = array();
                    foreach($training as $train){
                        $archer[] = new Training($train["event_id"], $train["event_type"], $train["event_completion"], $train["finished"], "archer");
                    }
                    $output = array_merge($archer[0]->get_data(), ["status" => "success"]);
                    break;
                
                case "cavalry_training":
                    $training = $this->db->select("*","events", "events.user_id = '$user_id' AND events.event_type = 'cavalry_training' AND events.finished = 0 ORDER BY events.event_completion ASC");
                    if(count($training) == 0) {
                        $output = array("status" => "no data found");
                        break;
                    }
                    $cavalry = array();
                    foreach($training as $train){
                        $cavalry[] = new Training($train["event_id"], $train["event_type"], $train["event_completion"], $train["finished"], "cavalry");
                    }
                    $output = array_merge($cavalry[0]->get_data(), ["status" => "success"]);
                    break;

                // a case for the whole set of training events
                case "training":
                    $training = $this->db->select("*","events", "events.user_id = '$user_id' AND events.event_type IN ('infantry_training', 'archer_training', 'cavalry_training') AND events.finished = 0 ORDER BY events.event_completion ASC");
                    if(count($training) == 0) {
                        $output = array("status" => "no data found");
                        break;
                    }
                    $T = array();
                    foreach($training as $train){
                        $T[] = new Training($train["event_id"], $train["event_type"], $train["event_completion"], $train["finished"], $train["event_type"]);
                    }
                    // output is the all set of getData functions on all the training events
                    $output = array();
                    for($i = 0; $i < count($T); $i++){
                        $output[$i] = $T[$i]->get_data();
                    }
                    $output = array_merge($output, ["status" => "success"]);
                    break;

                default:
                    // handle error
                    $output = array("error" => "invalid data requested");
                    break;
            }
            $output["previously_cached"] = "false";
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

        //a function that delete something from the cache by the key
        public function  deleteData($data, $token){
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
                return array("status" => "key '$data' not found in redis cache");
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
                return array("cache is already empty");
            }

        }
    }