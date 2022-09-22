let sheetDB = [];

for(let i=0; i<rows; i++){
    let sheetRow = [];
    for(let j=0; j<col; j++){
        let cellProp = {
            bold : false,
            italic : false,
            underline : false,
            alignment : "left",
            fontfamily : "monospace",
            fontSize: "14",
            fontColor : "#000000",
            BGcolor : "transparent", 
            value : "",
            formula : "",
            children : []
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".bg-color-prop");

let alignment = document.querySelectorAll(".alignment"); // querySelcetorAll returns a NodeList .. 
let leftAlig = alignment[0];
let centerAlig = alignment[1];
let rightAlig = alignment[2];

let activeColor = "#d1d8e0";
let inactiveColor = "#ecf0f1";


// Attaching listener and applying 2-way binding
bold.addEventListener("click", (e)=>{
    let address = addressBar.value;
    let [ cell, cellProp ] = activeCell(address);
    
    // change in DBsheet
    cellProp.bold = !cellProp.bold;
    // change in UI
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor;
})

italic.addEventListener("click", (e)=>{
    let address = addressBar.value;
    let [ cell, cellProp ] = activeCell(address);
    // change in DBsheet
    cellProp.italic = !cellProp.italic;
    // change in UI
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeColor : inactiveColor;
})

underline.addEventListener("click", (e)=>{
    let address = addressBar.value;
    let [ cell, cellProp ] = activeCell(address);
    // change in DBsheet
    cellProp.underline = !cellProp.underline;
    // change in UI
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeColor : inactiveColor;
})

fontSize.addEventListener("click", (e)=>{
    let address = addressBar.value;
    let [ cell, cellProp ] = activeCell(address);

    //change in DBsheet
    cellProp.fontSize = fontSize.value;
    //change in UI
    cell.style.fontSize = cellProp.fontSize+"px";
    fontSize.value = cellProp.fontSize
})

fontFamily.addEventListener("click", (e)=>{
    let address = addressBar.value;
    let [ cell, cellProp ] = activeCell(address);

    //change in DBsheet
    cellProp.fontFamily = fontFamily.value;
    //change in UI
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily
})

fontColor.addEventListener("change", (e)=>{
    let address = addressBar.value;
    let [ cell, cellProp ] = activeCell(address);

    //DB
    cellProp.fontColor = fontColor.value;

    //UI
    cell.style.color = cellProp.fontColor;
})

BGcolor.addEventListener("change", (e)=>{
    let address = addressBar.value;
    let [ cell, cellProp ] = activeCell(address);

    //DB
    cellProp.BGcolor = BGcolor.value;
    //UI
    cell.style.backgroundColor = cellProp.BGcolor;
})

leftAlig.addEventListener("click", (e)=>{
    let address = addressBar.value;
    let [ cell, cellProp ] = activeCell(address);

    cellProp.alignment = "left";
    cell.style.textAlign = cellProp.alignment;
    
    leftAlig.style.backgroundColor = activeColor;
    rightAlig.style.backgroundColor = inactiveColor;
    centerAlig.style.backgroundColor = inactiveColor;
})

rightAlig.addEventListener("click", (e)=>{
    let address = addressBar.value;
    let [ cell, cellProp ] = activeCell(address);

    cellProp.alignment = "right";
    cell.style.textAlign = cellProp.alignment;

    leftAlig.style.backgroundColor = inactiveColor;
    rightAlig.style.backgroundColor = activeColor;
    centerAlig.style.backgroundColor = inactiveColor;
})

centerAlig.addEventListener("click", (e)=>{
    let address = addressBar.value;
    let [ cell, cellProp ] = activeCell(address);

    cellProp.alignment = "center";
    cell.style.textAlign = cellProp.alignment;

    leftAlig.style.backgroundColor = inactiveColor;
    rightAlig.style.backgroundColor = inactiveColor;
    centerAlig.style.backgroundColor = activeColor;
})

function activeCell(address){
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    
    return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address){
   let RID = Number(address.slice(1) - 1);
   let CID = Number(address.charCodeAt(0)) - 65;
   return [RID, CID];
}

let allCells = document.querySelectorAll(".cell");
for(let i=0; i<allCells.length; i++){
    cellsStylingFromDBsheet(allCells[i]);
}

function cellsStylingFromDBsheet(cell){ 
    
    cell.addEventListener("click", (e)=>{ // after clicking on any cell
        let address = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAddress(address);
        let cellProp = sheetDB[rid][cid];

        // data change 
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "normal";
        cell.style.fontSize = cellProp.fontSize+"px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;
       

        // UI changes 
        bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor;
        italic.style.backgroundColor = cellProp.italic ? activeColor : inactiveColor;
        underline.style.backgroundColor = cellProp.underline ? activeColor : inactiveColor;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        fontSize.value = cellProp.fontSize;
        fontFamily.vale = cellProp.fontFamily;

        switch(cellProp.alignment){
            case "left" :
                cellProp.alignment = "left";
                cell.style.textAlign = cellProp.alignment;
                break;
            case "center" :
                cellProp.alignment = "center";
                cell.style.textAlign = cellProp.alignment;
                break;
            case "right" :
                cellProp.alignment = "right";
                cell.style.textAlign = cellProp.alignment;
                break;
        }

        switch(cellProp.alignment){
            case "left" :
                leftAlig.style.backgroundColor = activeColor;
                rightAlig.style.backgroundColor = inactiveColor;
                centerAlig.style.backgroundColor = inactiveColor;
                break;
            case "center" :   
                leftAlig.style.backgroundColor = inactiveColor;
                rightAlig.style.backgroundColor = inactiveColor;
                centerAlig.style.backgroundColor = activeColor;
                break;
            case "right" :
                leftAlig.style.backgroundColor = inactiveColor;
                rightAlig.style.backgroundColor = activeColor;
                centerAlig.style.backgroundColor = inactiveColor;
                break;
        }
        
    })
}

























