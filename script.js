import {characters} from "./characters.js";

const loadingScreenImgUrls = ["./src/loadingscreens/loadingScreen1.png","./src/loadingscreens/loadingScreen2.png",
     "./src/loadingscreens/loadingScreen3.png", "./src/loadingscreens/loadingScreen4.png", "./src/loadingscreens/loadingScreen5.png",]





console.log("hello")

//Overlay that initially covers entire screen 
const curtain = document.getElementById("curtain")
const mainPage = document.querySelector("#mainPage")

//work on the chracter change later
// curtain.style.backgroundImage = `url(${loadingScreenImgUrls[2]})`








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


