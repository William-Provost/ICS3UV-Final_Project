/**
* @author William Provost
* @version 1.0.0
* @date 2025-01-06
* @fileoverview Simplified number-based card game with Unicode cards
*/


// Unicode card symbols (Ace–King of Spades)
const cardSymbols: string[] = [
  "🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧",
  "🂨", "🂩", "🂪", "🂫", "🂭", "🂮"
];


// Pause function (replaces alerts)
function pause(message: string): void {
  prompt(message);
}


// Prompt user for a number within a range
function promptNumber(message: string, min: number, max: number): number {
  let input: string | null = null;
  let num: number = 0;
  let valid: boolean = false;


  while (!valid) {
    input = prompt(message);
    if (input === null) {
      console.log("Input cancelled. Exiting game.");
      return -1;
    }
    num = Number(input);
    if (!isNaN(num) && num >= min && num <= max) {
      valid = true;
    } else {
      console.log(`Invalid input. Enter a number between ${min} and ${max}.`);
    }
  }


  return num;
}


// Draw a random card (value + Unicode symbol)
function drawCard(): { value: number; symbol: string } {
  const index = Math.floor(Math.random() * cardSymbols.length);
  return {
    value: index + 1,
    symbol: cardSymbols[index]
  };
}


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
  let playerWins = 0;
  let computerWins = 0;


  for (let mini = 1; mini <= 3; mini++) {
    const result = playMiniRound(roundNum, mini);
    if (result === 1) playerWins++;
    else if (result === -1) computerWins++;


    console.log(`Current Score - You: ${playerWins}, Computer: ${computerWins}`);
    pause("Press Enter to continue to the next mini-round.");
  }


  console.log(`\nRound ${roundNum} result: You ${playerWins} - ${computerWins} Computer`);
  if (playerWins > computerWins) return 1;
  if (computerWins > playerWins) return -1;
  return 0;
}


// ---------------- START GAME ----------------
console.log("Welcome to the Simplified Card Game!");


// Choose game mode
const gameMode = promptNumber(
  "Choose game mode (1: 1 round best-of-3, 2: up to 3 rounds sum of cards):",
  1,
  2
);


if (gameMode === -1) {
  console.log("Game cancelled.");
} else if (gameMode === 1) {
  console.log("\nGame Mode 1: Single round best of 3 mini-rounds");
  const winner = playRound(1);


  if (winner === 1) console.log("\nYou won the game!");
  else if (winner === -1) console.log("\nComputer won the game!");
  else console.log("\nThe game is a tie!");
} else {
  console.log("\nGame Mode 2: Up to 3 rounds, sum of cards");


  let playerRounds = 0;
  let computerRounds = 0;


  for (let round = 1; round <= 3; round++) {
    console.log(`\nStarting Round ${round}`);
    let playerSum = 0;
    let computerSum = 0;


    for (let mini = 1; mini <= 3; mini++) {
      pause(`Round ${round}, Mini-round ${mini}: Press Enter to draw your card.`);


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


    pause("Press Enter to continue to the next round.");
  }
