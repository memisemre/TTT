const gameTable = document.querySelectorAll('.table');
const currentPlayerValue = document.querySelector('.current-player-value');
const totalGameArea = document.querySelector('.total-game-value');
const xScoreUpdate = document.querySelector('.x-score');
const oScoreUpdate = document.querySelector('.o-score');
const tieScoreUpdate = document.querySelector('.tie-score')
let timerTextX = document.querySelector('.timer-area-x-text')
let timerTextO = document.querySelector('.timer-area-o-text')
let modalArea = document.querySelector('.modal-area')
let gameArea = document.querySelector ('.game-area')
let playerOneInput = document.querySelector('.input-player-X')
let playerTwoInput = document.querySelector('.input-player-O')
let playerOne; 
let playerTwo;
let currentText = "X";
let timerValue = 5;
let totalGame = 0;
let xScore = 0;
let oScore = 0;
let tieScore = 0;
let controlWin = false;
let controlTie = false;
let currentPlayer;

gameTable.forEach(table => table.addEventListener('click',() => chooseTable(table)))
function chooseTable(table){
    if (table.textContent ===""){
        currentPlayer = playerOne
        table.textContent= currentText;
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
    setInterval (timer,1000);
};
function turnPlayer(){
    if (currentPlayer == playerOne){
        currentPlayer = playerTwo;
        currentText = "O"
        timerTextX.textContent = 0;
        timerValue = 5;
    }
    else {
        timerTextO.textContent = 0;
        currentPlayer=playerOne;
        currentText = "X";
        timerValue = 5;
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
        currentPlayer = "playerOne"
        currentPlayerValue.textContent = currentPlayer;
        timerValue = 0;
        clearInterval ()
    }
}
function checkTie (){
    const values = [];
    gameTable.forEach(table => values.push(table.textContent))
    if (!values.includes("")) {
        controlTie = true;
        timerTextO.textContent = 0;
        timerTextX. textContent = 0;
        clearInterval()
    }
}
document.querySelector('.reset-button').onclick = function(){
    gameTable.forEach(function(table){
        table.textContent = ""
    })
    currentPlayer = "playerOne"
    currentPlayerValue.textContent = currentPlayer;
    controlWin = false;
    controlTie = false;
    timerValue = 5;
}
function timer (){
    if (timerValue > 0){
        if (currentPlayer === "playerOne") {
            timerTextX.textContent = timerValue;
            timerValue--;
        }
        else {
            timerTextO.textContent = timerValue;
            timerValue--;
        }
    }
    else if (timerValue == 0){
        timerTextO.textContent = 0;
        timerTextX.textContent = 0;
        turnPlayer()
        timerValue = 5;
    }
    else (
        clearInterval()
    )
}
document.querySelector('.game-start-button').onclick = function (){
    playerOne = playerOneInput.value;
    playerTwo = playerTwoInput.value;
    gameArea.style.display = "flex";
    modalArea.style.display = "none";
}
document.querySelector('.open-modal-button').onclick = function(){
    gameArea.style.display = "none";
    modalArea.style.display = "flex";
}