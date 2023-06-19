<?php
    //this file encodes the given username and produces a unique user_id

    function encode($username, $key=42){
        return hash("sha256", $username.$key);
    }