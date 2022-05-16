let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");
let saveInDB = document.getElementById("save_btn");
let saveAs = document.querySelector(".save-as");
let SaveAsFileName=document.querySelector(".saveas-name")
let fileName=document.getElementById("finame");
let id = document.querySelector(".FileId");

let gridContainer=document.querySelector(".grid-cont");



// dowload the excel file in json format
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
//TO enable save and save-as feature
//if there is no opened then return 
        if(fileName.innerText=="")
        {
            alert("To enable Save feature please create a new File \n Then add Insert the file")
            return;
        }
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
                sheetDB = readSheetData[0];
                graphComponentMatrix = readSheetData[1];
                collectedSheetDB[collectedSheetDB.length - 1] = sheetDB;
                collectedGraphComponent[graphComponentMatrix.length - 1] = graphComponentMatrix;
                handleSheetProperties();
            })
        })
})




//save feature 
saveInDB.addEventListener('click', (Event) => {
    if (id.innerText == "") {
        console.log("Empty File")
        return
    }
    let jsonData = JSON.stringify([sheetDB, graphComponentMatrix])
    $.ajax({
        type: 'POST',
        url: '/save/' + id.innerText + '/',
        data: {
            send: jsonData
        },
        success: function (res) {
            // console.log(response);
            const data = res.data;
            console.log(data);
        },
        error: function (err) {
            console.log(err);
        }
    })

})
//save as Feature//
let sub = document.querySelector(".sub");

sub.addEventListener('click', (Event) => {
    if (id.innerText == "") {
        console.log("Empty File")
        return
    }
    // console.log(SaveAsFileName.value);
    let jsonData = JSON.stringify([sheetDB, graphComponentMatrix])
    $.ajax({
        type: 'POST',
        url: '/' + id.innerText + '/'+SaveAsFileName.value+'/',
        data: {
            send: jsonData
        },
        success: function (res) {
            fileName.innerText=SaveAsFileName.value;
            const data = res.data;
            console.log(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
    
})
