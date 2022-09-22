let rows = 100;
let col = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");

// creating row number --> 1 2 3 4 5 ... 
for(let i=0; i<rows; i++){
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i + 1;
    addressColCont.appendChild(addressCol);
}

// creating col name --> A B C D E ....
for(let i=0; i<col; i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText = String.fromCharCode(i + 65);
    addressRowCont.appendChild(addressRow);
}


let cellCont = document.querySelector(".cells-cont");
for(let i=0; i<rows; i++){
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-cont");
    for(let j=0; j<col; j++){
        let cells = document.createElement("div");
        cells.setAttribute("class", "cell");
        cells.setAttribute("contenteditable", "true");
        cells.setAttribute("spellcheck", "false");

        // for cells and storage identification .. 
        cells.setAttribute("rid", i);
        cells.setAttribute("cid", j);

        rowCont.appendChild(cells);
        addListenerForAddressBarDisplay(cells, i, j);
    }
    cellCont.appendChild(rowCont);
}


let addressBar = document.querySelector(".address-bar")
function addListenerForAddressBarDisplay(cells, i, j){
    cells.addEventListener("click", (e) => {
        let rowID = i + 1;
        let colID = String.fromCharCode(65 + j);
        addressBar.value = `${colID}${rowID}`;
    })
}

// by default click on first cell via DOM
let firstCell = document.querySelector(".cell");
firstCell.click();