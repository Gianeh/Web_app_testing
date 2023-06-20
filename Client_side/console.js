
export function hideAgain() {
    var input = document.getElementById("cheat_key");
    var button = document.getElementById("cache");
    button.style.display = "none";
    input.style.display = "none";
    input.value = "";
}

function handleKeyPress(event) {
    if (event.key === "\\") {
        var input = document.getElementById("cheat_key");
        var button = document.getElementById("cache");
        button.style.display = "block";
        input.style.display = "block";
        input.style.margin = "auto";
        button.style.margin = "auto";
        input.focus();
    }
}

export function setConsole(){
    let console = document.addEventListener("keydown", handleKeyPress(event));
}
