for(let i=0; i<rows; i++){
    for(let j=0; j<col; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e)=>{
            let address = addressBar.value;
            
            let [activecell, cellProp] = activeCell(address);
            let enteredData = activecell.innerText;
            cellProp.value = enteredData;
            
        })
    }
}

let formulaBar = document.querySelector(".formula-bar");

formulaBar.addEventListener("keydown", (e)=>{
    let inputFormula = formulaBar.value;
    inputFormula = inputFormula.trim();
    if(e.key === "Enter" && inputFormula){
        let evaluatedValue = evaluateFormula(inputFormula);
        setCellUIAndCellProp(evaluatedValue, inputFormula);
        addChildToParent(inputFormula);
        console.log(sheetDB);
    }
})

function addChildToParent(formula){ 
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i=0; i<encodedFormula.length; i++){
        let asciValue = encodedFormula[i].charCodeAt(0);
        if(asciValue >= 65 && asciValue <= 90){
            let [parentCell, parentCellProp] = activeCell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
}

function evaluateFormula(formula){
    let encodedFormula = formula.split(" ");
    for(let i=0; i<encodedFormula.length; i++){
        let asciValue = encodedFormula[i].charCodeAt(0);
        if(asciValue >= 65 && asciValue <= 90){
            let [cell, cellProp] = activeCell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }

    let decodedFormula = encodedFormula.join(" ")
    return eval(decodedFormula);
} 


function setCellUIAndCellProp(evaluatedValue, inputFormula){
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);

    cellProp.value = evaluatedValue;
    cellProp.formula = inputFormula;
    cell.innerText = evaluatedValue;

}