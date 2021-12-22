let sheetsFolderContainer = document.querySelector(".sheets-folder-cont");
let addSheetbtn = document.querySelector(".sheet-add-icon");

addSheetbtn.addEventListener("click", (event) => {
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");

    let allSheetFolder = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolder.length);

    sheet.innerHTML = `
    <div class="sheet-content">Sheet-${allSheetFolder.length + 1}</div>
    `;

    sheet.scrollIntoView();
    sheetsFolderContainer.appendChild(sheet);
    createSheetDB();
    createGraphComponentMatrix();
    handleSheetActiveness(sheet);

    sheet.click();
})


//Idea is create a big array represent the sheets and in each sheet we store the SHEETDB and GRAPH COMPONENT MATRIX 
//fetch the array on the basis of ID of the sheet
function handleSheetActiveness(sheet) {
    sheet.addEventListener("click", (event) => {
        let SheetIndex = Number(sheet.getAttribute("id"));
        handleSheetDB(SheetIndex);
        handleSheetProperties();
        handleSheetUI(sheet);
        handleSheetRemoval(sheet);
    })
}

function handleSheetRemoval(sheet) {
    sheet.addEventListener("mousedown", (event) => {
        if (event.button !== 2)
            return;

        let allSheetFolder = document.querySelectorAll(".sheet-folder");
        if (allSheetFolder.length === 1) {
            alert("You need to have atleast 1 Sheet!!");
            return;
        }

        let response = confirm("Yout Sheet Will be removed permanently, Are your Sure?");
        if (response == false)
            return;

        let sheetIdx = Number(sheet.getAttribute("id"));
        //remove from database
        collectedSheetDB.splice(sheetIdx, 1);
        collectedGraphComponent.splice(sheetIdx, 1);

        //remove from UI
        handleSheetUIRemoval(sheet);

        //by default DB to sheet 1 (active)
        sheetDB = collectedSheetDB[0];
        graphComponentMatrix = collectedGraphComponent[0];
        handleSheetProperties();

    })
}

function handleSheetUIRemoval(sheet) {
    sheet.remove();
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for (let i = 0; i < allSheetFolders.length; i++) {
        allSheetFolders[i].setAttribute("id", i);
        let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
        sheetContent.innerText = `Sheet ${i + 1}`;
        allSheetFolders[i].style.backgroundColor = "transparent";
    }

    allSheetFolders[0].style.backgroundColor = "grey";
}

function handleSheetDB(SheetIndex) {
    sheetDB = collectedSheetDB[SheetIndex];
    graphComponentMatrix = collectedGraphComponent[SheetIndex];
}

function handleSheetProperties() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < column; j++) {
            let cell = document.querySelector(`.cell[rowid="${i}"][columnid="${j}"]`);
            cell.click();
        }
    }
    let firstCell = document.querySelector(".cell");
    firstCell.click();

}

function handleSheetUI(sheet) {
    let allSheetFolder = document.querySelectorAll(".sheet-folder");;
    for (let i = 0; i < allSheetFolder.length; i++) {
        allSheetFolder[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = "grey";
}







function createSheetDB() {
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
                fontFamily: "san-serif",
                fontsize: "14",
                fontcolor: "#000000",
                backgColor: "#000000",
                //To apply formula on a specific cell with that same cell value
                //get the value of cell
                value: "",
                formula: "",
                //for parent and children relationship
                //store the childrens
                children: [],
            }

            sheetRow.push(cellprop)
        }

        //each row is added to the sheetDB
        sheetDB.push(sheetRow);
    }
    collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix() {
    let graphComponentMatrix = [];

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < column; j++) {
            row.push([]);
        }
        graphComponentMatrix.push(row);
    }
    collectedGraphComponent.push(graphComponentMatrix);
}