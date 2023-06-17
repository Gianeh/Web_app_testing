<?php

class databaseQuery{

    public $conn;
    function __construct($server="tcp:aos-database.database.windows.net", $user="aosadmin", $pass="AOSpassword!", $db="AOS_Database"){  //connect to the database
        $this->conn = new PDO("sqlsrv:server = ".$server."; Database = ".$db, $user, $pass);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    // a function the create a completely new row
    public function insert($table, $columns, $values){       // insert a new row in the table colums = "column1, column2, column3" values = "value1, value2, value3"
        $query = "INSERT INTO ".$table."(".$columns.") VALUES (".$values.")";
        // try to execute the insertion query
        try {
            $this->conn->query($query);
        } catch (PDOException $e) {
            echo "Database Query Error: " . $e->getMessage();
        }
    }

    // a function that update an already existing row
    /*
    public function update($table, $columns, $values, $where){  
        $query = "UPDATE $table SET $columns = $values WHERE $where";
        $this->conn->query($query);
    }
    */

    // a function that retrive data from the database
    public function RetriveData($columns, $table, $where=""){
        if($where == ""){       // if the where condition is empty it will retrive the whole table
            $query = "SELECT ".$columns. " FROM ".$table;
        }else{
            $query = "SELECT ".$columns. " FROM ".$table. " WHERE ".$where;
        }
        // try to execute the selection query
        try {
            $stmt = $this->conn->query($query);
            // Rest of the code
        } catch (PDOException $e) {
            echo "Database Query Error: " . $e->getMessage();
        }
        $output = array();
        $i = 0;
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            //$output[$row["id"]] = $row;   this would work (maybe) if used record as key is a primary key
            $output[$i] = $row;
            $i++;
        }
        return $output;
    }
    // a function that delete a row from the database
    public function remove($table, $where){
        $query = "DELETE FROM $table WHERE $where";
        $this->conn->query($query);
    }

}


// PHP Data Objects(PDO) Sample Code:
/*
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

?>*/