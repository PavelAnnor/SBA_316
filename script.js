import {characters} from "./characters.js"
import { getCharacter } from "./characters.js";

//IMPORTANT COUNTER VARIABLES


//used for fade in animation
let curtainImageId =0;


//MAJOR SECTIONS

//Overlay that initially covers entire screen 
const curtain = document.getElementById("curtain")
//mainpage
const mainPage = document.querySelector("#mainPage")
//grid container that holds the cards
const characterGrid = document.getElementById("characterGrid")
//div that will show character info
const mainDisplay = document.getElementById("mainDisplay")


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




// const imgSrcs = ['./src/loadingscreens/loadingScreen1.jpeg',
//   "./src/loadingscreens/loadingScreen2.jpeg",
//   "./src/loadingscreens/loadingScreen3.jpeg",
//   "./src/loadingscreens/loadingScreen4.jpeg",
//   "./src/loadingscreens/loadingScreen5.jpeg"

// ]

const imgSrcs = ['./src/loadingscreens/loadingScreen1.jpeg',
  "./src/loadingscreens/loadingScreen2.jpeg",
  "./src/loadingscreens/loadingScreen3.jpeg",
  "./src/loadingscreens/loadingScreen4.jpeg",
  "./src/loadingscreens/loadingScreen5.jpeg"

]

function loopThroughImgs2(nxt) {
    // console.log("starting")

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
    },5000)
    
}

//for loop to create the required amount of cards depending on how many object with imgs in our characters array 
for(let character of characters){
   
  
      
    //dynamically create rows based on cardcount so everyhting fits 
    if (character.img != "") {
     

    
      let card = document.createElement("div");//create the card
      card.classList.add("card");
      card.id = character.name

      let text = document.createElement("h1");// some text
      text.textContent = character.name;
      text.classList.add("cardNameText");

      let img = document.createElement("img"); //the img
      img.src = character.img;
      img.classList.add("cardImg")
     
      let variationsDiv ;//the variatiosn div
      
      card.appendChild(img)
      card.appendChild(text);
      //apend variation dive last 
     
      //create a fragment 
      let frag = document.createDocumentFragment();

      //use that frag to appened variations div
      createVariations(frag)
      card.appendChild(frag)

      let vari  =Array.from(card.getElementsByClassName("variationThird"))
      console.log(vari)
      for(let v in vari){
        let text = document.createElement("p")
        console.log(v)
        text.textContent = character.variations[v].variationName
        text.classList.add("variationText")
        vari[v].appendChild(text)

      }

      
      

      //add the event listeners 
      card.addEventListener("mouseover", variationsAppear);
      card.addEventListener("mouseout",variationsDisappear)
      

      characterGrid.appendChild(card);
      
    }

    

   
   

}



function createVariations(frag){

  //create large container
  let container = document.createElement("div");
  container.classList.add("variationDivContainer")

  //create 3 subsections and append to large container
  for(let i =0; i<3; i++){
    let x = document.createElement('div')
    x.classList.add("variationThird")
    x.addEventListener("click",displayVariationInfo)
    container.appendChild(x)
  }

  //append the container to the frag
  frag.appendChild(container)


}


function variationsAppear(event){


  const card = event.currentTarget; //make sure the target is always the card itself so i can access its children
  card.children[2].style.display = "flex"; //make the fragment appened varitions div appear
  card.children[1].style.display = "none" //make the text dissapear
}

function variationsDisappear(event){
  const card = event.currentTarget; //make sure the target is always the card itself so i can access its children
  card.children[2].style.display = "none" //make the fragment appened varitions div disappear
  card.children[1].style.display = "block" //make the text reappear
}




curtain.addEventListener("click",liftCurtain)

//When the user clicks, moves the curtain up, unveil the rest of the page, delete the curtain element 
function liftCurtain(){
    // console.log("Lifting curtain")
    curtain.classList.add("slideUpAnimation") //add the class for the animation
    curtain.style.position = "absolute"
    mainPage.style.display = "block"
    setTimeout(()=>{
        curtain.remove();
        console.log("Done");
        
    },5001)

    clearInterval(loadingScreenLoop2)

}


function displayVariationInfo(event){

  //make the div visible 

  //get the variation name u clicked on
  let variationName = event.currentTarget.children[0].textContent
  console.log(variationName)

  //get the corresponding charcater object from the array 
  let charName = event.currentTarget.parentElement.parentElement.id
  let x = getCharacter(charName)
 

 

  //set the text conent and required backgroudn image
  mainDisplay.children[0].textContent = x.bio
  mainDisplay.children[1].textContent = `Variation: ${variationName}`
  mainDisplay.children[2].textContent=  x.variations.find((element)=>element.variationName==variationName).variationDescription
  mainDisplay.style.backgroundImage = `url(${x.wallpaper})`
 

  
  
  if(mainDisplay.style.display === "" ||mainDisplay.style.display=="none" ){
    mainDisplay.style.display = "block"
  }

   
  
  else{
    mainDisplay.style.display= "none"
  } 
    



  



}


