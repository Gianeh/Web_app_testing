<?php
    ini_set('display_errors', 1);

    class Cache{
        
        public $redis;

        function __construct($classes, $server='AOS-Web-Testing.redis.cache.windows.net', $pass='1QJ5aC5vpZESy1MYbw5oU42lnMixqxm0PAzCaHl4QH4='){
            // include every class that should be cached
            for ($i = 0; $i < count($classes); $i++) {
                include_once($classes[$i].".php");
            }
            // connect to the redis server
            $redis = new Redis();
            $redis->connect($server, 6379);
            $redis->auth($pass); // password for redis server
        }

        public function acquireData($data, $token){
            $cache_key = $data . "_data_" . $token;
            $output = $this->redis->get($cache_key);

            if($data == false){
                // data not found in cache, instantiate object and store data in cache
                switch ($data) {
        
                    // ###############################################
                    // # Data should be generated and added to cache #
                    // # Based on the Database records but now we    #
                    // # Just create a new object from scratch       #
                    // # every time                                  #
                    // ###############################################
        
                    case "player":
                        $player = new Player("player1234", 5, 0, 0, 0, 0);
                        $data = $player->get_data();
                        break;
        
                    case "townhall":
                        $townhall = new Townhall(1, "townhall");
                        $data = $townhall->get_data();
                        break;
        
                    case "rockmine":
                        $rockmine = new Rockmine(1, "rockmine");
                        $data = $rockmine->get_data();
                        break;
                    
                    case "woodchopper":
                        $woodchopper = new Woodchopper(1, "woodchopper");
                        $data = $woodchopper->get_data();
                        break;

                    // add more cases for other objects as needed
        
                    default:
                        // handle error
                        $data = array("error" => "invalid data requested");
                        break;
                }
                // save the data in the cache - third parameter is the time to live in seconds
                $this->redis->set($cache_key, json_encode($data), 3600);
            } else {
                // data found in cache, decode the JSON string
                $data = json_decode($data, true);
            }

            return $output;

        }
    }