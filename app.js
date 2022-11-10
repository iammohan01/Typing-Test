var startTimer = null;
var isGameStarted = false;
function startGame(th){
    th.style.filter = "blur(0px)";
    isGameStarted = true ;
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
var wrongStr = " ";
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
    else{
       
        if (key != "Shift" || key!="CapsLock" || key != "Tab" || key != "Control" || key != "Alt" || key !="Meta"){
            wrongStr += " " + key + " " ;
            console.log(key == "Shift");
            wrongKey++ ;
        }
        
    }
}
function gameOver(){
    
    _(".keyWords").style.filter = "blur(5px)";
    console.log(wrongStr);
    charCountElement.innerText = charcount ;
    wordCountElement.innerText = charcount/5 ;
    accuracyElement.innerText = Math.round(100 - (wrongKey/(wrongKey+charcount))*100) ;

}
var height = 0 ;
function updateRocketHeight(){
    _("#rocket-animated").style.bottom = `${height}px` ;
    _("#rocket-animated").style.visibility = "visible";
    height += 3.5 ;
}



//key board inputs 
document.addEventListener('keydown',(event)=>{
    var key = event.key ;
    if(isGameStarted){
        validateKeys(key);
    }
})