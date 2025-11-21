let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    randomNumber = Math.floor(Math.random()*3);
    switch(randomNumber) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
        default:
            break;
    }
}

function capitalize(word) {
    return String(word[0]).toUpperCase() + String(word).toLowerCase().slice(1);
}

function getHumanChoice() {
    return capitalize(prompt("Rock, Paper, or Scissors?"));
}

function playRound(computerChoice, humanChoice) {
    console.log(`You chose ${humanChoice}`);
    console.log(`The computer chose ${computerChoice}`);
    // Win if Human/Com: R/S, S/P, P/R
    if (
        ((humanChoice === "Rock") && (computerChoice === "Scissors")) || 
        ((humanChoice === "Paper") && (computerChoice === "Rock")) ||
        ((humanChoice === "Scissors") && (computerChoice === "Paper"))
    ) { // Win
        humanScore++;
        console.log(`You Won! ${humanChoice} beats ${computerChoice}`);
    } else if (
        ((humanChoice === "Rock") && (computerChoice === "Paper")) || 
        ((humanChoice === "Paper") && (computerChoice === "Scissors")) ||
        ((humanChoice === "Scissors") && (computerChoice === "Rock"))
    ){ // Lose
        computerScore++;
        console.log(`You Lost! ${computerChoice} beats ${humanChoice}`);
    } else if (
        ((humanChoice === "Rock") && (computerChoice === "Rock")) || 
        ((humanChoice === "Paper") && (computerChoice === "Paper")) ||
        ((humanChoice === "Scissors") && (computerChoice === "Scissors"))
    ) { // Tie
        console.log(`It's a tie! You both chose ${computerChoice}`);
    }
    console.log(`Human Score: ${humanScore}`);
    console.log(`Computer Score: ${computerScore}`);
}

function playGame() {
    let computerChoice = "";
    let humanChoice = "";

    humanScore = 0;
    computerScore = 0;

    let rounds = prompt("How many rounds?");
    
    for (let i = 0; i < rounds; i++) {
        computerChoice = getComputerChoice();
        humanChoice = getHumanChoice();
        playRound(computerChoice, humanChoice);
        console.log("");
    }
}

playGame();