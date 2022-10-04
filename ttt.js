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
const customBox = document.querySelector('.alert-box-container')
const customBoxTitle = document.querySelector('.alert-title h1')
const customBoxText = document.querySelector('.alert-text h3')
let oScore = 0;
let xScore = 0;
let tieScore = 0;
let controlWinBoolean = false;
let checkTieBoolean = false;
let stopGameBoolean = false;
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
    document.querySelector('.player-one-info-name').style.color = "white"
    document.querySelector('.player-one-timer-area').style.border = "5px solid white"
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
        resetGame();
        if (controlWinBoolean === false && checkTieBoolean === true){
            tieScore++;
            tieScoreText.textContent = tieScore;
            gameArea.style.display = "none";
            customBox.style.display = "flex";
            document.querySelector('.confirm-button').onclick = function(){
                gameArea.style.display = "flex";
                customBox.style.display = "none"
            }
        }
        if (controlWinBoolean === true){
            gameArea.style.display = "none";
            customBox.style.display = "flex";
            customBoxTitle.textContent = "Game Over!"
            customBoxText.textContent = `Player, "${nextPlayer}" Won.`
            document.querySelector('.confirm-button').onclick = function(){
                gameArea.style.display = "flex";
                customBox.style.display = "none"
            }
        }
    }
    else {
        stopGameBoolean = true;
        gameArea.style.display = "none";
        customBox.style.display = "flex";
        customBoxTitle.textContent = "It's Full!"
        customBoxText.textContent = "The place you chose is full. Please, select an empty field."
        document.querySelector('.confirm-button button').style.marginTop = "55px"
        document.querySelector('.confirm-button').onclick = function(){
            gameArea.style.display = "flex";
            customBox.style.display = "none"
            stopGameBoolean = false;
        }
    }
}
function turnPlayer(){
    if (activePlayer == playerOne) {
        activePlayer = playerTwo;
        nextPlayer = playerOne;
        timerValue = 5;
        playerOneTimerText.textContent = "0";
        document.querySelector('.player-one-info-name').style.color = "#9e9e9e";
        document.querySelector('.player-one-timer-area').style.border = "5px solid #757575";
        document.querySelector('.player-two-info-name').style.color = "white";
        document.querySelector('.player-two-timer-area').style.border = "5px solid white";
    }
    else {
        document.querySelector('.player-one-info-name').style.color = "white";
        document.querySelector('.player-one-timer-area').style.border = "5px solid white";
        document.querySelector('.player-two-info-name').style.color = "#9e9e9e";
        document.querySelector('.player-two-timer-area').style.border = "5px solid #757575"
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
        activePlayer = playerOne;
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
    if (timerValue > 0 && controlWinBoolean == false && checkTieBoolean == false && stopGameBoolean == false){
        if (activePlayer == playerOne){
            playerOneTimerText.textContent = timerValue;
            timerValue--;
        }
        else if (activePlayer == playerTwo){
            playerTwoTimerText.textContent = timerValue;
            timerValue--;
        }
    }
    else if (checkTieBoolean == true){
        timerValue = 0;
        playerOneTimerText.textContent = timerValue;
        playerTwoTimerText.textContent = timerValue;
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
        homePage.style.display = "none"
        customBoxTitle.textContent = "Alert!"
        customBoxText.textContent = "Please, enter your names."
        customBox.style.display = "flex"
        document.querySelector('.confirm-button').onclick = function(){
            homePage.style.display = "flex";
            customBox.style.display = "none"
        }
    }
}
function resetGame(){
    document.querySelector('.reset-button').onclick = function(){
        gameTable.forEach(function(table){
            table.textContent = "";
        })
        controlWinBoolean = false;
        checkTieBoolean = false;
        activePlayer = playerOne;
        nextPlayer = playerTwo;
        timerValue = 5;
        document.querySelector('.player-one-info-name').style.color = "white";
        document.querySelector('.player-one-timer-area').style.border = "5px solid white";
        document.querySelector('.player-two-info-name').style.color = "#9e9e9e";
        document.querySelector('.player-two-timer-area').style.border = "5px solid #757575"
    }
}