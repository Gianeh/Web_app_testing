<?php 

    // a troops class

    class Troops{
        public $archer = 0;
        public $infantry = 0;
        public $cavalary = 0;

        function __construct($archer=0, $infantry=0, $cavalary=0){
            $this->archer = $archer;
            $this->infantry = $infantry;
            $this->cavalary = $cavalary;
        }

        public function get_data(){
            return array(
                "archer" => $this->archer,
                "infantry" => $this->infantry,
                "cavalary" => $this->cavalary,
            );
        }
    }