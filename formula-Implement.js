//Work On formula bar 

//accessing all the cells to set the value in cellprop object
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < column; j++) {
        let cell = document.querySelector(`.cell[rowid="${i}"][columnid="${j}"]`)
        //using blur event because we have to fetch value after the user completed his task move to another cell
        cell.addEventListener("blur", (Event) => {
            let address = AddressInputbar.value;
            //fetch the address of cell and the current cell object
            let [activecell, cellprop]=getCellandCellprop(address);
            let EnteredValue=activecell.innerText;
            cellprop.value=EnteredValue;
        })
    }
}
 

//there are 2 types of formula
//1.Normal formula which include number only
//2.Expression formula which include row and column address

let formulaBar=document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown",(Event)=>{
    let inputFormula=formulaBar.value;
    
    //if user press enter and formula value if not empty then evalute on this formula
    if(Event.key==="Enter" && inputFormula)
    {
        let evalutedValue=evaluteFormula(inputFormula);

        //to update UI and cellprop in db
        setCellIandCellprop(evalutedValue,inputFormula);
    }
})
//return evalute value of formula 
function evaluteFormula(formula){
    //Finding if there is any character/expression in the formula
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++)
    {
        //if there is any expression in the formula then fetch the cell and its cellprop object
        let isAsciiValue=encodedFormula[i].charCodeAt(0);
        if(isAsciiValue>=65 && isAsciiValue<=90)
        {
            let[cell,cellprop]=getCellandCellprop(encodedFormula[i]);
            encodedFormula[i]=cellprop.value;
        }
    }
    //eval function doesnt work on array
    let decodedFormula=encodedFormula.join(" ");

    return eval(decodedFormula);
}

function setCellIandCellprop(evalutedValue,inputFormula)
{
    let address=AddressInputbar.value;
    let [cell,cellprop]=getCellandCellprop(address);

    //UI update
    cell.innerText=evalutedValue;

    //DB update
    cellprop.value=evalutedValue;
    cellprop.formula=inputFormula;
}