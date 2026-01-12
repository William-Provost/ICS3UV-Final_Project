// Author: William Provost
// Version: 1.0.0
// Date: 2025-01-09
// Fileoverview: Simplified number-based card game with Unicode cards

/* ============================================================
  CONSTANTS / GLOBAL DATA
  ============================================================ */


// Unicode card symbols (Ace–King of Spades)
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
 bufio.NewReader(os.Stdin).ReadString('\n')
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


   num, err := strconv.Atoi(input)
   if err == nil && num >= min && num <= max {
     return num
   }


   fmt.Printf("Invalid input. Enter a number between %d and %d.\n", min, max)
 }
}
