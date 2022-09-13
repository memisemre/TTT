const gameTable = document.querySelectorAll('.table');
const currentPlayerValue = document.querySelector('.current-player-value');
const totalGameArea = document.querySelector('.total-game-value');
const xScoreUpdate = document.querySelector('.x-score');
const oScoreUpdate = document.querySelector('.o-score');
const tieScoreUpdate = document.querySelector('.tie-score')
let timerTextX = document.querySelector('.timer-area-x-text')
let timerTextO = document.querySelector('.timer-area-o-text')
let timerValue = 5;
let totalGame = 0;
let xScore = 0;
let oScore = 0;
let tieScore = 0;
let controlWin = false;
let controlTie = false;
let currentPlayer = "X";
gameTable.forEach(table => table.addEventListener('click',() => chooseTable(table)))
function chooseTable(table){  
    if (table.textContent ===""){
        table.textContent= currentPlayer
        turnPlayer();
        winningActions();  
        checkTie();
        if (controlWin == false && controlTie == true){
            totalGame++;
            totalGameArea.textContent = totalGame;
            tieScore++;
            tieScoreUpdate.textContent = tieScore;
            alert("berabere")
        }
    }
    else {
        alert("Burası Dolu Hocam.")
    }
};
function turnPlayer(){
    if (currentPlayer==="X"){
        currentPlayer="O"
    }
    else {
        currentPlayer="X"
    }
    currentPlayerValue.textContent = currentPlayer
}
function winningActions (){
    const winCombinationsRowOne = gameTable[0].textContent === gameTable[1].textContent && gameTable[0].textContent === gameTable[2].textContent && gameTable[0].textContent !="";
    const winCombinationsRowTwo = gameTable[3].textContent === gameTable[4].textContent && gameTable[3].textContent === gameTable[5].textContent && gameTable[3].textContent !="";
    const winCombinationsRowThree = gameTable[6].textContent === gameTable[7].textContent && gameTable[6].textContent === gameTable[8].textContent && gameTable[6].textContent !="";
    const winCombinationsColumnOne = gameTable[0].textContent === gameTable[3].textContent && gameTable[0].textContent === gameTable[6].textContent && gameTable[0].textContent !="";
    const winCombinationsColumnTwo = gameTable[1].textContent === gameTable[4].textContent && gameTable[1].textContent === gameTable[7].textContent && gameTable[1].textContent !="";
    const winCombinationsColumnThree = gameTable[2].textContent === gameTable[5].textContent && gameTable[2].textContent === gameTable[8].textContent && gameTable[2].textContent !="";
    const winCombinationsCrossOne = gameTable[0].textContent === gameTable[4].textContent && gameTable[0].textContent === gameTable[8].textContent && gameTable[0].textContent !="";
    const winCombinationsCrossTwo = gameTable[2].textContent === gameTable[4].textContent && gameTable[2].textContent === gameTable[6].textContent && gameTable[2].textContent !="";
    if (winCombinationsRowOne || winCombinationsRowTwo || winCombinationsRowThree || winCombinationsColumnOne || winCombinationsColumnTwo || winCombinationsColumnThree || winCombinationsCrossOne || winCombinationsCrossTwo){
        alert("oyun bitti")
        totalGame++;
        totalGameArea.textContent = totalGame ;
        controlWin = true;
        if(currentPlayer ==="O"){
            xScore++;
            xScoreUpdate.textContent=xScore;
        }
        else if (currentPlayer==="X"){
            oScore++;
            oScoreUpdate.textContent=oScore;
        }
        currentPlayer = "X"
        currentPlayerValue.textContent = currentPlayer;
    }
}
function checkTie (){
    const values = [];
    gameTable.forEach(table => values.push(table.textContent))
    if (!values.includes("")) {
        controlTie = true;
    }
}
document.querySelector('.reset-button').onclick = function(){
    gameTable.forEach(function(table){
        table.textContent = ""
    })
    currentPlayer = "X"
    currentPlayerValue.textContent = currentPlayer;
    controlWin = false;
    controlTie = false;
}
setInterval (timer,1000);
function timer (){
    if (timerValue > 0){
        timerValue--;
        console.log(timerValue)
        timerTextX.textContent = timerValue
    }
    else {
        turnPlayer()
        clearInterval()
        timerValue = 5;
    }
}