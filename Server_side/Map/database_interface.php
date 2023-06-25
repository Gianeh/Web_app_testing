<?php

// COMMENTO A SCOPO DI RICORDO

// ritengo che:

// 0) Un file saparato i torna meglio, possiamo sempre accorparlo o ancora meglio, renderlo disponiile a tutti (village, map)
// 1) Questo metodo funxioni perche il passaggio per la cache impone il caricamento di tutti i dati di tutti i player in cache
// 2) Con questo metodo posso ottenere delle query specifiche senza er forza ottenere tutta la tabella
// 3) Questo metodo evita che i dati completi arrivino al frontend evitando una falla di sicurezza?
// 4) Questo metodo dimando l'overhead di prelevare i dati che desidero senza farli "pickare" dal frontend


// this file handle direct database queries from front end
ini_set('display_errors', 1);

include_once('../database_query.php');

$_SESSION['user_id'] = $user_id;    // update session to increase lifetime (IS IT NEEDED?)

// get the requested data from frontend (helper.js) inside the POST request and do the query
$parameter = $_POST["parameter"];
$colums = $_POST["colums"];
$table = $_POST["data"];

// realize the query with specific parameters
$db = new databaseQuery();

$result = $db->select($colums,$table,$parameter);

// return the data to the frontend
echo json_encode($result);

