const gameBoard = document.querySelector('#game-board');
const info = document.querySelector('#info');
const startCells = [
  "", "", "",
  "", "", "",
  "", "", ""
]
let turn = Math.random() >= 0.5 ? 'circle' : 'cross';
info.textContent = `Turn: ${turn}`;

function createBoard() {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('square');
    cellElement.id = index;
    cellElement.addEventListener('click', addGo)
    gameBoard.append(cellElement);
  })
}

createBoard()

function addGo(e) {
  const display = document.createElement('div');
  display.classList.add(turn);
  e.target.append(display);
  turn = turn === 'circle' ? 'cross' : 'circle';
  info.textContent = `Turn: ${turn}`;
  e.target.removeEventListener('click', addGo);
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll('.square');
  const playAgainBtn = document.createElement('button');
  playAgainBtn.textContent = "Play Again!";
  playAgainBtn.classList.add('btn')
  playAgainBtn.addEventListener('click', playAgain);
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  winningCombos.forEach(winCombo => {
    let isCircleWin = winCombo.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));
    if (isCircleWin) {
      info.textContent = 'Cirlcle Wins';
      info.append(playAgainBtn);
      allSquares.forEach(square => {
        square.replaceWith(square.cloneNode(true));
      });
      return;
    }
    let isCrossWin = winCombo.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));
    if (isCrossWin) {
      info.textContent = 'Cross Wins';
      info.append(playAgainBtn);
      allSquares.forEach(square => {
        square.replaceWith(square.cloneNode(true));
      });
      return;
    }
  });
  let isTie = checkTie(allSquares);
  if (isTie) {
    info.textContent = 'Is Tie!';
    info.append(playAgainBtn);
    allSquares.forEach(square => {
      square.replaceWith(square.cloneNode(true));
    });
    return;
  }
}

function checkTie(allSquares) {
  for (let i = 0; i < allSquares.length; i++) {
    if (!allSquares[i].firstChild) {
      return false;
    }
  }
  return true;
}

function playAgain() {
  const allSquares = document.querySelectorAll('.square');
  allSquares.forEach(square => {
    if (square.firstChild) {
      square.removeChild(square.firstChild);
    }
    square.addEventListener('click', addGo)
  })
  info.removeChild(document.querySelector('.btn'));
  info.textContent = `Turn: ${turn}`;
}