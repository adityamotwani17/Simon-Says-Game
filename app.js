/* Working of the game: 
1. Game starts when any "KEY IS PRESSED"
After game starts: LEVEL = 1
2. A button flashes. -> Let us store this in GameSeq[]
3. User now follows the gameSeq. Let store user seq in User[] (We will need event listeners)
4. Check if GameSeq[] == user[] -> then NEXT LEVEL else GAMEOVER 
*/

let level = 0;
let gameSeq = [];
let userSeq = [];
let colorSeq = ["red", "green", "blue", "yellow"];
let highScore = [];
let max = 0;

let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");

let started = false; // Checks whether game started or not, if key is pressed then value returned is true.

document.addEventListener("keypress", function (){
    if(started == false){
        console.log("Game Started");
        started = true;
        levelUp();
    }
    
});

function levelUp () {
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*3);
    let btn = document.querySelector(`.${colorSeq[randIdx]}`);
    gameSeq.push(btn.getAttribute("id"));
    console.log(gameSeq);
    buttonFlash(btn);
    userSeq = [];
}


function buttonFlash (btn){
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("user-flash");
    setTimeout(function () {
        btn.classList.remove("user-flash");
    }, 100);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", buttonPress);
}   

function buttonPress() {
    userFlash(this);
    userSeq.push(this.id);
    console.log(userSeq);
    checkAns(userSeq.length - 1);
}
function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp(), 1000);
        }
    }else{
        highScore.push(level);
        max = Math.max(...highScore);
        reset();
    }
    
}


function reset(){
    h2.innerHTML = `Game Over ! Your Score was <bold> ${level}</bold> <br> Press any key to restart !`;
    h1.innerHTML = `Simon Says Game ! &emsp; High Score: ${max} `;

    level = 0;
    started = false;
    userSeq = [];
    gameSeq = [];
    let body = document.querySelector("body");
    body.classList.add("red");
    setTimeout(function () {
        body.classList.remove("red");
    }, 100);
}


