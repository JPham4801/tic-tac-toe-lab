/*-------------------------------- Pseudocode --------------------------------*/
//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

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
const resetBtnEl = document.querySelector("#reset");

/*-------------------------------- Functions --------------------------------*/
const init = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "X";
    winner = false;
    tie = false;
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
        console.log("game over");
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
    // console.log(board);
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
                console.log("Winner!");
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
        console.log('tie');
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
document.addEventListener("click", console.log('reset hit!'));