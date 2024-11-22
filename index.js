let cnum = Math.floor(Math.random() * 100) + 1;
let attempt = 0;
let userinp = document.getElementById("input");
let subBtn = document.getElementById("submit");
let resBtn = document.getElementById("resBtn");
let message = document.getElementById("msg");
let attemptData = document.getElementById("Attempt");
let currentPlayerDisplay = document.getElementById("currentPlayer");

let player1Name = "";
let player2Name = "";
let currentPlayer = "";

function check() {
    let usernum = parseInt(userinp.value);
    if (cnum === usernum) {
        message.innerHTML = `Congratulations, ${currentPlayer}! You guessed the number!`;
        message.style.color = "green";
        resBtn.style.display = "block";
        subBtn.disabled = true;
        // Fireworks effect
        confetti({
            particleCount: 100,
            spread: 160,
            origin: { y: 0.6 },
            colors: ['#bb0000', '#ffffff']
        });
    } else {
        if (cnum < usernum) {
            message.innerHTML = "Too high! Try again.";
            message.style.color = "red";
        } else {
            message.innerHTML = "Too low! Try again.";
            message.style.color = "red";
        }

        attempt++;
        attemptData.innerHTML = attempt;

        if (attempt >= 10) {
            showBoomBlast();
            message.innerHTML = `Boom! You couldn't guess the number in 10 attempts. The correct number was ${cnum}.`;
            message.style.color = "red";
            resBtn.style.display = "block";
            subBtn.disabled = true;
        } else if (player2Name !== "") {
            currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
            currentPlayerDisplay.innerHTML = currentPlayer;
        }

        setTimeout(() => {
            userinp.value = "";
            if (attempt < 10 && cnum !== usernum) {
                message.innerHTML = "";
            }
        }, 1500);
    }
}

function showBoomBlast() {
    let boom = document.createElement('div');
    boom.className = 'boom';
    document.body.appendChild(boom);
    setTimeout(() => {
        document.body.removeChild(boom);
    }, 1000);
}

function restart() {
    cnum = Math.floor(Math.random() * 100) + 1;
    attempt = 0;
    attemptData.innerHTML = attempt;
    message.innerHTML = "";
    userinp.value = "";
    resBtn.style.display = "none";
    subBtn.disabled = false;
    currentPlayer = player1Name;
    currentPlayerDisplay.innerHTML = currentPlayer;
}

function back() {
    document.getElementById('modeSelection').style.display = 'block';
    document.getElementById('playerNames').style.display = 'none';
    document.getElementById('gameSection').style.display = 'none';
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    document.getElementById('input').value = '';
    document.getElementById('currentPlayer').innerText = "Player 1";
    document.getElementById('Attempt').innerText = "0";
    document.getElementById('msg').innerText = "";
    player1Name = "";
    player2Name = "";
    currentPlayer = "";
    cnum = Math.floor(Math.random() * 100) + 1;
    attempt = 0;
}

document.getElementById('singlePlayerBtn').addEventListener('click', function() {
    player1Name = document.getElementById('player1').value || "Player 1";
    document.getElementById('playerNames').style.display = 'block';
    document.getElementById('player2').style.display = 'none';
    document.getElementById('gameSection').style.display = 'block';
    document.getElementById('modeSelection').style.display = 'none';
    currentPlayer = player1Name;
    currentPlayerDisplay.innerHTML = currentPlayer;
});

document.getElementById('multiPlayerBtn').addEventListener('click', function() {
    player1Name = document.getElementById('player1').value || "Player 1";
    player2Name = document.getElementById('player2').value || "Player 2";
    document.getElementById('playerNames').style.display = 'block';
    document.getElementById('player2').style.display = 'block';
    document.getElementById('gameSection').style.display = 'block';
    document.getElementById('modeSelection').style.display = 'none';
    currentPlayer = player1Name;
    currentPlayerDisplay.innerHTML = currentPlayer;
});

function createRibbons() {
    const ribbonsContainer = document.getElementById('ribbons');

    for (let i = 0; i < 30; i++) {
        let ribbon = document.createElement('div');
        ribbon.className = 'ribbon';
        ribbon.style.setProperty('--x', Math.random());
        ribbon.style.animationDuration = (Math.random() * 2 + 3) + 's';
        ribbonsContainer.appendChild(ribbon);
    }
}

document.addEventListener('DOMContentLoaded', createRibbons);

subBtn.addEventListener('click', check);
resBtn.addEventListener('click', restart);
backBtn.addEventListener('click', back);








