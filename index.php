<html lang="it">

<head>
    <title>AOS Test 1 ciao come va?</title>
    <style>
        table {
            border-collapse: collapse;
        }

        td {
            border: 1px solid black;
            width: 20px;
            height: 20px;
        }

        .square {
            width: 20px;
            height: 20px;
        }
</head>

<body>
    <h1>AOS Test 1</h1>
    <p>Test 1</p>

    <table id="Village">
        <!--A 30 x 30 table-->
        <?php
        for ($i = 0; $i < 30; $i++) {
            echo "<tr class='square'>";
            for ($j = 0; $j < 30; $j++) {
                echo "<td class='square'><-></td>";
            }
            echo "</tr>";
        }
        ?>
    </table>
</body>

</html>