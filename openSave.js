let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");

//dowload the excel file in json format
downloadBtn.addEventListener("click", (Event) => {
    let jsonData = JSON.stringify([sheetDB, graphComponentMatrix]);
    let file = new Blob([jsonData], { type: "application/json" });

    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "sheet.json";
    a.click();
})

//Upload .json file for edit in excel application

openBtn.addEventListener("click", (Event) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (Event) => {
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];
        fr.readAsText(fileObj);
        fr.addEventListener("load", (Event) => {
            let readSheetData = JSON.parse(fr.result);

            //basic sheet with default data will be be created
            
            addSheetbtn.click();

            //sheetDB,graphComponent
            sheetDB=readSheetData[0];
            graphComponentMatrix=readSheetData[1];
            collectedSheetDB[collectedSheetDB.length-1]=sheetDB;
            collectedGraphComponent[graphComponentMatrix.length-1]=graphComponentMatrix;
            handleSheetProperties();
        })
    })
})
