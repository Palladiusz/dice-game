var scores,
  roundScore,
  activePlayer,
  gamePlaying,
  previousRoll,
  previousRoll2,
  winScore;

const diceDOM = document.querySelector(`.dice`);
const diceDOM2 = document.querySelector(`.dice2`);
const double6 = document.getElementById(`double6`);
const roll1 = document.getElementById(`roll1`);

init();

document.querySelector(`.btn-roll`).addEventListener(`click`, () => {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    diceDOM.style.display = `block`;
    diceDOM.src = `dice-${dice}.png`;

    diceDOM2.style.display = `block`;
    diceDOM2.src = `dice-${dice2}.png`;

    double6.style.display = `none`;
    roll1.style.display = `none`;

    if (
      (dice === 6 && dice === previousRoll) ||
      (dice2 === 6 && dice2 === previousRoll2)
    ) {
      double6.style.display = `block`;
      scores[activePlayer] = 0;
      document.getElementById(`score-${activePlayer}`).textContent = 0;
      nextPlayer();
    } else if (dice === 1 || dice2 === 1) {
      roll1.style.display = `block`;
      nextPlayer();
    } else {
      previousRoll = dice;
      previousRoll2 = dice2;
      roundScore += dice + dice2;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    }
  }
});

document.querySelector(`.btn-hold`).addEventListener(`click`, () => {
  if (gamePlaying) {
    hideDices();
    scores[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    if (!winScore) {
      winScore = 100;
    }
    if (scores[activePlayer] >= winScore) {
      document.getElementById(`name-${activePlayer}`).textContent = `WINNER!`;
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add(`winner`);
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove(`active`);
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  previousRoll = 0;
  previousRoll2 = 0;
  roundScore = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.getElementById(`current-0`).textContent = 0;
  document.getElementById(`current-1`).textContent = 0;
  document.querySelector(`.player-0-panel`).classList.toggle(`active`);
  document.querySelector(`.player-1-panel`).classList.toggle(`active`);
}

document.querySelector(`.btn-new`).addEventListener(`click`, init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  hideDices();

  document.getElementById(`score-0`).textContent = `0`;
  document.getElementById(`score-1`).textContent = `0`;
  document.getElementById(`current-0`).textContent = `0`;
  document.getElementById(`current-1`).textContent = `0`;
  document.getElementById(`name-0`).textContent = `Player 1`;
  document.getElementById(`name-1`).textContent = `Player 2`;
  document.querySelector(`.player-0-panel`).classList.remove(`active`);
  document.querySelector(`.player-1-panel`).classList.remove(`active`);
  document.querySelector(`.player-0-panel`).classList.remove(`winner`);
  document.querySelector(`.player-1-panel`).classList.remove(`winner`);
  document.querySelector(`.player-0-panel`).classList.add(`active`);
  winScore = document.getElementById(`win-score`).value;
}

function hideDices() {
  diceDOM.style.display = `none`;
  diceDOM2.style.display = `none`;
}
