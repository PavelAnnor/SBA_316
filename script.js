import {characters} from "./characters.js";


console.log("hello")

//Overlay that initially covers entire screen 
const curtain = document.getElementById("curtain")
const mainPage = document.querySelector("#mainPage")








curtain.addEventListener("click",liftCurtain)

//When the user clicks, moves the curtain up, unveil the rest of the page, delete the curtain element 
function liftCurtain(){
    console.log("Lifting curtain")
    curtain.classList.add("slideUpAnimation") //add the class for the animation
    mainPage.style.display = "block"
    setTimeout(()=>{
        curtain.remove;
        console.log("Done");
    },4000)

}


