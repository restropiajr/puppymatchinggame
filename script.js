'use strict';

// Selecting elements
const cards = document.querySelectorAll('.memory-card');

// Starting conditions
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Flipping card functionality
const flipCard = function () {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
};

// Matching functionality
const checkForMatch = function () {
  let isMatch = firstCard.dataset.puppy === secondCard.dataset.puppy;
  isMatch ? disableCards() : unFlipCards();
};

// Disabling cards functionality after matching
const disableCards = function () {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
};

// Unflipping cards functionality after failing to match
const unFlipCards = function () {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
};

// Resetting conditions after each match attempt
const resetBoard = function () {
  [hasFlippedCard, lockBoard] = [(false, false)];
  [firstCard, secondCard] = [null, null];
};

// Shuffling functionality
const shuffle = (function () {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})(); // (); = Immediately Invoked Function Expression (IIFE)

// Card callout
cards.forEach(card => card.addEventListener('click', flipCard));
