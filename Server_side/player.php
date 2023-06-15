<?php

    // A Player class

    class Player{
        public $name = "Undefined!";
        public $population = 5;
        public $iron = 0;
        public $wood = 0;
        public $rock = 0;
        public $food = 0;


        public $x;
        public $y;


        function __construct($name="Undefined!", $population=5, $iron=0, $wood=0, $rock=0, $food=0){
            $this->name = $name;
            $this->population = $population;
            $this->iron = $iron;
            $this->wood = $wood;
            $this->rock = $rock;
            $this->food = $food;

            $this->x = rand(1,89);
            $this->y = rand(1,89);
        }
        
        public function get_data(){
            return array(
                "name" => $this->name,
                "population" => $this->population,
                "iron" => $this->iron,
                "wood" => $this->wood,
                "rock" => $this->rock,
                "food" => $this->food,
                "x"    => $this->x,
                "y"    => $this->y,
            );
        }

        public function get_position(){
            return array(
                "x" => $this->x,
                "y" => $this->y,
            );
        }
    }
    