<html lang="it">

<head>
    <title>AOS Test 1 ciao come va?</title>
    <style>

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
    </style>

    <script src="handler.js"><script>
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
                    echo "<td id='townhall' class='townhall'>M</td>";
                    continue;
                }
                echo "<td class='square'>A</td>";
            }
            echo "</tr>";
        }
        ?>
    </table>

    <br />

    <!-- A div + inner span element to write elements from townhall class (in php) when clicked (js) -->
    <div id="info" style="margin:auto; backgroundcolor='lightbrown'">
        <span id="townhall"></span>
    </div>
</body>

</html>