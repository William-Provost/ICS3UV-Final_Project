/**
 * @author William Provost
 * @version 1.3.0
 * @date 2025-01-06
 * @fileoverview Simplified number-based card game with Unicode cards
 */

/* ============================================================
 * CONSTANTS
 * ============================================================
 */

// Unicode card symbols (Ace–King of Spades)
const card_Symbols: string[] = [
  "🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧",
  "🂨", "🂩", "🂪", "🂫", "🂭", "🂮"
];

// Game configuration constants
const mini_Rounds: number = 3;
const total_Rounds: number = 3;

/* ============================================================
 * GLOBAL VARIABLES
 * ============================================================
 */

// Game mode selected by user
let gameMode: number = 0;

/* ============================================================
 * UTILITY FUNCTIONS
 * ============================================================
 */

// Pause function
function pause(message: string): void {
  prompt(message);
}

/* ============================================================
 * INPUT VALIDATION FUNCTIONS
 * ============================================================
 */

// Prompt user for a number within a range
function promptNumber(message: string, min: number, max: number): number {
  let input: string | null = null;
  let number: number = 0;
  let done: boolean = false;

  while (!done) {
    input = prompt(message);

    if (input === null) {
      console.log("Input cancelled. Exiting game.");
      return -1;
    }

    number = Number(input);

    if (!isNaN(number) && number >= min && number <= max) {
      done = true;
    } else {
      console.log(`Invalid input. Enter a number between ${min} and ${max}.`);
    }
  }

  return number;
}

/* ============================================================
 * CARD LOGIC FUNCTIONS
 * ============================================================
 */

// Draw a random card
function drawCard(): { value: number; symbol: string } {
  const index = Math.floor(Math.random() * card_Symbols.length);
  return {
    value: index + 1,
    symbol: card_Symbols[index]
  };
}

/* ============================================================
 * GAMEPLAY FUNCTIONS
 * ============================================================
 */

// Play a single mini-round
function playMiniRound(roundNum: number, miniNum: number): number {
  console.log(`\nRound ${roundNum}, Mini-round ${miniNum}:`);
  pause("Press Enter to draw your card.");

  const playerCard = drawCard();
  const computerCard = drawCard();

  console.log(`You drew: ${playerCard.symbol} (${playerCard.value})`);
  console.log(`Computer drew: ${computerCard.symbol} (${computerCard.value})`);

  if (playerCard.value > computerCard.value) {
    console.log("You win this mini-round!");
    return 1;
  } else if (computerCard.value > playerCard.value) {
    console.log("Computer wins this mini-round!");
    return -1;
  } else {
    console.log("Mini-round tied!");
    return 0;
  }
}

// Play a full round (best of 3 mini-rounds)
function playRound(roundNum: number): number {
  let playerWins: number = 0;
  let computerWins: number = 0;

  for (let mini = 1; mini <= mini_Rounds; mini++) {
    const result = playMiniRound(roundNum, mini);

    if (result === 1) {
      playerWins++;
    } else if (result === -1) {
      computerWins++;
    }

    console.log(`Current Score - You: ${playerWins}, Computer: ${computerWins}`);
    pause("Press Enter to continue.");
  }

  console.log(`\nRound ${roundNum} result: You ${playerWins} - ${computerWins} Computer`);

  if (playerWins > computerWins) return 1;
  if (computerWins > playerWins) return -1;
  return 0;
}

/* ============================================================
 * MAIN PROGRAM
 * ============================================================
 */

console.log("Welcome to the Simplified Card Game!");

gameMode = promptNumber(
  "Choose game mode (1: best-of-3, 2: sum of cards):",
  1,
  2
);

if (gameMode === -1) {
  console.log("Game cancelled.");
}

/* ============================================================
 * GAME MODE 1
 * ============================================================
 */

else if (gameMode === 1) {
  console.log("\nGame Mode 1: Best of 3 mini-rounds");

  const winner = playRound(1);

  if (winner === 1) {
    console.log("\nYou won the game!");
  } else if (winner === -1) {
    console.log("\nComputer won the game!");
  } else {
    console.log("\nThe game is a tie!");
  }
}

/* =============================================================
 * GAME MODE 2
 * ============================================================
 */

else {
  console.log("\nGame Mode 2: Up to 3 rounds, sum of cards");

  let playerRounds: number = 0;
  let computerRounds: number = 0;

  for (let round = 1; round <= total_Rounds; round++) {
    console.log(`\nStarting Round ${round}`);

    let playerSum: number = 0;
    let computerSum: number = 0;

    for (let mini = 1; mini <= mini_Rounds; mini++) {
      pause("Press Enter to draw cards.");

      const playerCard = drawCard();
      const computerCard = drawCard();

      console.log(`You drew: ${playerCard.symbol} (${playerCard.value})`);
      console.log(`Computer drew: ${computerCard.symbol} (${computerCard.value})`);

      playerSum += playerCard.value;
      computerSum += computerCard.value;

      console.log(`Current sum - You: ${playerSum}, Computer: ${computerSum}`);
    }

    if (playerSum > computerSum) {
      console.log(`You win Round ${round}!`);
      playerRounds++;
    } else if (computerSum > playerSum) {
      console.log(`Computer wins Round ${round}!`);
      computerRounds++;
    } else {
      console.log(`Round ${round} is a tie!`);
    }
  }

  console.log(`\nFinal Score: You ${playerRounds} - ${computerRounds} Computer`);

  if (playerRounds > computerRounds) {
    console.log("You won the game!");
  } else if (computerRounds > playerRounds) {
    console.log("Computer won the game!");
  } else {
    console.log("The game is a tie!");
  }
}

/* ============================================================
 * PROGRAM END
 * ============================================================
 */

console.log("\nThank you for playing!");
console.log("Done.");
