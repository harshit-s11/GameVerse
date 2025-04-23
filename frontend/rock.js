let rock = document.getElementById("rock");
let sci = document.getElementById("sci");
let paper = document.getElementById("paper");
let countyou = document.getElementById("countyou");
let countcomp = document.getElementById("countcomp");
let idx1 = 0;
let win = 0;
let lose = 0;
let btn1 = document.querySelector("button");

// Function to update localStorage when a player wins
function saveWinToLocalStorage() {
    const player = localStorage.getItem('currentPlayer');
    if (player) {
        let wins = JSON.parse(localStorage.getItem('playerWins')) || {};
        wins[player] = (wins[player] || 0) + 1;
        localStorage.setItem('playerWins', JSON.stringify(wins));
    }
}

const rock_chance = () => {
    if (idx1 % 3 === 0) {
        win++;
        countyou.innerText = win;
        btn1.innerText = "You win";
        btn1.style.backgroundColor = "green";
        saveWinToLocalStorage();
    } else {
        lose++;
        countcomp.innerText = lose;
        btn1.innerText = "You lose";
        btn1.style.backgroundColor = "red";
    }
    idx1++;
};

const sci_chance = () => {
    if (idx1 % 2 === 0) {
        win++;
        countyou.innerText = win;
        btn1.innerText = "You win";
        btn1.style.backgroundColor = "green";
        saveWinToLocalStorage();
    } else {
        lose++;
        countcomp.innerText = lose;
        btn1.innerText = "You lose";
        btn1.style.backgroundColor = "red";
    }
    idx1++;
};

const paper_chance = () => {
    if (idx1 % 5 === 0) {
        win++;
        countyou.innerText = win;
        btn1.innerText = "You win";
        btn1.style.backgroundColor = "green";
        saveWinToLocalStorage();
    } else {
        lose++;
        countcomp.innerText = lose;
        btn1.innerText = "You lose";
        btn1.style.backgroundColor = "red";
    }
    idx1++;
};

rock.addEventListener("click", rock_chance);
sci.addEventListener("click", sci_chance);
paper.addEventListener("click", paper_chance);

// ❌ Removed the fetch call to localhost:5000
