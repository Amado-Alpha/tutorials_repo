'use strict';

/* 
  GAME LOGIC:
  We have two players of the game. Each player rolls the dice by
  pressing a buttun (btnRoll). A player can decide to go for another
  roll after a previous roll, and for each roll players score gets in
  remented by the dice number (1 up to 6). But a play can decide to pre
  ss the hold button to preserve the current score he has, because all wi
  ll be lost if a next roll is equal to 1. 

  CHALLENGING MYSELF
  As the current state of the game, player 1 must start the game. There is no
  way player 2 can start ahead of player 1. You can modify this to give an opp
  ortunity to any of the players to start the game. 

  HINT: 👌👌👌
      You should find a way to make the variable activePlayer dynamic.
*/

// Selecting elements

/* 
  As seen below we have selected some elements using querySelector,
  and getElementById. They both work the same way but getElementById
  is presumed to be faster if you are selecting many elements IDs.

*/ 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
/*
  We have used an array for scores here so that we won't have to initialize two
  Variables for two players both holding the same thing.
*/
  scores = [0, 0];

  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  // Updating the score of the current player to Zero
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  /*
    Updating the activePlayer variable, using a ternary operator, 
    More understandable if you keep it like this. activePlayer is already a
    globally accesible variable initialized at zero. the outer activePlayer is
    the actual varible that will be accessible throughout the program. while the
    inner activePlayer is current value resulting from the program executions. 

    Another way of writing it would be as below.

    activePlayer = if (activePlayer === 0){
      activePlayer === 1
    }else{
      activePlayer === 0
    }
  */
  activePlayer = activePlayer === 0 ? 1 : 0;

  /*
    The toggle method of the classList helps us check if the class is there or not
    and add it or remove it respectively.
  */
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');

    /* 
      We have a series of images (dice-1, dice-2, dice-3 ... dice-6)
      that we will need to dynamically display based on the random number(dice)
      found as per above line of code. So if the number is 3 we want the image
      to be displayed to be dice-3, that's why we have the following line of code.
    */
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Resetting the game.
btnNew.addEventListener('click', init);
