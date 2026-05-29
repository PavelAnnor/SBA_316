const grid = document.getElementById("grid-container");
grid.style.display = "flex";
grid.style.flexWrap = "wrap";
grid.style.maxWidth = "600px"
grid.style.width = "100%"
grid.style.marginTop = "20px"
grid.style.border = "1px solid red"





const frag = document.createDocumentFragment();

for(let i = 1; i<=100;i++){

    let div = document.createElement('div');
    div.classList.add("box");
    div.textContent = i;





    frag.appendChild(div);

}

grid.appendChild(frag)



//returns HTML collection
let boxes = document.getElementsByClassName("box");

//converts into array so we can use regular array methods
Array.from(boxes).forEach((element,index) => {







    console.log(element)
    element.style.backgroundColor = "rgb(154, 218, 255)"
    element.style.outline = "1px solid black"
    element.style.flex = "10%"
    element.style.display = "flex"
    element.style.justifyContent = "center"
    element.style.alignItems = "center"
    element.style.height = "50px"

    if(checkPrime(index)){
        element.style.fontWeight = "100"
        element.style.backgroundColor = "green"
   }



});







//normal way to do it
// for(let i = 1; i<=100;i++){

//     let div = document.createElement('div');
//     div.classList.add("box");
//     div.textContent = i;
//     grid.append(div);

// }



//using a fragment instead



// for(let i = 1; i<=100;i++){

//     let div = document.createElement('div');
//     div.classList.add("box");
//     div.textContent = i;

//     //even numbered boxes
//     if(i%2==0){
//         div.style.backgroundColor = "red"
//     }
//     else{
//         div.style.backgroundColor = "blue"

//     }



//     frag.appendChild(div);

// }





function checkPrime(n){

    if(n<=1)
        return false

    for(let i =2; i<n;i++){
        if(n%i===0)
            return false;



    }
    return true;



}