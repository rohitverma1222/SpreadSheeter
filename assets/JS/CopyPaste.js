let Copybtn = document.querySelector(".copy");
let pastebtn = document.querySelector(".paste");
let cutbtn = document.querySelector(".cut");



let cntrlKey;
document.addEventListener("keydown", (event) => {
    cntrlKey = true;
})
document.addEventListener("keyup", (event) => {
    cntrlKey = false;
})

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < column; j++) {
        let cell = document.querySelector(`.cell[rowid="${i}"][columnid="${j}"]`);
        handleSelectedCells(cell);
    }
}
//create an array which store the copied range data's cell address
let rangeStorage = [];
function handleSelectedCells(cell) {
    cell.addEventListener("click", (event) => {
        if (!cntrlKey) return;

        if (rangeStorage.length >= 2) {
            defaultSelectedCellsUI();
            rangeStorage = [];
        }

        cell.style.border = "2px solid #218c74";

        let rowId = Number(cell.getAttribute("rowid"));
        let columnId = Number(cell.getAttribute("columnid"));
        rangeStorage.push([rowId, columnId]);
    })
}

//change the green cell to the normal cell
function defaultSelectedCellsUI() {
    for (let i = 0; i < rangeStorage.length; i++) {
        let cell = document.querySelector(`.cell[rowid="${rangeStorage[i][0]}"][columnid="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid grey";
        cell.style.borderRight = "none";
        cell.style.borderTop = "none";
    }
}

let copyData = [];
Copybtn.addEventListener("click", (Event) => {

    if (rangeStorage.length < 2)
        return;

    copyData = [];

    let [startRow, startColumn, endRow, endColumn] = [rangeStorage[0][0], rangeStorage[0][1], rangeStorage[1][0], rangeStorage[1][1]];

    for (let i = startRow; i <= endRow; i++) {
        let copyRow = [];
        for (let j = startColumn; j <= endColumn; j++) {
            let cellprop = sheetDB[i][j];
            copyRow.push(cellprop);
        }
        copyData.push(copyRow);
    }
    defaultSelectedCellsUI();
})




cutbtn.addEventListener("click", (event) => {
    if (rangeStorage.length < 2)
        return;
    let [startRow, startColumn, endRow, endColumn] = [rangeStorage[0][0], rangeStorage[0][1], rangeStorage[1][0], rangeStorage[1][1]];

    for (let i = startRow; i <= endRow; i++) {
        for (let j = startColumn; j <= endColumn; j++) {
            let cell = document.querySelector(`.cell[rowid="${i}"][columnid="${j}"]`);

            //DB
            let cellProp = sheetDB[i][j];
            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underline = false;
            cellProp.fontsize = 14;
            cellProp.fontFamily = "monospace";
            cellProp.fontcolor = "#000000";
            cellProp.backgColor = "#000000";
            cellProp.alignment = "left";

            //set UI after Click 
            cell.click();
        }

    }
    defaultSelectedCellsUI();
    rangeStorage = [];
})

pastebtn.addEventListener("click", (Event) => {

    if (rangeStorage.length < 2)
        return;


    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

    //get the target Cell where user want to paste
    let address = AddressInputbar.value;
    //if user click on a cell then fetch the row and column from address
    let [StartRow, StartColumn] = decodeRowIdColumnIDFromAddress(address);

    //r-> refers copydata row
    //c-> refers copydata col

    for (let i = StartRow, r = 0; i <= StartRow + rowDiff; i++, r++) {
        for (let j = StartColumn, c = 0; j <= StartColumn + colDiff; j++, c++) {
            let cell = document.querySelector(`.cell[rowid="${i}"][columnid="${j}"]`);
            if (!cell)
                continue;

            //fetch from DB
            let data = copyData[r][c];
            let cellProp = sheetDB[i][j];

            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.underline;
            cellProp.fontsize = data.fontsize;
            cellProp.fontFamily = data.fontFamily;
            cellProp.fontcolor = data.fontcolor;
            cellProp.backgColor = data.backgColor;
            cellProp.alignment = data.alignment;

            //set UI after Click 
            cell.click();
        }
    }
})
