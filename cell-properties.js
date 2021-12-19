//storage
//create a array of array so we can store key_values like bold,underline of each row's column
let sheetDB = [];

//Using object to store all of the value of each cell and each cell has an object 
for (let i = 0; i < rows; i++) {

    //create an array of objects 
    //store the value of cell in a row
    let sheetRow = [];

    for (let j = 0; j < column; j++) {
        let cellprop = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontsize: "12",
            fontcolor: "#000000",
            backgColor: "#000000",
            //To apply formula on a specific cell with that same cell value
            value:"",
            formula:"",
        }

        sheetRow.push(cellprop)
    }

    //each row is added to the sheetDB
    sheetDB.push(sheetRow);
}


//Selector for cell Properties

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline")
let fontsize = document.querySelector(".font-size-prop")
let fontfamily = document.querySelector(".font-family-prop")
let fontcolor = document.querySelector(".font-color-prop")
let bgcolor = document.querySelector(".bg-color-prop")

let alignment = document.querySelectorAll(".alignment")
let leftAlignment = alignment[0];
let centerAlignment = alignment[1];
let rightAlignment = alignment[2];

//color variable
let activeColorprop = "grey";
let inactivecolorprop = "#ecf0f1";


//Application of two-way Binding
//Attach property Listeners

//When user click on bold button 
bold.addEventListener("click", (event) => {
    //fetch the address of grid cell
    let address = AddressInputbar.value;
    let [cell, cellprop] = getCellandCellprop(address);

    // Modification of object property according to the grid Cell

    cellprop.bold = !cellprop.bold;   //Data change
    cell.style.fontWeight = cellprop.bold ? "bold" : "normal"; //UI Change

    //Now change the color of bold button so it look like pressed button
    bold.style.backgroundColor = cellprop.bold ? activeColorprop : inactivecolorprop;
})

//when user click on italic 
italic.addEventListener("click", (event) => {
    //fetch the address of grid cell
    let address = AddressInputbar.value;
    let [cell, cellprop] = getCellandCellprop(address);

    // Modification of object property according to the grid Cell

    cellprop.italic = !cellprop.italic;   //Data change
    cell.style.fontStyle = cellprop.italic ? "italic" : "normal"; //UI Change

    //Now change the color of bold button so it look like pressed button
    italic.style.backgroundColor = cellprop.italic ? activeColorprop : inactivecolorprop;
})

//when user click on underline
underline.addEventListener("click", (event) => {
    //fetch the address of grid cell
    let address = AddressInputbar.value;
    let [cell, cellprop] = getCellandCellprop(address);

    // Modification of object property according to the grid Cell

    cellprop.underline = !cellprop.underline;   //Data change
    cell.style.textDecoration = cellprop.underline ? "underline" : "normal"; //UI Change

    //Now change the color of bold button so it look like pressed button
    underline.style.backgroundColor = cellprop.underline ? activeColorprop : inactivecolorprop;
})

fontsize.addEventListener("change", (event) => {
    //fetch the address of grid cell
    let address = AddressInputbar.value;
    let [cell, cellprop] = getCellandCellprop(address);

    // Modification of object property according to the grid Cell

    cellprop.fontsize = fontsize.value;   //Data change
    cell.style.fontSize = cellprop.fontsize + "px"; //UI Change
    fontsize.value = cellprop.fontsize;

})

fontfamily.addEventListener("change", (event) => {
    //fetch the address of grid cell
    let address = AddressInputbar.value;
    let [cell, cellprop] = getCellandCellprop(address);

    // Modification of object property according to the grid Cell

    cellprop.fontFamily = fontfamily.value;   //Data change
    cell.style.fontFamily = cellprop.fontFamily; //UI Change
    fontfamily.value = cellprop.fontFamily;

})

fontcolor.addEventListener("change", (event) => {
    //fetch the address of grid cell
    let address = AddressInputbar.value;
    let [cell, cellprop] = getCellandCellprop(address);

    // Modification of object property according to the grid Cell

    cellprop.fontcolor = fontcolor.value;   //Data change
    cell.style.color = cellprop.fontcolor; //UI Change
    fontcolor.value = cellprop.fontcolor;

})
bgcolor.addEventListener("change", (event) => {
    //fetch the address of grid cell
    let address = AddressInputbar.value;
    let [cell, cellprop] = getCellandCellprop(address);

    // Modification of object property according to the grid Cell

    cellprop.backgColor = bgcolor.value;   //Data change
    cell.style.backgroundColor = cellprop.backgColor; //UI Change
    bgcolor.value = cellprop.backgColor;

})

//there are 3 types of alignment if any of one is applied other should be inactive
alignment.forEach((alignElement) => {
    alignElement.addEventListener("click", (event) => {
        //fetch the address of grid cell
        let address = AddressInputbar.value;
        let [cell, cellprop] = getCellandCellprop(address);

        let alignValue = event.target.classList[0];

        cellprop.alignment = alignValue;
        cell.style.textAlign = cellprop.alignment;
        //active the applied alignment and inactive the other two

        switch (alignValue) {
            case "left":
                leftAlignment.style.backgroundColor = activeColorprop;
                centerAlignment.style.backgroundColor = inactivecolorprop;
                rightAlignment.style.backgroundColor = inactivecolorprop;
                break;
            case "right":
                leftAlignment.style.backgroundColor = inactivecolorprop;
                centerAlignment.style.backgroundColor = inactivecolorprop;
                rightAlignment.style.backgroundColor = activeColorprop;
                break;
            case "center":
                leftAlignment.style.backgroundColor = inactivecolorprop;
                centerAlignment.style.backgroundColor = activeColorprop;
                rightAlignment.style.backgroundColor = inactivecolorprop;
                break;

        }
    })
})




//Need of Two way Binding 
//if we click on something on a cell and 
// we use some action button then it will not removed when we click on different cell 
let allCells = document.querySelectorAll(".cell");
for (let i = 0; i < allCells.length; i++) {
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
    cell.addEventListener("click", (event) => {
        let address = AddressInputbar.value;
        //if user click on a cell then fetch his row and column
        let [rowId, columnID] = decodeRowIdColumnIDFromAddress(address);

        //and access that object 
        let cellprop = sheetDB[rowId][columnID];

        //fetch the Cell properties from object
        cell.style.fontWeight = cellprop.bold ? "bold" : "normal"; //UI Change
        cell.style.fontStyle = cellprop.italic ? "italic" : "normal";
        cell.style.textDecoration = cellprop.underline ? "underline" : "normal";
        cell.style.fontSize = cellprop.fontsize + "px";
        cell.style.color = cellprop.fontcolor;
        cell.style.fontFamily = cellprop.fontFamily;
        cell.style.backgroundColor = cellprop.backgColor ==="#000000" ?"transparent":cellprop.backgColor;
        cell.style.textAlign = cellprop.alignment;
       
        //apply properties on Grid cell
        bold.style.backgroundColor = cellprop.bold ? activeColorprop : inactivecolorprop;
        italic.style.backgroundColor = cellprop.italic ? activeColorprop : inactivecolorprop;
        underline.style.backgroundColor = cellprop.underline ? activeColorprop : inactivecolorprop;
        fontcolor.value = cellprop.fontcolor;
        bgcolor.value = cellprop.backgColor;
        fontsize.value = cellprop.fontsize;
        fontfamily.value = cellprop.fontFamily;
        switch (cellprop.alignment) {
            case "left":
                leftAlignment.style.backgroundColor = activeColorprop;
                centerAlignment.style.backgroundColor = inactivecolorprop;
                rightAlignment.style.backgroundColor = inactivecolorprop;
                break;
            case "right":
                leftAlignment.style.backgroundColor = inactivecolorprop;
                centerAlignment.style.backgroundColor = inactivecolorprop;
                rightAlignment.style.backgroundColor = activeColorprop;
                break;
            case "center":
                leftAlignment.style.backgroundColor = inactivecolorprop;
                centerAlignment.style.backgroundColor = activeColorprop;
                rightAlignment.style.backgroundColor = inactivecolorprop;
                break;
        }
    })
}





function getCellandCellprop(address) {
    //decode the address in row and coloumn number form
    let [rowid, columnid] = decodeRowIdColumnIDFromAddress(address);
    //access cell for storage purpose
    let cell = document.querySelector(`.cell[rowid="${rowid}"][columnid="${columnid}"]`)

    //Access grid cell from database
    let cellProp = sheetDB[rowid][columnid];
    return [cell, cellProp];
}


function decodeRowIdColumnIDFromAddress(address) {
    //if we talk about default value when user is not interacted
    //we got A1 by address-input-bar 

    //"1 " is fetched from "A1" but the grid start from 0 so "1-0"
    let rowid = Number(address.slice(1) - 1);

    // "A" is fetched from "A1" and we have to convert it 
    // character to integer
    let columnId = Number(address.charCodeAt(0)) - 65;

    return [rowid, columnId];
}