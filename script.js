import {characters} from "./characters.js";

//IMPORTANT COUNTER VARIABLES
//used to create grid dynamically
let rowct = 1
let cardct = 0;

//used for fade in animation
let curtainImageId =0;


//MAJOR SECTIONS

//Overlay that initially covers entire screen 
const curtain = document.getElementById("curtain")
//mainpage
const mainPage = document.querySelector("#mainPage")
//grid container that holds the cards
const characterGrid = document.getElementById("characterGrid")


//Nodelists, arrays, HTML collections 

//all the images in the curtain
const curtainImgs = curtain.getElementsByTagName("img");

let nxt = 1;

const loadingScreenLoop2 = setInterval(()=>{

  
  if(nxt>4)
    nxt = 0;
  
  
  loopThroughImgs2(nxt)
  nxt++
},6000)




const imgSrcs = ['./src/loadingscreens/loadingScreen1.jpeg',
  "./src/loadingscreens/loadingScreen2.jpeg",
  "./src/loadingscreens/loadingScreen3.jpeg",
  "./src/loadingscreens/loadingScreen4.jpeg",
  "./src/loadingscreens/loadingScreen5.jpeg"

]

function loopThroughImgs() {
    console.log("starting")

    //img u want to fade in
    let fadeInImg = document.getElementById("fadeIn");
    
    //img u want to fadeout
    let fadeOutImg = document.getElementById("fadeOut");

    //fade in the image
    fadeInImg.classList.toggle("fadeInAnimation");
    fadeOutImg.classList.toggle("fadeOutAnimation")
    
    //wait till animation is done
    setTimeout(()=>{

      //save the src of the fadeout img
      let x = fadeOutImg.src
        fadeOutImg.src = fadeInImg.src //switch the img srcs
        fadeInImg.src = x

        //return back to normal so u can fade again
        fadeOutImg.classList.remove("fadeOutAnimation")
        fadeInImg.classList.remove("fadeInAnimation")
    },3000)
    
}

function loopThroughImgs2(nxt) {
    console.log("starting")

    //img u want to fade in
    let fadeInImg = document.getElementById("fadeIn");
    
    //img u want to fadeout
    let fadeOutImg = document.getElementById("fadeOut");

    //fade in the image
    fadeInImg.classList.toggle("fadeInAnimation");
    fadeOutImg.classList.toggle("fadeOutAnimation")
    
    //wait till animation is done
    setTimeout(()=>{

      //save the src of the fadeout img
        fadeOutImg.src = fadeInImg.src //switch the img srcs
        fadeInImg.src = imgSrcs[nxt]
        console.log(imgSrcs[nxt])
        

        //return back to normal so u can fade again
        fadeOutImg.classList.remove("fadeOutAnimation")
        fadeInImg.classList.remove("fadeInAnimation")
    },3000)
    
}



//for loop to create the required amount of cards depending on how many object with imgs in our characters array 
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
        curtain.remove();
        console.log("Done");
        
    },5001)

    clearInterval(loadingScreenLoop2)

}


