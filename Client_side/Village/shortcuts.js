export function hideCheats() {
    var cheatDiv = document.getElementById("cheat_section");
    cheatDiv.style.display = "none";
    // acquire every element in the cheat section div
    var cheatElements = cheatDiv.getElementsByTagName("*");
    // make every element in the cheat section div invisible
    for (var i = 0; i < cheatElements.length; i++) {
        cheatElements[i].style.display = "none";
    }
}

export function showCheats() {
    // make every element in the cheat section div visible
    var cheatDiv = document.getElementById("cheat_section");
    cheatDiv.style.display = "inline-block";
    // acquire every element in the cheat section div
    var cheatElements = cheatDiv.getElementsByTagName("*");
    // make every element in the cheat section div visible
    for (var i = 0; i < cheatElements.length; i++) {
        cheatElements[i].style.display = "inline-block";
    }
}