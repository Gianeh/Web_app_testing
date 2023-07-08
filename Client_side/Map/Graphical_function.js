// This file will contain graphical functions for the map


// idea

// The concept byond drawing is putting important things at the end to avoid overwriting

// 1) draw the map
// 2) draw the rocks, trees, whater
// 3) draw the player village and enemy villages

// Function to draw rocks inside the map
export function drawRock() {

    // max e min number of rock spawn
    const MAX_ROCKS = 5;  // MAX Number of rocks per row
    const MIN_ROCKS = 2;  // MIN Number of rocks per row
    const DENSITY = 5;    // Number Of row with rocks

    const MIN_ROWS_DISTANCE = 5; // Minimum distance between rows with rocks

    // get the table
    let table = document.getElementById("WarMap");

    // get number of rows
    let rows = localStorage.getItem("Rows");
    let columns = localStorage.getItem("Cols");

    // randomize the number of rocks per Row 
    let rocksPerRow = Math.floor(Math.random() * (MAX_ROCKS - MIN_ROCKS + 1)) + MIN_ROCKS;
    let rowsWithRocks = [];

    console.log("rocksPerRow", rocksPerRow);

    // randomixe the number of rows with rocks
    for (let i = 0; i < DENSITY; i++) {
        rowsWithRocks[i] = Math.floor(Math.random() * (rows - DENSITY + 1)) + DENSITY;
        //check if row containing rocks is too close to the previous one
        if ((rowsWithRocks[i] < (rowsWithRocks[i - 1] + MIN_ROWS_DISTANCE) && i != 0)) {
            rowsWithRocks[i] = rowsWithRocks[i - 1] + MIN_ROWS_DISTANCE;
        } else if ((rowsWithRocks[i] > (rowsWithRocks[i - 1] - MIN_ROWS_DISTANCE) && i != 0)) {
            rowsWithRocks[i] = rowsWithRocks[i - 1] - MIN_ROWS_DISTANCE;
        }
    }

    console.log("rowsWithRocks", rowsWithRocks);

    let rocksPosition = [];

    //Scroll every row inside the table
    for (let i = 0; i < table.rows.length; i++) {
        // is the right row?
        for (let j = 0; j < DENSITY; j++) {
            if (rowsWithRocks[j] == i) {

                for (let k = 0; k < rocksPerRow; k++) {

                    // randomize position of the rock
                    let rockcell = Math.floor(Math.random() * columns);
                    rocksPosition[k] = rockcell;

                    // check if there was already a rock there  I NEED TO AVOID LOOPS
                    let counter = 0;
                    let different = true;
                    while (different) {
                        let check = 0;
                        counter++;
                        //check entire roksPosition if the new one is different
                        for (let x = 0; x < rocksPosition.length; x++) {
                            let element = rocksPosition[x];
                            if (element == rockcell) {
                                rockcell = Math.floor(Math.random() * columns);
                                rocksPosition[k] = rockcell;
                                break;
                            } else {
                                check++;
                            }
                        }

                        if (check == rocksPosition.length - 1) {
                            different = false;
                        }
                        if (counter == 100) { // if i can't find a different position i will stop
                            different = false;
                        }
                    }
                    console.log("rockposition: ", rocksPosition);
                }

                //Draw rocks inside the randomize chosen row

                for (let x = 0; x < rocksPerRow; x++) {
                    let cell = table.rows[i].cells[rocksPosition[x]];
                    console.log("cell: ", i, " ", rocksPosition[x]);
                    cell.className = "rock_cell";
                }

            }
        }

    }

}

// a function that draw the player and the enemy village
export function drawPlayerAndEnemy(CurrentOrigin, enemypos, player) {

    // get the table
    let table = document.getElementById("WarMap");

    // scroll all the table
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            // get the cell
            let cell = table.rows[i].cells[j];

            // check if the cell is the player position
            if ((i + CurrentOrigin["y"]) == player["y"] && (j + CurrentOrigin["x"]) == player["x"]) {
                cell.className = "playerVillage";
                cell.id = "playerVillage";
                cell.innerHTML = "P";
            }
            // check if the cell is the enemy position
            for (let k in enemypos) {
                if (j + CurrentOrigin["x"] == enemypos[k]["x"] && i + CurrentOrigin["y"] == enemypos[k]["y"]) {
                    cell.className = "enemyVillage";
                    cell.id = "enemyVillage";
                    cell.innerHTML = "E";
                }
            }
        }
    }

}


// a function that drow trees around the map
export function drawTrees(){

}