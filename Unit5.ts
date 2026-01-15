/**
 * @author William Provost
 * @version 1.3.3
 * @date 2025-01-06
 * @fileoverview Simplified number-based card game with Unicode cards
 */

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
  let input: string = "";
  let number: number = 0;
  let done: boolean = false;

  while (!done) {
    input = prompt(message) || ""; // convert null to empty string

    if (input === "") {
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
function drawCard(cardSymbols: string[]): { value: number; symbol: string } {
  const index = Math.floor(Math.random() * cardSymbols.length);
  return {
    value: index + 1,
    symbol: cardSymbols[index]
  };
}

/* ============================================================
 * GAMEPLAY FUNCTIONS
 * ============================================================
 */

// Play a single mini-round
function playMiniRound(roundNum: number, miniNum: number, cardSymbols: string[]): number {
  console.log(`\nRound ${roundNum}, Mini-round ${miniNum}:`);
  pause("Press Enter to draw your card.");

  const playerCard = drawCard(cardSymbols);
  const computerCard = drawCard(cardSymbols);

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
function playRound(roundNum: number, miniRounds: number, cardSymbols: string[]): number {
  let playerWins: number = 0;
  let computerWins: number = 0;

  for (let mini = 1; mini <= miniRounds; mini = mini + 1) {
    const result = playMiniRound(roundNum, mini, cardSymbols);

    if (result === 1) {
      playerWins = playerWins + 1;
    } else if (result === -1) {
      computerWins = computerWins + 1;
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
 * GAME CODE
 * ============================================================
 */

console.log("Welcome to the Simplified Card Game!");

// Local constants (no globals)
const cardSymbols: string[] = [
  "🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧",
  "🂨", "🂩", "🂪", "🂫", "🂭", "🂮"
];
const miniRounds: number = 3;
const totalRounds: number = 3;

// Local gameMode variable
let gameMode: number = promptNumber(
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

  const winner = playRound(1, miniRounds, cardSymbols);

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
 * =============================================================
 */

else {
  console.log("\nGame Mode 2: Up to 3 rounds, sum of cards");

  let playerRounds: number = 0;
  let computerRounds: number = 0;

  for (let round = 1; round <= totalRounds; round = round + 1) {
    console.log(`\nStarting Round ${round}`);

    let playerSum: number = 0;
    let computerSum: number = 0;

    for (let mini = 1; mini <= miniRounds; mini = mini + 1) {
      pause("Press Enter to draw cards.");

      const playerCard = drawCard(cardSymbols);
      const computerCard = drawCard(cardSymbols);

      console.log(`You drew: ${playerCard.symbol} (${playerCard.value})`);
      console.log(`Computer drew: ${computerCard.symbol} (${computerCard.value})`);

      playerSum = playerSum + playerCard.value;
      computerSum = computerSum + computerCard.value;

      console.log(`Current sum - You: ${playerSum}, Computer: ${computerSum}`);
    }

    if (playerSum > computerSum) {
      console.log(`You win Round ${round}!`);
      playerRounds = playerRounds + 1;
    } else if (computerSum > playerSum) {
      console.log(`Computer wins Round ${round}!`);
      computerRounds = computerRounds + 1;
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
