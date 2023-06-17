<?php
    ini_set('display_errors', 1);
    include_once("database_query.php");

    // create 4 unique record for table Dummy_player_data
    $db = new databaseQuery();

    $db->insert("Dummy_player_data", "id, name, pass, lvl", "1, 'test', 'test', 1");
    $db->insert("Dummy_player_data", "id, name, pass, lvl", "2, 'test2', 'test2', 1");
    $db->insert("Dummy_player_data", "id, name, pass, lvl", "3, 'test3', 'test3', 1");
    $db->insert("Dummy_player_data", "id, name, pass, lvl", "4, 'test4', 'test4', 1");

    // retrieve the whole table from the database
    $table = $db->RetriveData("Dummy_player_data", "*");

    // print table
    echo "<pre>";
    print_r($table);
    echo "</pre>";

    // print every row
    for($i = 0; $i < count($table); $i++){
        echo "<pre>";
        print_r($table[$i]);
        echo "</pre>";
    }

    // $table = array(row1 => array(user => test, pass => test, lvl => 1), row2 => array(user => test2, pass => test2, lvl => 1), row3 => array(user => test3, pass => test3, lvl => 1), row4 => array(user => test4, pass => test4, lvl => 1));