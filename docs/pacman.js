const canvas = document.getElementById('game-map');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Hardcoded player name for now
localStorage.setItem('currentPlayer', 'Player1');

let character = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 30,
  height: 30,
  speed: 5,
};

let chaser = {
  x: 100,
  y: 100,
  width: 30,
  height: 30,
  speed: 1,
};

let gameStarted = false;
let scatteredLetters = [];
let randomWord = "HAUNTED";
let collectedLetters = [];
let letterOutOfOrderAlerted = false;

function generateLetters() {
  scatteredLetters = [];
  for (let i = 0; i < randomWord.length; i++) {
    let x, y, overlap;
    do {
      x = Math.random() * (canvas.width - 50);
      y = Math.random() * (canvas.height - 50);
      overlap = scatteredLetters.some(
        letter => Math.abs(letter.x - x) < 40 && Math.abs(letter.y - y) < 40
      );
    } while (overlap);
    scatteredLetters.push({ letter: randomWord[i], x, y });
  }
}

function drawCharacter() {
  ctx.fillStyle = '#3b5';
  ctx.fillRect(character.x, character.y, character.width, character.height);
}

function drawChaser() {
  ctx.fillStyle = '#d33';
  ctx.fillRect(chaser.x, chaser.y, chaser.width, chaser.height);
}

function drawMap() {
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(750, 50);
  ctx.lineTo(750, 550);
  ctx.lineTo(50, 550);
  ctx.closePath();
  ctx.stroke();
}

function moveChaser() {
  const dx = character.x - chaser.x;
  const dy = character.y - chaser.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance > 0) {
    chaser.x += (dx / distance) * chaser.speed;
    chaser.y += (dy / distance) * chaser.speed;
  }
}

function moveCharacter(e) {
  if (gameStarted) {
    switch (e.key) {
      case 'ArrowUp':
        if (character.y > 0) character.y -= character.speed;
        break;
      case 'ArrowDown':
        if (character.y + character.height < canvas.height) character.y += character.speed;
        break;
      case 'ArrowLeft':
        if (character.x > 0) character.x -= character.speed;
        break;
      case 'ArrowRight':
        if (character.x + character.width < canvas.width) character.x += character.speed;
        break;
    }
  }
}

function drawLetters() {
  scatteredLetters.forEach(({ letter, x, y }) => {
    ctx.fillStyle = '#FFF';
    ctx.font = '20px Arial';
    ctx.fillText(letter, x + 5, y + 20);
    ctx.strokeStyle = '#FFF';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 30, 30);
  });
}

function displayTargetWord() {
  ctx.fillStyle = '#FFF';
  ctx.font = '20px Arial';
  const text = 'Collect: ' + randomWord;
  const textWidth = ctx.measureText(text).width;
  const xPos = canvas.width - textWidth - 20;
  const yPos = 50;
  ctx.fillText(text, xPos, yPos);
}

function checkLetterCollection() {
  scatteredLetters.forEach((item, index) => {
    if (
      character.x < item.x + 20 &&
      character.x + character.width > item.x &&
      character.y < item.y + 20 &&
      character.y + character.height > item.y
    ) {
      if (item.letter === randomWord[collectedLetters.length]) {
        collectedLetters.push(item.letter);
        scatteredLetters.splice(index, 1);
        letterOutOfOrderAlerted = false;
      } else if (!letterOutOfOrderAlerted) {
        alert("Collect letters in order!");
        letterOutOfOrderAlerted = true;
      }
    }
  });

  if (collectedLetters.join('') === randomWord) {
    alert("You won! Word formed: " + randomWord);
    saveWinToLocalStorage(); // ✅ Save win here
    resetGame();
  }
}

function checkGameOver() {
  if (
    chaser.x < character.x + character.width &&
    chaser.x + chaser.width > character.x &&
    chaser.y < character.y + character.height &&
    chaser.y + chaser.height > character.y
  ) {
    alert("Game Over! The chaser caught you!");
    resetGame();
  }
}

function gameLoop() {
  if (gameStarted) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawCharacter();
    drawChaser();
    moveChaser();
    drawLetters();
    displayTargetWord();
    checkLetterCollection();
    checkGameOver();
    requestAnimationFrame(gameLoop);
  }
}

function resetGame() {
  character.x = canvas.width / 2;
  character.y = canvas.height / 2;
  chaser.x = 100;
  chaser.y = 100;
  collectedLetters = [];
  letterOutOfOrderAlerted = false;
  generateLetters();
  if (gameStarted) {
    gameLoop();
  }
}

// Save win count to local storage
function saveWinToLocalStorage() {
  const player = localStorage.getItem('currentPlayer');
  if (player) {
    let wins;
    try {
      wins = JSON.parse(localStorage.getItem('playerWins')) || {};
    } catch (e) {
      wins = {};
    }
    wins[player] = (wins[player] || 0) + 1;
    localStorage.setItem('playerWins', JSON.stringify(wins));
    updateWinDisplay();
  }
}

function updateWinDisplay() {
  const player = localStorage.getItem('currentPlayer');
  const winsDisplay = document.getElementById('win-count');
  if (player && winsDisplay) {
    const wins = JSON.parse(localStorage.getItem('playerWins')) || {};
    winsDisplay.textContent = `Wins: ${wins[player] || 0}`;
  }
}

document.getElementById('start-game').addEventListener('click', () => {
  gameStarted = true;
  generateLetters();
  gameLoop();
  document.getElementById('start-game').style.display = 'none';
  document.getElementById('restart').style.display = 'inline-block';
});

document.getElementById('restart').addEventListener('click', () => {
  resetGame();
});

window.addEventListener('keydown', moveCharacter);
window.addEventListener('DOMContentLoaded', updateWinDisplay);