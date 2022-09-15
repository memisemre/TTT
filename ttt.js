const gameTable = document.querySelectorAll('.table');
const modalArea = document.querySelector('.modal-area')
const gameArea = document.querySelector('.game-area')
const activePlayerText = document.querySelector('.active-player-text')
const nextPlayerText = document.querySelector('.next-player-text');
const totalGameText = document.querySelector('.total-game-value');
const tieScoreText = document.querySelector('.tie-score');
const xScoreText = document.querySelector('.x-score');
const oScoreText = document.querySelector('.o-score');
const timerTextPlayerOne = document.querySelector('.timer-area-x-text')
const timerTextPlayerTwo = document.querySelector('.timer-area-o-text')
const playerXInput = document.querySelector('.input-player-X');
const playerOInput = document.querySelector('.input-player-O');
const scoreBoardX = document.querySelector('.player-x');
const scoreBoardO = document.querySelector('.player-o');
let playerOne;
let playerTwo;
let nextPlayer;
let oScore = 0;
let xScore = 0;
let tieScore = 0;
let totalGamePoint = 0;
let activePlayer;
let controlWinBoolean = false;
let checkTieBoolean = false;
let timerValue;
function startGame (){
    gameTable.forEach(table => table.addEventListener('click',() => chooseTable(table)));
    activePlayer = playerOne;
    nextPlayer = playerTwo;
    nextPlayerText.textContent = nextPlayer;
    activePlayerText.textContent = activePlayer;
    tieScoreText.textContent = tieScore;
    xScoreText.textContent = xScore;
    oScoreText.textContent = oScore;
    timerValue = 5;
    setInterval(timer,1000);
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
                Swal.fire({
                    icon: 'warning',
                    title: 'Game Tie!!!',
                    text: 'Please, restart the game.',
                })
                totalGamePoint++;
                totalGameText.textContent = totalGamePoint;
                tieScore++;
                tieScoreText.textContent = tieScore;
            if (controlWinBoolean === true){
                Swal.fire({
                    icon: 'warning',
                    title: 'Game Over!!!',
                    text: 'Please, restart the game.',
                })
            }
    }
    }
        else if (controlWinBoolean === true || checkTieBoolean === true){
            Swal.fire({
                icon: 'warning',
                title: 'Game End!!!',
                text: 'Please, restart the game.',
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The place you are trying to choose is full.',
             })
         }
}
function turnPlayer(){
    if (activePlayer == playerOne) {
        activePlayer = playerTwo;
        nextPlayer = playerOne;
        nextPlayerText.textContent = nextPlayer;
        activePlayerText.textContent = activePlayer;
        timerValue = 5;
    }
    else {
        timerValue = 5;
        activePlayer = playerOne;
        nextPlayer = playerTwo;
        nextPlayerText.textContent = nextPlayer;
        activePlayerText.textContent = activePlayer;
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
            xScoreText.textContent = xScore;
        }
        else {
            oScore++;
            oScoreText.textContent = oScore;
        }
        Swal.fire ({
            icon: 'success',
            title: `Player ,"${activePlayer}" won.`,
            text: 'Please, restart the game.'
        })
        activePlayer = playerOne
        controlWinBoolean = true;
        totalGamePoint++;
        totalGameText.textContent = totalGamePoint;
        timerValue = 0;
        timerTextPlayerOne.textContent = timerValue;
        timerTextPlayerTwo.textContent = timerValue;
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
            timerTextPlayerOne.textContent = timerValue;
            timerValue--;
        }
        else if (activePlayer == playerTwo){
            timerTextPlayerTwo.textContent = timerValue;
            timerValue--;
        }
    }
    else if (timerValue == 0){
        if (activePlayer == playerOne){
            timerTextPlayerOne.textContent = timerValue;
        }
        else if (activePlayer == playerTwo){
            timerTextPlayerTwo.textContent = timerValue; 
        }
        turnPlayer()
    }
   else (
    clearInterval()
   )
    
}
document.querySelector('.reset-button').onclick = function(){
    gameTable.forEach(function(table){
        table.textContent = ""
        controlWinBoolean = false;
        checkTieBoolean = false;
        activePlayer = playerOne;
        nextPlayer = playerTwo;
        activePlayerText.textContent = activePlayer;
        nextPlayerText.textContent = nextPlayer;
        timerValue = 5;
    })}
document.querySelector('.game-start-button').onclick = function(){
    scoreBoardX.textContent = playerXInput.value;
    scoreBoardO.textContent = playerOInput.value;
    playerOne = playerXInput.value;
    playerTwo = playerOInput.value;
    gameArea.style.display = "flex"
    modalArea.style.display = "none"
    startGame ();
}
