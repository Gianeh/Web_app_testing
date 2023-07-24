// This file will contain graphical functions for the map


// idea

// The concept byond drawing is putting important things at the end to avoid overwriting

// 1) draw the map
// 2) draw the rocks, trees, water
// 3) draw the player village and enemy villages


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
            }
            // check if the cell is the enemy position
            for (let k in enemypos) {
                if (((j + CurrentOrigin["x"]) == enemypos[k]["x"]) && ((i + CurrentOrigin["y"]) == enemypos[k]["y"])) {
                    cell.className = "enemyVillage";
                    cell.id = "enemyVillage";
                }
            }
        }
    }

}

// a function that reload the css
export function reloadCSS() {
    let links = document.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
      if (links[i].getAttribute("rel") == "stylesheet") {
        let href = links[i].getAttribute("href");
        links[i].setAttribute("href", href + "?version=" + new Date().getTime());
      }
    }
  }