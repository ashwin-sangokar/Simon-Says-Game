let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let btns = ["red", "green", "yellow", "purple"];

let h2 = document.querySelector('h2');

document.addEventListener("keypress", function() {
    console.log("game started");
    if (started === false) {
        started = true;
    }
    LevelUp();
});

function LevelUp() {
    userSeq = [];
    level ++;
    h2.innerText = `Level ${level}`;
    let rndIdx = Math.floor(Math.random()*3);
    let rndColor = btns[rndIdx];
    let rndBtn = document.querySelector(`.${rndColor}`);
    gameSeq.push(rndColor);
    gameFlash(rndBtn);
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout( function() {
        btn.classList.remove("flash");
    }, 250);
}

function UserFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout( function() {
        btn.classList.remove("userFlash");
    }, 250);
}

let idx = level-1;
function CheckAns(idx) {
    
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(LevelUp,1000);
        }
    }else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector('body').style.backgroundColor="red";
        setTimeout(function() {
            document.querySelector('body').style.backgroundColor="white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    UserFlash(btn);  
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    CheckAns(userSeq.length - 1);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}