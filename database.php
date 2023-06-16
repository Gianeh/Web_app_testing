<?php
// PHP Data Objects(PDO) Sample Code:
try {
    $conn = new PDO("sqlsrv:server = tcp:aos-database.database.windows.net,1433; Database = AOS_Database", "aosadmin", "AOSpassword!");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "ciao porcodio funziono";
}
catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
    echo "ciao porcodio non funziono";
}

// SQL Server Extension Sample Code:
$connectionInfo = array("UID" => "aosadmin", "pwd" => "AOSpassword!", "Database" => "AOS_Database", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:aos-database.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);
?>