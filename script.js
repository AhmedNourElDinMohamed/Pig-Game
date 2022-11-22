'use strict';
// Variables
const current0El = document.querySelector('#current--0');
const current0E2 = document.querySelector('#current--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
let scores, currentScore, activePlayer, playing;

const reset = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  document.querySelector(`#score--0`).textContent = '';
  document.querySelector(`#score--1`).textContent = '';
  current0El.textContent = 0;
  current0E2.textContent = 0;
  diceEl.classList.add('hidden');
};

const switchPlayer = () => {
  if (playing) {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
  }
};

const roll = () => {
  if (playing) {
    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;
    // 3.Check for rolled 1: if true, switch to next player
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

const hold = () => {
  if (playing) {
    scores[`${activePlayer}`] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[`${activePlayer}`];
    if (scores[`${activePlayer}`] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    }
    switchPlayer();
  }
};

reset();
btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', reset);
