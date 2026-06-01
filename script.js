//IMPORTS
import {characters} from "./characters.js"
import { getCharacter } from "./characters.js";


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

//array of srcs for the images on the loading screen
const imgSrcs = ['./src/loadingscreens/loadingScreen1.jpeg',
  "./src/loadingscreens/loadingScreen2.jpeg",
  "./src/loadingscreens/loadingScreen3.jpeg",
  "./src/loadingscreens/loadingScreen4.jpeg",
  "./src/loadingscreens/loadingScreen5.jpeg"

]

//Counter Variables
let nxt = 1;


//interval to constantly loop through images on the loadign sceen every 6 sec
const loadingScreenLoop2 = setInterval(()=>{
  if(nxt>4)
    nxt = 0;
  loopThroughImgs2(nxt)
  nxt++
},6000)







//fragment used to 3 variations to each card
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

//when the mouse is over a card, variation options should appear and dissapear
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



//When the user clicks, moves the curtain up, unveil the rest of the page, delete the curtain element 
function liftCurtain(){
    // console.log("Lifting curtain")
    curtain.classList.add("slideUpAnimation") //add the class for the animation
    curtain.style.position = "absolute"
    mainPage.style.display = "block"
    setTimeout(()=>{
        curtain.remove();    
    },5001)

    clearInterval(loadingScreenLoop2) //cleart interval so no errros

}

//make the maindisplay div visible or invisible
function displayVariationInfo(event){

  //get the variation name u clicked on
  let variationName = event.currentTarget.children[0].textContent

  //get the corresponding charcater object from the array  
  let charName = event.currentTarget.parentNode.parentElement.id
  let x = getCharacter(charName)

  

   //get me the current variation
  let currentVari = event.currentTarget


  //get me the current card
  let currentCard = event.currentTarget.parentElement.parentElement


  

  //get me an array of the varaitons on the card
   let variations = (currentCard.children)



  //if its a new card remove active from all other variations and cards
  if(!currentCard.classList.contains("active-card")){
    
    let allvariations = document.getElementsByClassName("variationThird")
    for(let x of allvariations) 
      x.classList.remove("active-variation")

    let allCards = document.getElementsByClassName("card")
     for(let x of allCards){
      x.classList.remove("active-card")
      x.addEventListener("mouseout",variationsDisappear)

     }
     currentCard.removeEventListener("mouseout",variationsDisappear)

      //populate the main display and open it 
      mainDisplay.children[0].textContent = x.bio
      mainDisplay.children[1].textContent = variationName
      mainDisplay.children[2].textContent = x.variations.find((element)=>element.variationName==variationName).variationDescription
      mainDisplay.style.backgroundImage = `url(${x.wallpaper})` 
      mainDisplay.style.display = "block"
      

      
      //add active classes
      currentCard.classList.add("active-card")
      currentVari.classList.add("active-variation")
      //scroll them to the main display
      window.scrollTo({
        top: 300});
      return
  }


  //same card
  else{

    //different variation, just change the text content
    if(!currentVari.classList.contains("active-variation")){
      mainDisplay.children[0].textContent = x.bio
      mainDisplay.children[1].textContent = variationName
      mainDisplay.children[2].textContent = x.variations.find((element)=>element.variationName==variationName).variationDescription

      //remove active from other varations 
    let allvariations = document.getElementsByClassName("variationThird")
    for(let x of allvariations) 
      x.classList.remove("active-variation")

    //add active to current variation 
    currentVari.classList.add("active-variation")
    window.scrollTo({top: 300 });
    return
    }

    //same card same variation, just close the main display remove active from vard and variaotn 
    else{
      mainDisplay.style.display = "none";
      currentVari.classList.remove("active-variation")
      currentCard.classList.remove("active-card")
      currentCard.addEventListener("mouseout",variationsDisappear)
      return
    }
      

  }

}

//function for the loading page, loops through 5 images 
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

        //switch the img srcs to give impression they replaced each other
        fadeOutImg.src = fadeInImg.src   
        fadeInImg.src = imgSrcs[nxt]  //give the image in the back the next src in the array 

        

        //return back to normal so u can fade again
        fadeOutImg.classList.remove("fadeOutAnimation")
        fadeInImg.classList.remove("fadeInAnimation")
    },5000)
    
}




  curtain.addEventListener("click", liftCurtain);
  for (let character of characters) {
    //dynamically create rows based on cardcount so everyhting fits
    if (character.img != "") {
      let card = document.createElement("div"); //create the card
      card.classList.add("card");
      card.id = character.name;

      let text = document.createElement("h1"); // some text
      text.textContent = character.name;
      text.classList.add("cardNameText");

      let img = document.createElement("img"); //the img
      img.src = character.img;
      img.classList.add("cardImg");

      let variationsDiv; //the variatiosn div

      card.appendChild(img);
      card.appendChild(text);
      //apend variation dive last

      //create a fragment
      let frag = document.createDocumentFragment();

      //use that frag to appened variations div
      createVariations(frag);
      card.appendChild(frag);

      let vari = Array.from(card.getElementsByClassName("variationThird"));
      for (let v in vari) {
        let text = document.createElement("p");
        text.textContent = character.variations[v].variationName;
        text.classList.add("variationText");
        vari[v].appendChild(text);
      }

      //add the event listeners
      card.addEventListener("mouseover", variationsAppear);
      card.addEventListener("mouseout", variationsDisappear);

      characterGrid.appendChild(card);
    }
  }












//for loop to create the required amount of cards depending on how many object with imgs in our characters array 








   

   
 
  


  
  

 

  
 

 

  



  






