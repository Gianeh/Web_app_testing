// This file will contain graphical functions for the map


// idea

// i will print rocks in random position in random rows
// the max numer of Rown is 

export function drawRock() {

    // max e min number of rock spawn
    const MAX_ROCKS = 3;  // MAX Number of rocks per row
    const MIN_ROCKS = 1;  // MIN Number of rocks per row
    const DENSITY = 7;  // Number Of row with rocks

    // get the table
    let table = document.getElementById("WarMap");

    //get player position
    let player = localStorage.getItem("player");
    //get enemy position
    let enemy = localStorage.getItem("enemypos");
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
    }

    console.log("rowsWithRocks", rowsWithRocks);

    let rockDrawn = 0;
    let rocksPosition = [];

    //Scroll every row inside the table
    for (let i = 0; i < table.rows.length; i++) {

        // is the right row?
        for (let j = 0; j < DENSITY; j++) {
            if (rowsWithRocks[j] = i) {
                for (let k = 0; k < rocksPerRow; k++) {

                    // randomize position of the rock
                    let rockcell = Math.floor(Math.random() * Cols);
                    rocksPosition[k] = rockcell;

                    // check if there was already a rock there
                    let different = true;
                    while (different) {
                        let check = 0;

                        //check entire roksPosition if the new one is different
                        for (let x = 0; x < rocksPosition.length; x++) {
                            if (element == rockcell || (rockcell == player[x] && rockcell == player[y]) || (rockcell == enemy[x] && rockcell == enemy[y])) {
                                rockcell = Math.floor(Math.random() * Cols);
                                break;
                            } else {
                                check++;
                            }
                        }
                        if (check == rocksPosition.length - 1) {
                            different = false;
                        }
                    }
                }

                //Draw rocks inside the randomize chosen row
                for (x = 0; x < rocksPerRow; x++){
                    let cell = table.row[i].cell[rocksPosition[x]];
                    console.log("cell: ", i, " ", rocksPosition[x] );
                    cell.className = "rock_cell";
                }

            }
        }

    }

}


