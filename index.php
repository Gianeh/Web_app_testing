<html lang="it">

<head>
    <title>AOS Test 1 ciao come va?</title>
    <style>

        .info {
            font-size: 20px;
            font-weight: bold;
            margin: auto;
            background-color: rgb(196,164,132);
            color: black;
        }

        tr {
            border: 1px solid black;
            width: 30px;
            height: 30px;
        }

        .square {
            border: 1px solid black;
            width: 30px;
            height: 30px;
            background-color: lightgreen;
        }
        .townhall{
            border: 1px solid black;
            width: 30px;
            height: 30px;
            background-color: blue;
        }
        .rockmine{
            border: 1px solid black;
            width: 30px;
            height: 30px;
            background-color: grey;
        }
        .woodchopper{
            border: 1px solid black;
            width: 30px;
            height: 30px;
            background-color: brown;
        }
    </style>

    <script src="Client_side/handler.js"></script>
</head>

<body onload="setHandlers()">
    <h1>AOS Test 1</h1>
    <p>Test 1</p>

    <table id="Village" style="margin:auto">
        <!--A 30 x 30 table-->
        <?php
        for ($i = 0; $i < 30; $i++) {
            echo "<tr class='square'>";
            for ($j = 0; $j < 30; $j++) {
                if($i == 15 && $j == 15){
                    echo "<td id='townhall' class='townhall'>T</td>";
                    continue;
                }else if($i == 12 && $j == 9){
                    echo "<td class='rockmine'>R</td>";
                    continue;
                }else if($i == 19 && $j == 22){
                    echo "<td class='woodchopper'>W</td>";
                    continue;
                }
                echo "<td class='square'>e</td>";
            }
            echo "</tr>";
        }
        ?>
    </table>

    <br />

    <!-- A div + inner span element to write elements from townhall class (in php) when clicked (js) -->
    <div id="background" style="margin:auto">
        <span class="info" id="info"></span>
    </div>
</body>

</html>