// Variables declaration
let showedCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let successes = 0;
let timerClock = false;
let intervalTimer = null;
let timer = 45;
let initialTime = timer;

// Selecting element from DOM
let showMovements = document.getElementById('total-movements');
let showSuccesses = document.getElementById('successes');
let showTimer = document.getElementById('time-remaining');


// Generating random numbers
let randomNumberArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

randomNumberArray = randomNumberArray.sort(() => {
    return Math.random() - 0.5
});

function lockCards() {
    for (let i = 0; i < randomNumberArray.length; i++) {
        let lockedCard = document.getElementById(i);
        lockedCard.innerHTML = randomNumberArray[i];
        lockedCard.disabled = true;
    }
}

function timeCounter() {
    intervalTimer = setInterval(() => {
        timer--;
        showTimer.innerHTML = `Quedan: ${timer} segundos.`;
        if (timer === 0) {
            clearInterval(intervalTimer);
            lockCards();
        }
    }, 800);
}

function showCard(id) {

    if (timerClock === false) {
        timeCounter();
        timerClock = true;

    }
    showedCards++;
    if (showedCards === 1) {
        card1 = document.getElementById(id);
        firstResult = randomNumberArray[id];
        card1.innerHTML = firstResult;

        card1.disabled = true;
    } else if (showedCards === 2) {
        card2 = document.getElementById(id);
        secondResult = randomNumberArray[id];
        card2.innerHTML = secondResult;

        card2.disabled = true;

        movements++;
        showMovements.innerHTML = `Movimientos: ${movements}`;

        if (firstResult === secondResult) {
            showedCards = 0;

            successes++;
            showSuccesses.innerHTML = `Aciertos: ${successes}`;

            if (successes === 8) {
                clearInterval(intervalTimer);
                showSuccesses.innerHTML = `¡Ganaste! Obtuviste ${successes} aciertos.`;
                showTimer.innerHTML = `Te demoraste ${initialTime - timer} segundos.`;
                showMovements.innerHTML = `Hiciste: ${movements} movimientos`;
            }
        } else {
            setTimeout(() => {
                card1.innerHTML = ' ';
                card2.innerHTML = ' ';
                card1.disabled = false;
                card2.disabled = false;
                showedCards = 0;
            }, 1000);
        }
    }
}