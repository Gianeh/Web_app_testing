<html lang="it">

<head>
    <title>AOS Test 1</title>
    <style>
        .container {
            width:1000px;
            height: 75px;
            border: 2px solid black;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 50px auto;
        }
        .button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            font-size: 16px;
            border: none;
            border-radius: 5px;
        }
        .info {
            font-size: 20px;
            font-weight: bold;
            margin: auto;
            text-align: center;
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

    <script type="module">
        import { onLoad } from './Client_side/handler_village.js';
        window.onload = onLoad;
    </script>
    
</head>

<body>
    <h1>AOS Test 1</h1>
    <p>Test 1</p>
    <div class="container">
        <button id="warmap" class="button">War Map</button>
    </div>
    
    <table id="Village" style="margin:auto">
        <!-- Table rows and columns are created dynamically in js -->
    </table>

    <br />

    <!-- A div + inner span element to write elements from townhall class (in php) when clicked (js) -->
    <div id="background" style="margin:auto">
        <span class="info" id="info"></span>
    </div>
</body>

</html>