function startGame(th){
    th.style.filter = "blur(0px)"
    var startTimer = setInterval(timer,1000)
}

var remain = 60 ;
var timerBox = _(".timer > span:first-child")
function timer(){
    timerBox.innerText = remain-- ;
    if (remain <= 0){
        clearInterval(myInterval);
        gameOver();   
    }
}
//i don't know exact name . i heard it was hoisting.!
function _(key){
    return document.querySelector(key);
}