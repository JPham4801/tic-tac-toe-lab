/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/
const init = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "X";
    winner = false;
    tie = false;
    render();
};

const render = () => {
    updateBoard();
    updateMessage();
};

const updateBoard = () => {
    board.forEach((element, index) => {
        squareEls[index].innerText = element;
    });
};

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.innerText = `It is ${turn}'s turn!`;
    } else if (winner === false && tie === true) {
        messageEl.innerText = "It's a tie!";
    } else {
        messageEl.innerText = "Congratulations! You won!";
    }
};

const handleClick = (squareIndex) => {
    if (winner === true || tie === true) {
        return
    } else if (squareIndex.target.innerText === "") {
        placePiece(squareIndex.target.id);
        checkForWinner();
        checkForTie();
        switchPlayerTurn();
        render();
    } else if (squareIndex.target.innerText !== "") {
        return;
    }
};

const placePiece = (index) => {
    squareEls[index].innerText = turn;
    board[index] = turn;
};

const checkForWinner = () => {
    for (let i = 0; i < winningCombos.length; i++) {
        let testWinner = [];
        winningCombos[i].forEach((element) => {
            testWinner.push(board[element]);
            if (
                board[element] !== "" &&
                testWinner[0] === testWinner[1] &&
                testWinner[0] === testWinner[2]
            ) {
                winner = true;
            }
        });
        testWinner = [];
    }
};

const checkForTie = () =>{
    if(winner === true){
        return
    } else if(board.includes("")){
        return
    } else{
        tie = true;
    }
}

const switchPlayerTurn = () =>{
    if(winner === true){
        return
    } else if(turn === 'X'){
        turn = 'O'
    } else if(turn === 'O'){
        turn = 'X'
    }
}

init();
render();

/*----------------------------- Event Listeners -----------------------------*/
document.querySelector(".board").addEventListener("click", handleClick);
resetBtnEl.addEventListener("click", init)