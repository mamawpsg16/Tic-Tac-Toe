/** TIC TAC TOE */

// SELECT ELEMENTS
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const p0score = document.querySelector("#score0");
const p1score = document.querySelector("#score1");

//Default Values
let currentPlayer = "X";
let running = false;
let options = ["", "", "", "", "", "", "", "", ""];
let scores = [0, 0];
let winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize Game
const initializeGame = function () {
  cells.forEach((cell) => cell.addEventListener("click", clickedCell));
  restartBtn.addEventListener("click", restartGame);
  running = true;
};
//Check the clicked cell
const clickedCell = function () {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] === "" && running === true) {
    updateCell(cellIndex, this);
  }
};

//Update cell
const updateCell = function (index, element) {
  options[index] = currentPlayer;
  element.textContent = currentPlayer;
  checkWinner();
};

//Change Player when cell is updated
const changePlayer = function () {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn!`;
};

//Check Options if there are already a winner or a draw
const checkWinner = function () {
  //if theres already a  round winning  = true
  let roundWon = false;
  //Loop in winning condition for a result
  for (const [index, value] of winningConditions.entries()) {
    const condition = winningConditions[index];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }

    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    let index = currentPlayer === "X" ? 0 : 1;
    scores[index]++;
    document.getElementById(`score-${index}`).textContent = scores[index];
    statusText.textContent = `${currentPlayer} win!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = "Draw!";
  } else {
    changePlayer();
  }
};

//Restart Game
const restartGame = function () {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = ""));
  statusText.textContent = `${currentPlayer}'s turn!`;
  running = true;
};
initializeGame();
