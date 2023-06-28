function onLoad() {
    const table = document.createElement("table");
    table.classList.add("table");

    for (let i = 0; i < 30; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 30; j++) {
            const cell = document.createElement("td");
            cell.innerHTML = "T";
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    const divTable = document.querySelector(".divTable");
    divTable.appendChild(table);

}