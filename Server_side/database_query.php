<?php

class databaseQuery{

    private $server = "";
    private $user;
    private $pass;
    private $db;

    public $conn;
    function __construct($server="tcp:aos-database.database.windows.net,1433", $user="aosadmin", $pass="AOSpassword!", $db="AOS_Database"){  //connect to the database
        $this->server = "sqlsrv:server = ".$server;
        $this->user = $user;
        $this->pass = $pass;
        $this->db = "; Database = ".$db;
    }


    // a function the create a completely new row
    public function insert($table, $columns, $values){       // insert a new row in the table colums = "column1, column2, column3" values = "value1, value2, value3"
       
        // create a new pdo connection
        try {
            $this->conn = new PDO($this->server.$this->db, $this->user, $this->pass);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Database Connection Error: " . $e->getMessage();
        }
        $query = "INSERT INTO ".$table."(".$columns.") VALUES (".$values.")";
        // try to execute the insertion query
        try {
            $this->conn->query($query);
        } catch (PDOException $e) {
            echo "Database Query Error: " . $e->getMessage();
        }
        
        //close pdo connection
        $this->conn = null;
    }

    // a function that update an already existing row
    /*
    public function update($table, $columns, $values, $where){  
        $query = "UPDATE $table SET $columns = $values WHERE $where";
        $this->conn->query($query);
    }
    */

    // a function that retrive data from the database
    public function retriveData($columns, $table, $where=""){

        //execute the conncetio to the database
        try {
            $this->conn = new PDO($this->server.$this->db, $this->user, $this->pass);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Database Connection Error: " . $e->getMessage();
        }

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
        // fetch the data from the database
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $output[$row["id"]] = $row; // add the row to the output array at the specified user_id which is then retrieved by session!

        }

        //close pdo connection and return the output
        $this->conn = null;
        return $output;
    }
    // a function that delete a row from the database
    public function remove($table, $where){
        $query = "DELETE FROM $table WHERE $where";
        $this->conn->query($query);
    }
    /// FIX THERE ^^^^^^^

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