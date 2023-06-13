<html lang = "it">


    <head>
        <title>Appello straordinario 05/04/2023</title>
        <meta charset = "UTF-8">
        <meta name = "viewport" content = "width=device-width, initial-scale=1.0">
    </head>

    <body>
        <h1>Esercizio 1 - PHP - 15pt</h1>
        <br><br>

        <?php
        $chars1 = ["R", "G", "B"];
        $sizes = ["15px", "25px", "25px", "45px"];
        $chars2 = ["H", "V"];
        ?>

        <form action="handler.php">
            <label for="chars1" style="vertical-align:top">Scegli uno o più caratteri</label>
            <select name="chars1[]" id="chars1" multiple="true">
                <?php
                foreach($chars1 as $c1){
                    echo "<option value='$c1'>$c1</option>";
                }
                ?>
            </select>

            <br>
            <br>

            <label for="size">Scegli una dimensione</label>
            <select name="size" id="size">
                <?php
                foreach($sizes as $s){
                    echo "<option value='$s'>$s</option>";
                }
                ?>
            </select>

            <br>
            <br>

            <label for="char2">Scegli un carattere</label>
            <select name="char2" id="char2">
                <?php
                foreach($chars2 as $c2){
                    echo "<option value='$c2'>$c2</option>";
                }
                ?>
            </select>

            <br> <br>
            <input type="submit" value="invia" name="es1">

        </form>

    </body>

</html>