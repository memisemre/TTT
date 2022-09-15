const gameTable = document.querySelectorAll('.table');
const modalArea = document.querySelector('.modal-area')
const gameArea = document.querySelector('.game-area')
const activePlayerText = document.querySelector('.active-player-text')
const nextPlayerText = document.querySelector('.next-player-text');
const totalGameText = document.querySelector('.total-game-value');
const tieScoreText = document.querySelector('.tie-score');
const xScoreText = document.querySelector('.x-score');
const oScoreText = document.querySelector('.o-score');
const playerXInput = document.querySelector('.input-player-X');
const playerOInput = document.querySelector('.input-player-O');
let nextPlayer = "O";
let oScore = 0;
let xScore = 0;
let tieScore = 0;
let totalGamePoint = 0;
let activePlayer = "X";
let controlWinBoolean = false;
let checkTieBoolean = false;
function startGame (){
    gameTable.forEach(table => table.addEventListener('click',() => chooseTable(table)));
    nextPlayerText.textContent = nextPlayer;
    activePlayerText.textContent = "X";
    tieScoreText.textContent = tieScore;
    xScoreText.textContent = xScore;
    oScoreText.textContent = oScore;
}
function chooseTable(table){
    if (table.textContent === "" && controlWinBoolean === false){
    table.textContent = activePlayer;
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
    if (activePlayer ==="X") {
        activePlayer = "O";
        nextPlayer = "X"
        nextPlayerText.textContent = nextPlayer;
        activePlayerText.textContent = "O"
    }
    else {
        activePlayer = "X"
        nextPlayer = "O"
        nextPlayerText.textContent = nextPlayer;
        activePlayerText.textContent = "X";
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
        if (activePlayer === "X"){
            xScore++;
            xScoreText.textContent = xScore;
        }
        else {
            oScore++;
            oScoreText.textContent = oScore;
        }
        Swal.fire ({
            icon: 'success',
            title: `${activePlayer} win.`,
            text: 'Please, restart the game.'
        })
        controlWinBoolean = true;
        totalGamePoint++;
        totalGameText.textContent = totalGamePoint;
}}
function checkTie(){
        const tieFunctionValues = [];
        gameTable.forEach(table => tieFunctionValues.push(table.textContent))
        if (!tieFunctionValues.includes("")) {
            checkTieBoolean = true;
}}
document.querySelector('.reset-button').onclick = function(){
    gameTable.forEach(function(table){
        table.textContent = ""
        controlWinBoolean = false;
        checkTieBoolean = false;
        activePlayer = "X";
        nextPlayer = "O";
        activePlayerText.textContent = activePlayer;
        nextPlayerText.textContent = nextPlayer;
    })}
document.querySelector('.game-start-button').onclick = function(){
    gameArea.style.display = "flex"
    modalArea.style.display = "none"
    startGame ();
}
