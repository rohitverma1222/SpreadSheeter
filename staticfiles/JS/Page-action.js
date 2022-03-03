
let homebtn=document.querySelector(".home");
let filebtn=document.querySelector(".file");
let layoutbtn=document.querySelector(".layout");
let insertbtn=document.querySelector(".insert");
let helpbtn=document.querySelector(".help");


homebtn.addEventListener("click",(event)=>{
    homebtn.classList.add("selected-default")
    filebtn.classList.remove("selected-default")
    layoutbtn.classList.remove("selected-default")
    helpbtn.classList.remove("selected-default")
    insertbtn.classList.remove("selected-default")

})
filebtn.addEventListener("click",(event)=>{
    filebtn.classList.add("selected-default")
    homebtn.classList.remove("selected-default")
    layoutbtn.classList.remove("selected-default")
    helpbtn.classList.remove("selected-default")
    insertbtn.classList.remove("selected-default")

})
insertbtn.addEventListener("click",(event)=>{
    insertbtn.classList.add("selected-default")
    filebtn.classList.remove("selected-default")
    layoutbtn.classList.remove("selected-default")
    helpbtn.classList.remove("selected-default")
    homebtn.classList.remove("selected-default")

})
layoutbtn.addEventListener("click",(event)=>{
    layoutbtn.classList.add("selected-default")
    filebtn.classList.remove("selected-default")
    insertbtn.classList.remove("selected-default")
    helpbtn.classList.remove("selected-default")
    homebtn.classList.remove("selected-default")
})
helpbtn.addEventListener("click",(event)=>{
    helpbtn.classList.add("selected-default")
    filebtn.classList.remove("selected-default")
    layoutbtn.classList.remove("selected-default")
    insertbtn.classList.remove("selected-default")
    homebtn.classList.remove("selected-default")
})