var startTimer = null;
var isGameStarted = false;
function startGame(th){
    _(".gameStartHint").style.visibility ="hidden";
    resetScores();
    th.style.filter = "blur(0px)";
    isGameStarted = true ;
    _("#rocket-animated").style.visibility = "visible";
    if (startTimer == null){
        startTimer = setInterval(timer,1000);
    }
}
var remain  ;
var timerBox = _(".timer > span:first-child");
function timer(){
    timerBox.innerText = --remain ;
    if (remain <= 0){
        clearInterval(startTimer); 
        startTimer = null;
        gameOver();
    }
}
//i don't know exact name . i heard it was hoisting.!
function _(key){
    return document.querySelector(key);
}
const correctWords = _("#correctWords");
const queueWords = _("#inQueueWords") ;

const charCountElement = _(".Cpm > span:first-child");
const wordCountElement = _(".Wpm > span:first-child");
const accuracyElement  = _(".accuracy > span:first-child")
var charcount = 0;
var wrongKey =0 ;
function validateKeys(key){
    let inTxt = queueWords.innerText ;
    if (inTxt[0] == key){
        charCountElement.innerText = ++charcount;
        wordCountElement.innerText = charcount/5 ;
        accuracyElement.innerText = Math.round(100 - (wrongKey/(wrongKey+charcount))*100) ;
        correctWords.innerText += inTxt[0];
        queueWords.innerText = inTxt.substring(1,inTxt.length);
        updateRocketHeight()
    }
    
    else if (key != "Shift" && key!="CapsLock" && key != "Tab" && key != "Control" && key != "Alt" && key !="Meta"){
            wrongKey++ ;
        }
}
function gameOver(){
    if (charcount/5 < 20){
            _("#rocket-animated").style.transform = " rotate(0deg)"
            _("#rocket-animated").src = "blast.gif";
        setTimeout(()=>{
            _("#rocket-animated").src = "buddy-rocket.gif";
        },1000) ;
        setTimeout(()=>{
            _("#rocket-animated").style.visibility = "hidden";
            _("#rocket-animated").style.transform = " rotate(50deg)"
        }
        ,800);
    }
    _(".gameStartHint").style.visibility ="unset";
    _(".keyWords").style.filter = "blur(5px)";
    isGameStarted = false ;
    charCountElement.innerText = charcount ;
    wordCountElement.innerText = charcount/5 ;
    accuracyElement.innerText = Math.round(100 - (wrongKey/(wrongKey+charcount))*100) || 0 ;
}
var height = 0 ;
function updateRocketHeight(){
    _("#rocket-animated").style.bottom = `${height}px` ;
    height += 3.5 ;
}
function resetScores(){
    remain = 60 ;
    charcount = 0 ;
    wrongKey =0 ;
    height = 0 ;
    charCountElement.innerText = 0 ;
    wordCountElement.innerText = 0 ;
    accuracyElement.innerText = 0 ;
    resetText();
}
function resetText(){
    queueWords.innerText = correctWords.innerText + queueWords.innerText;
    correctWords.innerText = "";
}



//key board inputs 
document.addEventListener('keydown',(event)=>{
    var key = event.key ;
    if(isGameStarted){
        validateKeys(key);
    }
})