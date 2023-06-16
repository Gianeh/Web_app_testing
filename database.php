<?php

// it need to became a class -> custroctor will take as parameter the connection db data

// insert function -> inserisce una nuova riga

// update function -> modifica un record

// RetriveData    -> ottiene dati dal bd

// remove         -> rimuvoe un record intero



// PHP Data Objects(PDO) Sample Code:
try {
    $conn = new PDO("sqlsrv:server = tcp:aos-database.database.windows.net,1433; Database = AOS_Database", "aosadmin", "AOSpassword!");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $query = "SELECT * FROM Dummy_player_data";
    $stmt = $conn->query($query);
    
    // Fetch the results
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // Access the data
        $name = $row['Username'];
        $pwd = $row['Password'];
        // ...access other columns here
        
        // Do something with the data
        echo "Name: $name, password $pwd<br>";
    }
}
catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    echo "ciao porcodio non funziono";
    die(print_r($e));
}

?>