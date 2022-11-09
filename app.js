var startTimer = null;
// var isTimerStarted ;
function startGame(th){
    th.style.filter = "blur(0px)";
    if (startTimer == null){
        startTimer = setInterval(timer,1000);
    }
}

var remain = 61 ;
var timerBox = _(".timer > span:first-child");
function timer(){
    timerBox.innerText = --remain ;
    if (remain <= 0){
        clearInterval(startTimer); 
        startTimer = null;
    }
}
//i don't know exact name . i heard it was hoisting.!
function _(key){
    return document.querySelector(key);
}