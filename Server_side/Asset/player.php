<?php
  
    // A Player class

    class Player{
        public $name;
        public $population;
        /*
        public $iron = 0;
        public $wood = 0;
        public $rock = 0;
        public $food = 0;
        */
        public $resources;
        public $troops;


        public $x;
        public $y;


        function __construct($name="Undefined!", $population=5, $iron=0, $wood=0, $rock=0, $food=0, $archer=0, $infantry=0, $cavalary=0, $x=25, $y=25){
            $this->name = $name;
            $this->population = $population;

            $this->resources = new Resources($iron, $wood, $rock, $food);
            $this->troops = new Troops($archer, $infantry, $cavalary);

            $this->x = $x;
            $this->y = $y;

        }
        
        public function get_data(){
            //join the arrys
            return array_merge(
                array(
                "username" => $this->name,
                "population" => $this->population,
                "x"    => $this->x,
                "y"    => $this->y,
                ),
                $this->resources->get_data(),
                $this->troops->get_data()
            );

        }

        public function get_position(){
            return array(
                "x" => $this->x,
                "y" => $this->y,
            );
        }
    }
    
    class Resources{
        public $iron = 0;
        public $wood = 0;
        public $rock = 0;
        public $food = 0;

        function __construct($iron=0, $wood=0, $rock=0, $food=0){
            $this->iron = $iron;
            $this->wood = $wood;
            $this->rock = $rock;
            $this->food = $food;
        }

        function get_data(){
            return array(
                "iron" => $this->iron,
                "wood" => $this->wood,
                "rock" => $this->rock,
                "food" => $this->food,
            );
        }
    }

    class Troops{
        public $archer = 0;
        public $infantry = 0;
        public $cavalary = 0;

        function __construct($archer=0, $infantry=0, $cavalry=0){
            $this->archer = $archer;
            $this->infantry = $infantry;
            $this->cavalary = $cavalry;
        }

        public function get_data(){
            return array(
                "archer" => $this->archer,
                "infantry" => $this->infantry,
                "cavalry" => $this->cavalary,
            );
        }
    }