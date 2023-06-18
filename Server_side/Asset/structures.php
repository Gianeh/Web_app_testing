<?php

    // A class that represents a ganeric building
    class Structure{
        public $level;
        public $type;
    
        function __construct($level = 0, $type = "none"){
            $this->level = $level;
            $this->type = $type;
        }

        public function get_level(){
            return $this->level;
        }

        public function get_type(){
            return $this->type;
        }
    }

    class Townhall extends Structure{

        function __construct($level = 0, $type = "townhall"){
            $this->level = $level;
            $this->type = $type;
        }

        public function get_data(){
            return array(
                "level" => $this->level,
                "type" => $this->type,
            );
        }

    }

    class Rockmine extends Structure{

        function __construct($level = 0, $type = "rockmine"){
            $this->level = $level;
            $this->type = $type;
        }

        public function get_data(){
            return array(
                "level" => $this->level,
                "type" => $this->type,
            );
        }

    }

    class Woodchopper extends Structure{

        function __construct($level = 0, $type = "woodchopper"){
            $this->level = $level;
            $this->type = $type;
        }

        public function get_data(){
            return array(
                "level" => $this->level,
                "type" => $this->type,
            );
        }

    }

    class Barracks extends Structure{

        function __construct($level = 0, $type = "barracks"){
            $this->level = $level;
            $this->type = $type;
        }

        public function get_data(){
            return array(
                "level" => $this->level,
                "type" => $this->type,
            );
        }

    }
    