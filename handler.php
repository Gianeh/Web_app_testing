<html lang="it">
    <head>
        <title >"Process informations"</title>
        <meta charset = "UTF-8">
        <meta name = "viewport" content = "width=device-width, initial-scale=1.0">
    </head>

    <body>
        <?php


        if(isset($_REQUEST["es1"])){
            if(isset($_REQUEST["chars1"])){
                $chars1 = $_REQUEST["chars1"];
                $char2 = $_REQUEST["char2"];
                $size = $_REQUEST["size"];

                // spawn a 2d array with $rows $cols
                $rows = 13;
                $cols = 11;

                if(isset($_SESSION["array_april"])){
                    $array = $_SESSION["array_april"];
                }else{
                    $array = array();
                    for($i = 0; $i < $rows; $i++){
                        $array[$i] = array();
                        for($j = 0; $j < $cols; $j++){
                            $array = null;
                        }
                    }
                }
                // generate new elements
                for($i = 0; $i < $rows; $i++){
                    for($j = 0; $j < $cols; $j++){
                        if($char2 == "H"){
                            $t = ($array[$i][$j-1] + $array[$i][$j] + $array[$i][$j+1]) / 3;
                        }else{ //$char2 == "V"
                            $t = ($array[$i-1][$j] + $array[$i][$j] + $array[$i+1][$j]) / 3;
                        }

                        if(abs($t - $array[$i][$j]) > 10){
                            $array[$i][$j] = $t;
                        }else{
                            $array[$i][$j] = rand(10, 250);
                        }
                    }
                }

                // defining the style section
                echo "<style> td{width:$size;height:$size;} </style>";

                // printing the table
                echo "<table style='margin:auto'>";
                for($i = 0; $i < $rows; $i++){
                    echo "<tr>";
                    for($j = 0; $j < $cols; $j++) {

                        $r = in_array("R", $chars1) ? $array[$i][$j] : 0;
                        $g = in_array("G", $chars1) ? $array[$i][$j] : 0;
                        $b = in_array("B", $chars1) ? $array[$i][$j] : 0;

                        $color = "rgb({$r},{$g},{$b})";

                        echo "<td style='background-color: $color'></td>";

                    }
                    echo "</tr>";
                }
                echo "</table>";



                // save the array in the session
                $_SESSION["array_april"] = $array;

            }else{
                echo "<h1>Non hai scelto un carattere dal primo menu</h1>";
            }
        }else{
            echo "<h1 style='color:red'>This page should be inaccessible without using the index form button</h1>";
        }
        ?>

    </body>

</html>