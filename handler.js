// this file handles the first base functions of the game

function setHandlers(){
    let t = document.getElementById("townhall");
    t.addEventListener("click", townhallClick);
    
}

function townhallClick(event){
    let info = document.getElementById("info");
    info.innerHTML = "Townhall clicked";
}