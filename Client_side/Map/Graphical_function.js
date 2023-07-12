// This file will contain graphical functions for the map


// idea

// The concept byond drawing is putting important things at the end to avoid overwriting

// 1) draw the map
// 2) draw the rocks, trees, water
// 3) draw the player village and enemy villages


const CryptoJS = require('crypto-js');

// Function to draw rocks inside the map
export function drawLandScape() {

    /*

    // DEFAULT VALUE
    let number_of_rocks = 3;  // Number of rocks per row
    let number_of_trees = 5;  // Number Of trees per row
    let number_of_water = 2;  // Number Of water per row
    let density = 12;         // Number Of row with element

    // get current origin
    let CurrentOrigin = localStorage.getItem("CurrentOrigin");

    // realize the seed using hash SHA1 on current origin
    var hash = CryptoJS.SHA1(CurrentOrigin["x"] + CurrentOrigin["y"]);
    var hex = hash.toString(CryptoJS.enc.Hex);
    hash = hex.replace(/\D/g, '');

    console.log("hash seed: ", hash);

    // get rocks position
    let rocksPosition = [];
    for (let i = 0; i < number_of_rocks; i++) {
        rocksPosition[i] = parseInt(input.substring(0+i, 2+i), 10);
    }

    //check if the number of rockposition is usable
    for(let i = 0; i < number_of_rocks; i++){
        if(rocksPosition[i] = 0){
            rocksPosition[i] = ;
        }
        if(rocksPosition[i] > localStorage.getItem("Cols")){
            rocksPosition[i] = ;
        }
        
    }

    console.log("rocks position: ", rocksPosition);

    // get trees position
    let treesPosition = [];
    for (let i = 0; i < number_of_trees; i++) {
        treesPosition[i] = parseInt(input.substring(0+(number_of_rocks*2)+i, 2+(number_of_rocks*2)+i), 10);
    }

    //check if the number of treesposition is usable
    for(let i = 0; i < number_of_trees; i++){
        if(treesPosition[i] = 0){
            treesPosition[i] = ;
        }
        if(treesPosition[i] > localStorage.getItem("Cols")){
            treesPosition[i] = ;
        }
    }

    console.log("trees position: ", treesPosition);

    // get water position
    let waterPosition = [];
    for (let i = 0; i < number_of_water; i++) {
        waterPosition[i] = parseInt(input.substring(0+(number_of_rocks*2)+(number_of_trees*2)+i, 2+(number_of_rocks*2)+(number_of_trees*2)+i), 10);
    }

    //check if the number of waterposition is usable
    for(let i = 0; i < number_of_water; i++){
        if(waterPosition[i] = 0){
            waterPosition[i] = ;
        }
        if(waterPosition[i] > localStorage.getItem("Cols")){
            waterPosition[i] = ;
        }
    }
    
    console.log("water position: ", waterPosition);

    */

    // idea: retrive x,y position from the hash and use them to draw landscape

    // PROS 

    // 1) using hash in this way i dont need to make complex controll
    // 2) is faster than the other method

    // PROBLEM 

    // 1) using his method is very casual how rocks, trees and water are placed
    // 2) x or y can exeeds the map size                                            ---> I NEED TO FIX THIS
    
    // SOLUTION

    // max hash long is 42


    // other idea: use a matrix linearization and a fixed random seed such as 42, then use modulo to chose what to spawn:
    /*
    PYTHON SIMPLIFIED ALGORITHM

    matrix = []
    for i in range(100):
        matrix.append([])
        for j in range(100):
            matrix[i].append(0)



    
    import random

    def linearize(x,y,w):
        return x + y * w

    random.seed(42)

    def set_env(x,y,w):
        num = random.randint(0,1000) + linearize(x,y,w)
        if not num % 97:
            return "r"
        if not num % 82:
            return "t"
        return 0
        
    for i in range(100):
        for j in range(100):
            matrix[i][j] = set_env(i,j,100)
            
    for row in matrix:
        print(row)
    */

    const MAX_ROCKS = 3;
    const MAX_TREES = 5;
    const MAX_WATER = 2;

     // get current origin
     let CurrentOrigin = localStorage.getItem("CurrentOrigin");

     // realize the seed using hash SHA1 on current origin
     var hash = CryptoJS.SHA1(CurrentOrigin["x"] + CurrentOrigin["y"]);
     var hex = hash.toString(CryptoJS.enc.Hex);
     hash = hex.replace(/\D/g, '');
 
     console.log("hash seed: ", hash);

    // get rocks position;
    let rocksPosition = [];
    for (let i = 0; i < MAX_ROCKS; i++) {
        rocksPosition[i]["x"] = parseInt(hash.substring(0+i, 2+i), 10);
        rocksPosition[i]["y"] = parseInt(hash.substring(2+i, 4+i), 10);
    }

    // get trees position
    let treesPosition = [];
    for (let i = 0; i < MAX_TREES; i++) {
        treesPosition[i]["x"] = parseInt(hash.substring(0+i+(MAX_ROCKS*2), 2+i+(MAX_ROCKS*2)), 10);
        treesPosition[i]["y"] = parseInt(hash.substring(6+i+(MAX_ROCKS*2), 8+i+(MAX_ROCKS*2)), 10);
    }

    // get water position
    let waterPosition = [];
    for (let i = 0; i < MAX_WATER; i++) {
        waterPosition[i]["x"] = parseInt(hash.substring(0+i+(MAX_ROCKS*2)+(MAX_TREES*2), 2+i+(MAX_ROCKS*2)+(MAX_TREES*2)), 10);
        waterPosition[i]["y"] = parseInt(hash.substring(10+i+(MAX_ROCKS*2)+(MAX_TREES*2), 12+i+(MAX_ROCKS*2)+(MAX_TREES*2)), 10);
    }

    // scroll all the table
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            // get the cell
            let cell = table.rows[i].cells[j];

            // check if the cell is a rock
            for (let k in rocksPosition) {
                if (j  == rocksPosition[k]["x"] && i  == rocksPosition[k]["y"]) {
                    cell.className = "rock_cell";
                    cell.id = "rock";
                    cell.innerHTML = "R";
                }
            }

            // check if the cell is a tree
            for (let k in treesPosition) {
                if (j == treesPosition[k]["x"] && i == treesPosition[k]["y"]) {
                    cell.className = "tree_cell";
                    cell.id = "tree";
                    cell.innerHTML = "T";
                }
            }

            // check if the cell is a water
            for (let k in waterPosition) {
                if (j  == waterPosition[k]["x"] && i == waterPosition[k]["y"]) {
                    cell.className = "water_cell";
                    cell.id = "water";
                    cell.innerHTML = "W";
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
