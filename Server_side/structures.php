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
        public $population = 5;
        public $iron = 0;
        public $wood = 0;
        public $rock = 0;
        public $food = 0;

        function __construct($level = 0, $type = "townhall"){
            $this->level = $level;
            $this->type = $type;
        }

        public function get_data(){
            return array(
                "level" => $this->level,
                "type" => $this->type,
                "population" => $this->population,
                "iron" => $this->iron,
                "wood" => $this->wood,
                "rock" => $this->rock,
                "food" => $this->food
            );
        }

    }