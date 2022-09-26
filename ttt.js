const gameTable = document.querySelectorAll('.game-table');
const homePage = document.querySelector('.homepage-area');
const gameArea = document.querySelector('.game-area');
const scoreBoard = document.querySelector('.score-board-area');
const resetButton = document.querySelector('.reset-button');
const playerOneInput = document.querySelector('.player-one-name-input');
const playerTwoInput = document.querySelector('.player-two-name-input');
const playerOneName = document.querySelector('.player-one-name');
const playerTwoName = document.querySelector('.player-two-name');
const playerOneTimerText = document.querySelector('.player-one-timer-area-text');
const playerTwoTimerText = document.querySelector('.player-two-timer-area-text');
const playerOneScore = document.querySelector('.player-one-score');
const playerTwoScore = document.querySelector('.player-two-score')
const tieScoreText = document.querySelector('.tie-score');
const playerOneInfoName = document.querySelector('.player-one-info-name')
const playerTwoInfoName = document.querySelector('.player-two-info-name')
let oScore = 0;
let xScore = 0;
let tieScore = 0;
let controlWinBoolean = false;
let checkTieBoolean = false;
let playerOne,playerTwo,nextPlayer,timerValue,activePlayer;
function startGame(){
    gameTable.forEach(table=> table.addEventListener('click',()=> chooseTable(table)));
    activePlayer = playerOne;
    nextPlayer = playerTwo;
    tieScoreText.textContent = tieScore;
    playerOneScore.textContent = xScore;
    playerTwoScore.textContent = oScore;
    timerValue = 5;
    setInterval(timer,1000)
}
function chooseTable(table){
    if (table.textContent === "" && controlWinBoolean === false){
        if (activePlayer == playerOne){
            table.textContent= "X";
        }
        else {
            table.textContent = "O";
        }
        winningActions();
        checkTie();
        turnPlayer();
        if (controlWinBoolean === false && checkTieBoolean === true){

            tieScore++;
            tieScoreText.textContent = tieScore;
            alert("game tie") // Will be added Custom Alert Box
        }
        if (controlWinBoolean === true){
            alert(`${nextPlayer} Win.`) // Will be added Custom Alert Box
        }
    }
    else {
        alert("gameover") // Will be added Custom Alert Box
        }
}
function turnPlayer(){
    if (activePlayer == playerOne) {
        activePlayer = playerTwo;
        nextPlayer = playerOne;
        timerValue = 5;
        playerOneTimerText.textContent = "0";
    }
    else {
        playerTwoTimerText.textContent = "0";
        timerValue = 5;
        activePlayer = playerOne;
        nextPlayer = playerTwo;
    }
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
        if (activePlayer == playerOne){
            xScore++;
            playerOneScore.textContent = xScore;
        }
        else {
            oScore++;
            playerTwoScore.textContent = oScore;
        }
        activePlayer = playerOne
        controlWinBoolean = true;
        timerValue = 0;
        playerOneTimerText.textContent = timerValue;
        playerTwoTimerText.textContent = timerValue;
}}
function checkTie(){
    const tieFunctionValues = [];
    gameTable.forEach(table => tieFunctionValues.push(table.textContent))
    if (!tieFunctionValues.includes("")) {
        checkTieBoolean = true;
}}
function timer (){
    if (timerValue > 0 && controlWinBoolean == false){
        if (activePlayer == playerOne){
            playerOneTimerText.textContent = timerValue;
            timerValue--;
        }
        else if (activePlayer == playerTwo){
            playerTwoTimerText.textContent = timerValue;
            timerValue--;
        }
    }
    else if (timerValue == 0){
        if (activePlayer == playerOne){
            playerOneTimerText.textContent = timerValue;
        }
        else if (activePlayer == playerTwo){
            playerTwoTimerText.textContent = timerValue; 
        }
        turnPlayer()
    }
   else (
    clearInterval()
   )
}
document.querySelector('.start-button').onclick = function(){
    if(playerOneInput.value !=="" && playerTwoInput.value !== ""){
    playerOne = playerOneInput.value;
    playerTwo = playerTwoInput.value;
    playerOneName.textContent = playerOne;
    playerTwoName.textContent = playerTwo;
    playerOneInfoName.textContent = playerOne;
    playerTwoInfoName.textContent = playerTwo;
    homePage.style.display = "none";
    gameArea.style.display = "flex";
    scoreBoard.style.display = "flex";
    resetButton.style.display = "block";
    startGame();
    }
    else{
        alert("enter your names")// Will be added Custom Alert Box
    }
}
document.querySelector('.reset-button').onclick = function(){
    gameTable.forEach(function(table){
        table.textContent = "";
        controlWinBoolean = false;
        checkTieBoolean = false;
        activePlayer = playerOne;
        nextPlayer = playerTwo;
        timerValue = 5;
    })
}