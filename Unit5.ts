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
