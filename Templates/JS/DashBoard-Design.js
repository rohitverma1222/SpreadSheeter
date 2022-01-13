let deleteFile=document.querySelectorAll(".delete");
let itemPrimaryKey=document.querySelectorAll(".primary-Key");
let listItem=document.querySelectorAll(".list-item")
let line=document.querySelectorAll("hr");
let downloadUserFile=document.querySelectorAll(".download");


for(let i=0;i<deleteFile.length;i++)
{
	deleteFile[i].addEventListener('click',(event)=>{
	mythis=this;
    $.ajax({
        type:'GET',
        url:'/deletefile/'+itemPrimaryKey[i].innerText+'/',
        success:function(res)
        {
        	listItem[i].style.display="none";
        	line[i].style.display="none";
        },
        error:function(res)
        {
        	console.log(res)
        }
    })
})
}

for(let i=0;i<downloadUserFile.length;i++)
{
    downloadUserFile[i].addEventListener("click",()=>{
    $.ajax({
        type:'GET',
        url:'/download/'+itemPrimaryKey[i].innerText+'/',
        success:function(res)
        {
            let jsonData = JSON.stringify([res]);
            let file = new Blob([res.data], { type: "application/json" });

            let a = document.createElement("a");
            a.href = URL.createObjectURL(file);
            a.download = "sheet.json";
            a.click();
        },
        error:function(res)
        {
            console.log("not work")
        }
    })
})
}



//hover 
let SearchItemList = document.querySelector(".searched-item");
    SearchItemList.style.display="none";
    let InputClick = document.querySelector(".input");
    // InputClick.addEventListener("keypress", () => {
    //     SearchItemList.style.display = "";
    //     // console.log("working")
    // })
    window.addEventListener('click', function (e) {

        if (!InputClick.contains(e.target)) {
            SearchItemList.style.display = "none";
        } 
    })

//ajax Request:
InputClick.addEventListener("keypress",(e)=>{
    if(e.keyCode==13)
    {
                InputValueSave=InputClick.innerText;
        $.ajax({
            type:'GET',
            url:'/search/'+InputClick.innerText+'/',
            success:function(res){
                SearchItemList.style.display = "";
                SearchItemList.innerHTML=``;
                InputClick.innerText=InputValueSave;

                if(res.data.length==0)
                {
                    SearchItemList.innerHTML+=`<div class="item-from-db"  >
                    <p style="font-style:italic; text-align:center;">NO RESULT fOUND</p>
                    </div>`
                }
                for(let i=0;i<res.data.length;i++)
                {
                    
                    SearchItemList.innerHTML+=`<div class="item-from-db" onclick="window.location='/${res.ids[i]}/'">
                    <p>${res.data[i]}</p>
                    <p class="primary-Key" style="display:none">${res.ids[i]}</p>
                    </div>`
                }

            },
            error:function(){
                console.log("not work")
            }
        })
    }
})