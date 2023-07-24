<?php

// this file handle direct database queries from front end
ini_set('display_errors', 1);

include_once('../database_query.php');

// get the requested data from frontend (helper.js) inside the POST request and do the query
if (isset($_POST["parameter"]) && isset($_POST["colums"]) && isset($_POST["data"])) {
    $parameter = $_POST["parameter"];
    $colums = $_POST["colums"];
    $table = $_POST["data"];

    // realize the query with specific parameters
    $db = new databaseQuery();

    $result = $db->select($colums,$table,$parameter);

    // return the data to the frontend
    echo json_encode($result);
}else{
    echo json_encode("error");
}

