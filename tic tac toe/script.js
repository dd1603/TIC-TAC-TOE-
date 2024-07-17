let box= document.querySelectorAll(".box"); //select all buttons to play 
let playerX=true; //set initial player=true
let arr=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]; //winning matches
let msg=document.querySelector("#msg"); //msg showing
let game=document.querySelector(".new"); //new game
let select= new Audio("select.mp3");
let gameWinner= new Audio("win.mp3");
let newGame= new Audio("newgame.mp3");
let wrong= new Audio("wrong.mp3");


function reset(){
    playerX=true; //set initial player=true

    for (let i = 0; i < box.length; i++) {
        box[i].disabled = false; //enable buttons again
        box[i].innerText="";   //empty the boxes
        box[i].classList.remove("winning-box"); //remove highlight
      }
      msg.classList.add("hide"); //initially hide winning msg again
      newGame.play();

            
}


box.forEach((box)=>{ 
    box.addEventListener("click",()=>{
        if (playerX) {  //if x player plays
            box.innerText="X"; //write X in box
            playerX=false; //for putting O in next box
            box.disabled=true; //for not overwriting X
            
        }
        else{ //same for O
            box.innerText="O";
            playerX=true; //now X's turn again
            box.disabled=true;
            
        }

        win();  //call winning condition
        select.play();
    });
});

function showWin(winner){ //pass the parameter, here winner= player at pos1
    msg.innerText=`${winner} is the winner!`; //show this msg as innertext
    msg.classList.remove("hide"); //when a player wins, show the msg removing hide class
    gameWinner.play();


}
function highlight(winningBoxes) {
    for (let i = 0; i < winningBoxes.length; i++) {
        box[winningBoxes[i]].classList.add("winning-box"); // Add highlight class to winning boxes
    }
}
function win(){
    for(let winner of arr) //loop through all winning conditions
        {
        let pos1= box[winner[0]].innerText; //access innertext (X or O) of each box at 0,1,2 index & store their value at pos variables
        let pos2= box[winner[1]].innerText;
        let pos3= box[winner[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") //the positions should not be empty
            {
            if (pos1===pos2 && pos2===pos3) //to win, three positions should have the same value
                {
                showWin(pos1); //call showWin function with pos1 as argument
                highlight(winner);

                for (let i = 0; i < box.length; i++) //loop through all boxes to disable them
                    { 
                    box[i].disabled = true;
                  }

            }
        }
       

    }
    
}

game.addEventListener("click", reset); //when new game is clicked, game is reset





