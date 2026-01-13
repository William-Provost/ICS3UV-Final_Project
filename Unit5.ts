/**
 * Author: William Provost
 * Version: 1.0.0
 * Date: 2025-01-06
 * Fileoverview: Simplified number-based card game using Unicode cards
 */

/* ============================================================
 * CONSTANTS
 * ============================================================
 */

const cardSymbols: string[] = [
  "🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧",
  "🂨", "🂩", "🂪", "🂫", "🂭", "🂮"
];

/* ============================================================
 * UTILITY FUNCTIONS
 * ============================================================
 */

function pause(message: string): void {
  prompt(message);
}

/* ============================================================
 * MAIN PROGRAM
 * ============================================================
 */

// --------------------
// VARIABLE DECLARATION
// --------------------

let gameMode: number = 0;
let inputString: string | null;

let playerValue: number;
let computerValue: number;

let playerWins: number;
let computerWins: number;

let playerSum: number;
let computerSum: number;

let playerRounds: number;
let computerRounds: number;

let round: number;
let mini: number;

// --------------------
// INITIAL SETUP
// --------------------

console.log("Welcome to the Simplified Card Game!");

// --------------------
// GET GAME MODE
// --------------------

while (true) {
  inputString = prompt("Choose game mode (1: best-of-3, 2: sum of cards):");
  if (inputString === null) {
    console.log("Game cancelled.");
    console.log("Done.");
    break;
  }

  gameMode = Number(inputString);

  if (gameMode === 1 || gameMode === 2) {
    break;
  }

  console.log("Invalid choice. Enter 1 or 2.");
}

// ============================================================
// GAME MODE 1: BEST OF 3
// ============================================================

if (gameMode === 1) {
  console.log("\nGame Mode 1: Best of 3 mini-rounds");

  playerWins = 0;
  computerWins = 0;

  for (mini = 1; mini <= 3; mini++) {
    console.log(`\nMini-round ${mini}`);
    pause("Press ENTER to draw cards.");

    playerValue = Math.floor(Math.random() * cardSymbols.length) + 1;
    computerValue = Math.floor(Math.random() * cardSymbols.length) + 1;

    console.log(`You drew: ${cardSymbols[playerValue - 1]} (${playerValue})`);
    console.log(`Computer drew: ${cardSymbols[computerValue - 1]} (${computerValue})`);

    if (playerValue > computerValue) {
      console.log("You win this mini-round!");
      playerWins++;
    } else if (computerValue > playerValue) {
      console.log("Computer wins this mini-round!");
      computerWins++;
    } else {
      console.log("Mini-round is a tie!");
    }

    console.log(`Score - You: ${playerWins} Computer: ${computerWins}`);
  }

  if (playerWins > computerWins) {
    console.log("\nYou won the game!");
  } else if (computerWins > playerWins) {
    console.log("\nComputer won the game!");
  } else {
    console.log("\nThe game is a tie!");
  }
}

// ============================================================
// GAME MODE 2: SUM OF CARDS
// ============================================================

else if (gameMode === 2) {
  console.log("\nGame Mode 2: Sum of cards");

  playerRounds = 0;
  computerRounds = 0;

  for (round = 1; round <= 3; round++) {
    console.log(`\nRound ${round}`);

    playerSum = 0;
    computerSum = 0;

    for (mini = 1; mini <= 3; mini++) {
      pause("Press ENTER to draw cards.");

      playerValue = Math.floor(Math.random() * cardSymbols.length) + 1;
      computerValue = Math.floor(Math.random() * cardSymbols.length) + 1;

      console.log(`You drew: ${cardSymbols[playerValue - 1]} (${playerValue})`);
      console.log(`Computer drew: ${cardSymbols[computerValue - 1]} (${computerValue})`);

      playerSum += playerValue;
      computerSum += computerValue;

      console.log(`Current sum - You: ${playerSum} Computer: ${computerSum}`);
    }

    if (playerSum > computerSum) {
      console.log("You win this round!");
      playerRounds++;
    } else if (computerSum > playerSum) {
      console.log("Computer wins this round!");
      computerRounds++;
    } else {
      console.log("Round is a tie!");
    }
  }

  console.log(`\nFinal Score - You: ${playerRounds} Computer: ${computerRounds}`);

  if (playerRounds > computerRounds) {
    console.log("You won the game!");
  } else if (computerRounds > playerRounds) {
    console.log("Computer won the game!");
  } else {
    console.log("The game is a tie!");
  }
}

// ============================================================
// PROGRAM END
// ============================================================

console.log("\nThank you for playing!")
console.log("\nDone.");
