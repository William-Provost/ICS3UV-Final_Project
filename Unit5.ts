/**
* @author William Provost
* @version 1.0.0
* @date 2026-01-06
* @fileoverview Simplified number-based card game with Unicode cards
*/

// Unicode card symbols (Ace–King of Spades)
const cardSymbols: string[] = [
  "🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧",
  "🂨", "🂩", "🂪", "🂫", "🂭", "🂮"
];

// Pause function
function pause(message: string): void {
  prompt(message);
}

// Prompt user for a number within a range
function promptNumber(message: string, min: number, max: number): number { // It asks the user for a number, makes sure the input is valid and within a range, and keeps asking until it is
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
