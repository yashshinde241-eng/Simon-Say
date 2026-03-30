let gameSeq = [];
let userSep = [];

let btns = ["blue", "yellow", "orange", "red"];
let h2 = document.querySelector("h2");

let start = false;
let level = 0;
let flag;
let h3 = document.querySelector("h3");

//When pressed Enter starts the Game with level 1
document.addEventListener("keypress", (event) => {
    if(event.code == 'Enter' && start == false) {
        start = true;
        console.log('game started')
        setTimeout(levelUp, 500)
        flag = true;
    }

})

// Give flash effect to buttons
function gameflash(btn) {
    btn.classList.add("gameflash");
    setTimeout( () => {
        btn.classList.remove("gameflash")
    }, 350)
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout( () => {
        btn.classList.remove("userflash")
    }, 350)
}
let highScore = 0;
function levelUp () {
    userSep = [];
    level++;
    if(level > highScore){
        highScore++;
    }
    h3.innerText = `Level ${level}`

    //Random color picker
    let randomIndex = Math.floor(Math.random()* 4);
    let randomColor = btns[randomIndex];
    let randomBtn = document.querySelector(`.${randomColor}`)
    // console.log(randomBtn)
    // console.log(randomIndex)
    // console.log(randomColor)
    gameSeq.push(randomColor);
    console.log(gameSeq)
    gameflash(randomBtn);
    h2.innerText = `High Score : ${highScore}`
}


let box = document.querySelector(".box-container")
function check(idx) {
    if(userSep[idx] == gameSeq[idx]) {
        if(userSep.length == gameSeq.length){
            setTimeout(levelUp, 1000)
        }
    }
    else {
        h3.innerHTML = ` <span style="color: red;">Game Over</span><br>  Score: ${level} <br> Press Enter to start`;
        reset();
        box.classList.add("shake-error");
        setTimeout(() => {
            box.classList.remove("shake-error");
        }, 500)
    }
}

function btnPress() {
    if(!flag){
        return;
    } 
    let btn = this
    console.log(btn);
    userflash(btn);
    let userColor = btn.getAttribute("id");
    userSep.push(userColor)

    check(userSep.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(let btn of allBtns) {   
    btn.addEventListener("click", btnPress);
}

function reset() {
    start = false;
    level = 0;
    gameSeq = [];
    userSep = [];
}