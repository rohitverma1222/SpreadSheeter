//Work On formula bar 

//accessing all the cells to set the value in cellprop object
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < column; j++) {
        let cell = document.querySelector(`.cell[rowid="${i}"][columnid="${j}"]`)
        //using blur event because we have to fetch value after the user completed his task move to another cell
        cell.addEventListener("blur", (Event) => {
            let address = AddressInputbar.value;
            //fetch the address of cell and the current cell object
            let [activecell, cellprop] = getCellandCellprop(address);
            let EnteredValue = activecell.innerText;

            if(EnteredValue===cellprop.value)
            return;

            cellprop.value = EnteredValue;

            removeChildFromparent(cellprop.formula);
            cellprop.formula="";
            updateChildrenCells(address);
        })
    }
}


//there are 2 types of formula
//1.Normal formula which include number only
//2.Expression formula which include row and column address

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (Event) => {
    let inputFormula = formulaBar.value;

    //if user press enter and formula value if not empty then evalute on this formula
    if (Event.key === "Enter" && inputFormula) {
        //if you have some previous formula exist and then you want to add new formula
        //then remove the previous formula 
        let address = AddressInputbar.value;
        let [cell, cellProp] = getCellandCellprop(address);

        if (inputFormula !== cellProp.formula)
            removeChildFromparent(cellProp.formula);

        let evalutedValue = evaluteFormula(inputFormula);

        //to update UI and cellprop in db
        setCellUIandCellprop(evalutedValue, inputFormula,address);
        addChildToParent(inputFormula);
        // console.log(sheetDB);
        updateChildrenCells(address)
    }
})

//let suppose if there is a C cell which depend upon B cell
// and B cell is depended upon A cell if you change value of A 
// then the changes must be reflect of Cell B,C 
// to reflect the value on change we need parent and children relationship
// if we change parent then we also have to change the children value as well
function updateChildrenCells(parentAddress)
{
    let [parentcell,parentcellprop]=getCellandCellprop(parentAddress);
    let children=parentcellprop.children;

    for(let i=0;i<children.length;i++)
    {
        let childAddress=children[i];
        let [childcell,childCellprop]=getCellandCellprop(childAddress);
        let childFormula=childCellprop.formula;

        let evalutedValue=evaluteFormula(childFormula);
        setCellUIandCellprop(evalutedValue,childFormula,childAddress);
        //Recursion appears
        //if children has children then also update the children 
        //A->b and B->C if we change A then also change C.
        updateChildrenCells(childAddress);
    }
}


//Add children cell to parent 
function addChildToParent(formula) {
    let childAddress = AddressInputbar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        //if there is any expression in the formula then fetch the cell and its cellprop object
        let isAsciiValue = encodedFormula[i].charCodeAt(0);
        if (isAsciiValue >= 65 && isAsciiValue <= 90) {
            let [parentcell, parentcellprop] = getCellandCellprop(encodedFormula[i]);
            parentcellprop.children.push(childAddress);
        }
    }
}
//remove children cell from parent 

function removeChildFromparent(formula) {
    let childAddress = AddressInputbar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        //if there is any expression in the formula then fetch the cell and its cellprop object
        let isAsciiValue = encodedFormula[i].charCodeAt(0);
        if (isAsciiValue >= 65 && isAsciiValue <= 90) {
            let [parentcell, parentcellprop] = getCellandCellprop(encodedFormula[i]);
            let IndexOfChildrenTobeRemoved=parentcellprop.children.indexOf(childAddress);
            parentcellprop.children.splice(IndexOfChildrenTobeRemoved,1);
        }
    }
}

//return evalute value of formula 
function evaluteFormula(formula) {
    //Finding if there is any character/expression in the formula
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        //if there is any expression in the formula then fetch the cell and its cellprop object
        let isAsciiValue = encodedFormula[i].charCodeAt(0);
        if (isAsciiValue >= 65 && isAsciiValue <= 90) {
            let [cell, cellprop] = getCellandCellprop(encodedFormula[i]);
            encodedFormula[i] = cellprop.value;
        }
    }
    //eval function doesnt work on array
    let decodedFormula = encodedFormula.join(" ");

    return eval(decodedFormula);
}

function setCellUIandCellprop(evalutedValue, inputFormula,address) {
    // let address = AddressInputbar.value;
    let [cell, cellprop] = getCellandCellprop(address);

    //UI update
    cell.innerText = evalutedValue;

    //DB update
    cellprop.value = evalutedValue;
    cellprop.formula = inputFormula;
}