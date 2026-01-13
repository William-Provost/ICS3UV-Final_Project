// Author: William Provost
// Version: 1.0.0
// Date: 2025-01-09
// Fileoverview: Simplified number-based card game using Unicode cards

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

func main() {

	// ============================================================
	// VARIABLE DECLARATION
	// ============================================================

	var gameMode int
	var inputString string

	var playerValue int
	var computerValue int

	var playerWins int
	var computerWins int

	var playerSum int
	var computerSum int

	var playerRounds int
	var computerRounds int

	var round int
	var mini int

	var cardSymbols = []string{
		"🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧",
		"🂨", "🂩", "🂪", "🂫", "🂭", "🂮",
	}

	reader := bufio.NewReader(os.Stdin)

	// ============================================================
	// INITIAL SETUP
	// ============================================================

	rand.Seed(time.Now().UnixNano())

	fmt.Println("Welcome to the Simplified Card Game!")

	// ============================================================
	// GET GAME MODE
	// ============================================================

	for {
		fmt.Print("Choose game mode (1: best-of-3, 2: sum of cards): ")
		inputString, _ = reader.ReadString('\n')
		inputString = strings.TrimSpace(inputString)
		gameMode, _ = strconv.Atoi(inputString)

		if gameMode == 1 || gameMode == 2 {
			break
		}

		fmt.Println("Invalid choice. Enter 1 or 2.")
	}

	// ============================================================
	// GAME MODE 1: BEST OF 3
	// ============================================================

	if gameMode == 1 {

		fmt.Println("\nGame Mode 1: Best of 3 mini-rounds")

		playerWins = 0
		computerWins = 0

		for mini = 1; mini <= 3; mini++ {

			fmt.Printf("\nMini-round %d\n", mini)
			fmt.Print("Press ENTER to draw cards.")
			reader.ReadString('\n')

			playerValue = rand.Intn(len(cardSymbols)) + 1
			computerValue = rand.Intn(len(cardSymbols)) + 1

			fmt.Printf("You drew: %s (%d)\n", cardSymbols[playerValue-1], playerValue)
			fmt.Printf("Computer drew: %s (%d)\n", cardSymbols[computerValue-1], computerValue)

			if playerValue > computerValue {
				fmt.Println("You win this mini-round!")
				playerWins++
			} else if computerValue > playerValue {
				fmt.Println("Computer wins this mini-round!")
				computerWins++
			} else {
				fmt.Println("Mini-round is a tie!")
			}

			fmt.Printf("Score - You: %d Computer: %d\n", playerWins, computerWins)
		}

		if playerWins > computerWins {
			fmt.Println("\nYou won the game!")
		} else if computerWins > playerWins {
			fmt.Println("\nComputer won the game!")
		} else {
			fmt.Println("\nThe game is a tie!")
		}

	} else {

		// ============================================================
		// GAME MODE 2: SUM OF CARDS
		// ============================================================

		fmt.Println("\nGame Mode 2: Sum of cards")

		playerRounds = 0
		computerRounds = 0

		for round = 1; round <= 3; round++ {

			fmt.Printf("\nRound %d\n", round)

			playerSum = 0
			computerSum = 0

			for mini = 1; mini <= 3; mini++ {

				fmt.Print("Press ENTER to draw cards.")
				reader.ReadString('\n')

				playerValue = rand.Intn(len(cardSymbols)) + 1
				computerValue = rand.Intn(len(cardSymbols)) + 1

				fmt.Printf("You drew: %s (%d)\n", cardSymbols[playerValue-1], playerValue)
				fmt.Printf("Computer drew: %s (%d)\n", cardSymbols[computerValue-1], computerValue)

				playerSum += playerValue
				computerSum += computerValue

				fmt.Printf("Current sum - You: %d Computer: %d\n", playerSum, computerSum)
			}

			if playerSum > computerSum {
				fmt.Println("You win this round!")
				playerRounds++
			} else if computerSum > playerSum {
				fmt.Println("Computer wins this round!")
				computerRounds++
			} else {
				fmt.Println("Round is a tie!")
			}
		}

		fmt.Printf("\nFinal Score - You: %d Computer: %d\n", playerRounds, computerRounds)

		if playerRounds > computerRounds {
			fmt.Println("You won the game!")
		} else if computerRounds > playerRounds {
			fmt.Println("Computer won the game!")
		} else {
			fmt.Println("The game is a tie!")
		}
	}

	// ============================================================
	// PROGRAM END
	// ============================================================

	fmt.Println("\nDone.")
}
