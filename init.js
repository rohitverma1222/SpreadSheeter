let rows = 100;   //form 1 to 100 rows is used in
let column = 26;  //form A to z column is used in excel

let addressColumnContainer = document.querySelector(".address-col-cont");
let addressRowContainer = document.querySelector(".address-row-cont");
let cellsContainer=document.querySelector(".cells-cont")
let AddressInputbar=document.querySelector(".address-bar");


// creating left row from 1 to 100 numbers
//Idea is to create divs and add that div into a addressColumnContainer 

for (let i = 0; i < rows; i++) {
    let addressColumn = document.createElement("div");
    addressColumn.setAttribute("class", "address-col");
    addressColumn.innerText = i + 1;
    addressColumnContainer.appendChild(addressColumn);
}


//creating right column from a to z 
//Idea is to create divs and add that div into a addressRowContainer 
for (let i = 0; i < column; i++) {
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText = String.fromCharCode(i + 65);   //converting ascii value to character

    //append new div to addressRowContainer
    addressRowContainer.appendChild(addressRow);
}


// Creating 2d grid of excel
//Idea is to create 100 Row div's and in each div there will be 26 column div's

for(let i=0;i<rows;i++)
{
    let rowContainer=document.createElement("div");
    rowContainer.setAttribute("class","rowProp")
    for(let j=0;j<column;j++)
    {
        let cell=document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true")
        rowContainer.appendChild(cell);
        //Display address of column and row in Address-bar Input
        EventListenerForAddressBarDisplay(cell,i,j);
    }
    cellsContainer.appendChild(rowContainer);
}


//Get the cell and i and j for row and coloumns
function EventListenerForAddressBarDisplay(cell,i,j)
{
    cell.addEventListener("click",(e)=>{
        let rowID=i+1;
        let ColumnID=String.fromCharCode(65+j);
        AddressInputbar.value=ColumnID+rowID;
    })
}
