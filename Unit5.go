// Author: William Provost
// Version: 1.0.0
// Date: 2025-01-09
// Fileoverview: Simplified number-based card game with Unicode cards

package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"time"
)

/* ============================================================
   CONSTANTS
   ============================================================ */

// Unicode card symbols
var cardSymbols = []string{
	"🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧",
	"🂨", "🂩", "🂪", "🂫", "🂭", "🂮",
}

/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */

// Pause function
func pause(message string) {
	fmt.Println(message)
	reader := bufio.NewReader(os.Stdin)
	reader.ReadString('\n')
}

/* ============================================================
   INPUT VALIDATION FUNCTIONS
   ============================================================ */

// Prompt user for a number within a range
func promptNumber(message string, min int, max int) int {
	reader := bufio.NewReader(os.Stdin)

	for {
		fmt.Print(message + " ")
		input, _ := reader.ReadString('\n')
		input = strings.TrimSpace(input)

		number, err := strconv.Atoi(input)
		if err == nil && number >= min && number <= max {
			return number
		}

		fmt.Printf("Invalid input. Enter a number between %d and %d.\n", min, max)
	}
}

/* ============================================================
   CARD LOGIC FUNCTIONS
   ============================================================ */

// Draw a random card
func drawCard() (int, string) {
	index := rand.Intn(len(cardSymbols))
	return index + 1, cardSymbols[index]
}

/* ============================================================
   GAMEPLAY FUNCTIONS
   ============================================================ */

// Play a single mini-round
func playMiniRound(roundNum int, miniNum int) int {
	fmt.Printf("\nRound %d, Mini-round %d:\n", roundNum, miniNum)
	pause("Press ENTER to draw your card.")

	playerValue := 0
	playerSymbol := ""
	computerValue := 0
	computerSymbol := ""

	playerValue, playerSymbol = drawCard()
	computerValue, computerSymbol = drawCard()

	fmt.Printf("You drew: %s (%d)\n", playerSymbol, playerValue)
	fmt.Printf("Computer drew: %s (%d)\n", computerSymbol, computerValue)

	if playerValue > computerValue {
		fmt.Println("You win this mini-round!")
		return 1
	} else if computerValue > playerValue {
		fmt.Println("Computer wins this mini-round!")
		return -1
	}

	fmt.Println("Mini-round tied!")
	return 0
}

// Play a full round (best of 3 mini-rounds)
func playRound(roundNum int) int {
	playerWins := 0
	computerWins := 0

	for mini := 1; mini <= 3; mini++ {
		result := playMiniRound(roundNum, mini)

		switch result {
		case 1:
			playerWins++
		case -1:
			computerWins++
		}

		fmt.Printf("Current Score - You: %d, Computer: %d\n", playerWins, computerWins)
		pause("Press ENTER to continue.")
	}

	fmt.Printf("\nRound %d result: You %d - %d Computer\n", roundNum, playerWins, computerWins)

	if playerWins > computerWins {
		return 1
	} else if computerWins > playerWins {
		return -1
	}

	return 0
}

/* ============================================================
   MAIN PROGRAM
   ============================================================ */

func main() {
	rand.Seed(time.Now().UnixNano())

	fmt.Println("Welcome to the Simplified Card Game!")

	gameMode := promptNumber(
		"Choose game mode (1: best-of-3, 2: sum of cards):",
		1,
		2,
	)

	// ---------------- GAME MODE 1 ----------------
	if gameMode == 1 {
		fmt.Println("\nGame Mode 1: Best of 3 mini-rounds")

		winner := playRound(1)

		switch winner {
		case 1:
			fmt.Println("\nYou won the game!")
		case -1:
			fmt.Println("\nComputer won the game!")
		default:
			fmt.Println("\nThe game is a tie!")
		}

	} else {
		// ---------------- GAME MODE 2 ----------------
		fmt.Println("\nGame Mode 2: Up to 3 rounds, sum of cards")

		playerRounds := 0
		computerRounds := 0

		for round := 1; round <= 3; round++ {
			fmt.Printf("\nStarting Round %d\n", round)

			playerSum := 0
			computerSum := 0

			for mini := 1; mini <= 3; mini++ {
				pause("Press ENTER to draw cards.")

				playerValue := 0
				playerSymbol := ""
				computerValue := 0
				computerSymbol := ""

				playerValue, playerSymbol = drawCard()
				computerValue, computerSymbol = drawCard()

				fmt.Printf("You drew: %s (%d)\n", playerSymbol, playerValue)
				fmt.Printf("Computer drew: %s (%d)\n", computerSymbol, computerValue)

				playerSum += playerValue
				computerSum += computerValue

				fmt.Printf("Current sum - You: %d, Computer: %d\n", playerSum, computerSum)
			}

			if playerSum > computerSum {
				fmt.Printf("You win Round %d!\n", round)
				playerRounds++
			} else if computerSum > playerSum {
				fmt.Printf("Computer wins Round %d!\n", round)
				computerRounds++
			} else {
				fmt.Printf("Round %d is a tie!\n", round)
			}
		}

		fmt.Printf("\nFinal Score: You %d - %d Computer\n", playerRounds, computerRounds)

		if playerRounds > computerRounds {
			fmt.Println("You won the game!")
		} else if computerRounds > playerRounds {
			fmt.Println("Computer won the game!")
		} else {
			fmt.Println("The game is a tie!")
		}
	}

	/* ============================================================
	   PROGRAM END
	   ============================================================ */

	fmt.Println("\nThank you for playing!")
	fmt.Println("Done.")
}
