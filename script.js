const boxes = document.querySelectorAll('.game-box');
const restartBtn = document.querySelector('#restart-game');
const newGameBtn = document.querySelector('#new-game-btn');
const messageContainer = document.querySelector('.message-container');
const gameMessage = document.querySelector('#game-message');

let count = 0;
let turnO = true;
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener('click', function () {
        if (gameOver) return;

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (isWinner) {
            gameOver = true;
        } else if (count === 9) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    gameMessage.innerText = "It's a draw!";
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    gameMessage.innerText = `Congrats! Winner is ${winner}`;
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const resetGame = () => {
    turnO = true;
    count = 0;
    gameOver = false;
    enableBoxes();
    messageContainer.classList.add("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return true;
        }
    }
    return false;
};

newGameBtn.addEventListener('click', resetGame);
restartBtn.addEventListener('click', resetGame);
