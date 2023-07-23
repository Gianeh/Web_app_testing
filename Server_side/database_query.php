<?php

class databaseQuery{

    private $server = "";
    private $user;
    private $pass;
    private $db;

    public $conn;
    function __construct($server="tcp:ageofstronghold.database.windows.net,1433", $user="AOSAdmin", $pass="AOSPassword!", $db="AgeofStronghold-database"){  //connect to the database
        $this->server = "sqlsrv:server = ".$server;
        $this->user = $user;
        $this->pass = $pass;
        $this->db = "; Database = ".$db;
    }

    public function connect(){
        try {
            $this->conn = new PDO($this->server.$this->db, $this->user, $this->pass);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Database Connection Error: " . $e->getMessage();
        }
    }


    // a function the create a completely new row
    public function insert($table, $columns, $values){       // insert a new row in the table colums = "column1, column2, column3" values = "value1, value2, value3"
       
        // create a new pdo connection
        $this->connect();

        $query = "INSERT INTO ".$table."(".$columns.") VALUES (".$values.")";
        // try to execute the insertion query
        try {
            $this->conn->query($query);
        } catch (PDOException $e) {
            echo "Database Insertion Error: " . $e->getMessage();
        }
        
        //close pdo connection
        $this->conn = null;
    }

    // a function that retrive data from the database
    public function select($columns, $table, $where=""){

        //execute the conncetion to the database
        $this->connect();

        if($where == ""){       // if the where condition is empty it will retrive the whole table
            $query = "SELECT ".$columns." FROM ".$table;
        }else{
            $query = "SELECT ".$columns." FROM ".$table." WHERE ".$where;
        }
        // try to execute the selection query
        try {
            $stmt = $this->conn->query($query);
            // Rest of the code
        } catch (PDOException $e) {
            echo "Database Selection Error: " . $e->getMessage();
            exit();
        }
        $output = array();
        // fetch the data from the database
        $i = 0;
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $output[$i] = $row; // add the row to the output array at the numeric index $i
            $i++;
        }

        //close pdo connection and return the output
        $this->conn = null;
        return $output;
    }
    // a function that delete a row from the database
    public function remove($table, $where){
        // connect to the database
        $this->connect();
        // build deletion query
        $query = "DELETE FROM "."$table"." WHERE ".$where;
        // try to execute the deletion query
        try {
            $this->conn->query($query);
        } catch (PDOException $e) {
            echo "Database Removal Error: " . $e->getMessage();
        }
    }
    
    
    // a function that updates existing data in the database
    public function update($table, $columns, $values, $where){
        // connect to the database
        $this->connect();
        // build update query for each column and value pair
        $column_array = explode(",", $columns);
        $value_array = explode(",", $values);
        $query = "UPDATE ".$table." SET ";
        for ($i = 0; $i < count($column_array); $i++) {
            $query .= $column_array[$i]." = ?";
            if ($i < count($column_array) - 1) {
                $query .= ", ";
            }
        }
        $query .= " WHERE ".$where;
        // prepare the update statement
        $stmt = $this->conn->prepare($query);
        // bind the values to the statement
        for ($i = 0; $i < count($value_array); $i++) {
            $stmt->bindValue($i + 1, $value_array[$i]);
        }
        // try to execute the update query
        try {
            $stmt->execute();
        } catch (PDOException $e) {
            echo "Database Update Error: " . $e->getMessage() . "for table: " . $table . " with columns: " . $columns . " and values: " . $values . " and where: " . $where;
        }
    }

}