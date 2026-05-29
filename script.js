import {characters} from "./characters.js";

const loadingScreenImgUrls = ["./src/loadingscreens/loadingScreen1.png","./src/loadingscreens/loadingScreen2.png",
     "./src/loadingscreens/loadingScreen3.png", "./src/loadingscreens/loadingScreen4.png", "./src/loadingscreens/loadingScreen5.png",]




//Overlay that initially covers entire screen 
const curtain = document.getElementById("curtain")

//mainpage
const mainPage = document.querySelector("#mainPage")

//grid container that holds the cards
const characterGrid = document.getElementById("characterGrid")

//work on the chracter change later
// curtain.style.backgroundImage = `url(${loadingScreenImgUrls[2]})`

//for loop to create the required amount of cards depending on how many 
//objects in our array
let rowct = 1
let cardct = 0;
for(let character of characters){
   
  
        

    //dynamically create rows based on cardct so everyhting fits 
    if (character.img != "") {
      cardct += 1;
      if (cardct > 4 && cardct % 4 == 0) {
        rowct += 1;
        characterGrid.style.gridTemplateRows = `repeat(${rowct},1fr)`;
      }
      let card = document.createElement("div");
      let text = document.createElement("h1");
      text.textContent = character.name;
      text.classList.add("cardNameText");
        card.appendChild(text);
      card.classList.add("card");
      let img = document.createElement("img");
      img.src = character.img;
    card.appendChild(img)
      characterGrid.appendChild(card);
    }

   
   
  
   




}






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


