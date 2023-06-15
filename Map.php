<!DOCTYPE html>
<html>

<head>
    <title>AOS Test Map</title>
    <script src="./Client_side/Map/handler_map.js"></script>
    <style>
        table {

            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;
            height: 100%;
            
        }

        .table-container {
            width: 1000px;
            /* container dimension */
            height: 1000px;
            /* container dimension */
            overflow: auto;
            margin: auto;
        }

        .square {
            width: 30px;
            height: 30px;
            border: 1px solid black;
            background-color: green;
        }

        tr {
            border: 1px solid black;
            width: 30px;
            height: 30px;
        }

        .red {
            background-color: red;
        }

        .playerVillage {
            background-color: blue;
            width: 30px;
            height: 30px;
            text-align: center;
            border: 1px solid black;
        }

        .enemyVillage {
            background-color: red;
            width: 30px;
            height: 30px;
            text-align: center;
            border: 1px solid black;
        }
    </style>
</head>

<body onload="setHandlers()">
    <div class="table-container">
        <table id="WarMap" style="margin:auto">

            <?php
            $rows = 90; // row number
            $cols = 90; // cols number

            //getting information about the player position
            //file get content is in charge to take http request without consider if is it post or get
            //
            $data = $_POST["data"];

            $playerRow = $data['x'];
            $playerCol = $data['y'];

            
            //offsetting the map to center the player position
            $offsetRow = max(0, $playerRow - 5);
            $offsetCol = max(0, $playerCol - 5);

           

            for ($i = 0; $i < $rows; $i++) {
                echo "<tr>";
                for ($j = 0; $j < $cols; $j++) {
                    if ($i == $playerRow && $j == $playerCol) {
                        echo "<td id='playerVillage' class='playerVillage'>P</td>";
                        continue;
                    } else if ($i == 20 && $j == 20) {
                        echo "<td id='enemyVillage' class='enemyVillage'>E</td>";
                        continue;
                    } else {
                        echo "<td class='square'></td>";
                    }
                }
                echo '</tr>';
            }
            ?>
        </table>

        <script>
            document.addEventListener("DOMContentLoaded", function() {

                var tableContainer = document.querySelector(".table-container");
                var playerCell = document.getElementById("playerVillage");

                // calcultate the offset of the player cell
                var offsetTop = playerCell.offsetTop - (tableContainer.offsetHeight / 2) + (playerCell.offsetHeight / 2);
                var offsetLeft = playerCell.offsetLeft - (tableContainer.offsetWidth / 2) + (playerCell.offsetWidth / 2);

                // apply the offset to the container
                tableContainer.scrollTop = offsetTop;
                tableContainer.scrollLeft = offsetLeft;
            });
        </script>

    </div>
    <div id="actions" style="margin:auto">
        <button onclick="attack()">Attack</button>

</body>

</html>