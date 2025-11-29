let computerChoice = "";
let humanChoice = "";

let humanScore = 0;
let computerScore = 0;
let rounds = 0;

const screen = document.querySelector(".screen");
setScreenAttributes(screen);

function setScreenAttributes(screen) {
    screen.style.width = "100%";
    screen.style.height = "95vh";
    screen.style.display = "flex";
    screen.style.flexDirection = "column";
    screen.style.justifyContent = "center";
    screen.style.alignItems = "center";
    screen.style.gap = "32px";
}

const startButton = document.createElement("button");
startButton.setAttribute("class", "startButton");
createButtonStyling(startButton);
startButton.textContent = "Start Game";
screen.appendChild(startButton);
startButton.addEventListener('click', (event) => {
    screen.removeChild(startButton);
    playGame();
});

function createChoiceButtons(screen) {
    const buttonsDiv = document.createElement("div");
    buttonsDiv.setAttribute("class", "buttons");
    buttonsDiv.style.display = "flex";
    buttonsDiv.style.justifyContent = "center";
    buttonsDiv.style.gap = "16px";
    screen.appendChild(buttonsDiv);

    const rockButton = document.createElement("button");
    rockButton.setAttribute("class", "playerChoice");
    rockButton.setAttribute("id", "Rock");
    rockButton.textContent = "Rock";
    buttonsDiv.appendChild(rockButton);

    const paperButton = document.createElement("button");
    paperButton.setAttribute("class", "playerChoice");
    paperButton.setAttribute("id", "Paper");
    paperButton.textContent = "Paper";
    buttonsDiv.appendChild(paperButton);

    const scissorsButton = document.createElement("button");
    scissorsButton.setAttribute("class", "playerChoice");
    scissorsButton.setAttribute("id", "Scissors");
    scissorsButton.textContent = "Scissors";
    buttonsDiv.appendChild(scissorsButton);
}

function createButtonStyling(button) {
    button.style.backgroundColor = "#f4511e";
    button.style.border = "none";
    button.style.color = "white";
    button.style.padding = "32px 32px";
    button.style.fontSize = "20px";
    button.style.opacity = "0.6";
    button.style.transition = "0.3s";
    button.style.display = "inline-block";
    button.style.textDecoration = "none";
    button.style.cursor = "pointer";

    button.addEventListener('mouseenter', () => {
        button.style.opacity = "1";
    });

    button.addEventListener('mouseleave', () => {
        button.style.opacity = "0.6";
    });
}

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

function createScreen() {
    
}

function playGame() {

    // 1. Initialize parameters

    humanScore = 0;
    computerScore = 0;
    rounds = 0;

    // 2. Create game screen

    const gameScreen = document.createElement("div");
    gameScreen.setAttribute("class", "gameScreen")
    setScreenAttributes(gameScreen);
    screen.appendChild(gameScreen);

    createChoiceButtons(gameScreen);

    const choiceButtons = document.querySelectorAll(".playerChoice");

    const resultsBox = document.createElement("div");
    resultsBox.setAttribute("class", "resultsBox");
    resultsBox.textContent = "";
    resultsBox.style.textAlign = "center";
    resultsBox.style.border = "solid 5px black";
    resultsBox.style.padding = "16px 32px";
    resultsBox.style.fontSize = "20px";
    gameScreen.appendChild(resultsBox);

    const resultTitle = document.createElement("h3");
    resultTitle.textContent = "Human Choice | Computer Choice";
    resultsBox.appendChild(resultTitle);

    const results = document.createElement("p");
    results.textContent = "hum | com";
    resultsBox.appendChild(results);

    const winner = document.createElement("p");
    winner.textContent = "Who will win?";
    resultsBox.appendChild(winner);

    const scores = document.createElement("h4");
    scores.textContent = `Human Score: ${humanScore} | Computer Score: ${computerScore}`;
    resultsBox.appendChild(scores);

    function determineWinner(computerChoice, humanChoice) { // 0: tie; 1: human win; 2: computer win
        // Win if Human/Com: R/S, S/P, P/R
        if (
            ((humanChoice === "Rock") && (computerChoice === "Scissors")) || 
            ((humanChoice === "Paper") && (computerChoice === "Rock")) ||
            ((humanChoice === "Scissors") && (computerChoice === "Paper"))
        ) { // Win
            return 1;
        } else if (
            ((humanChoice === "Rock") && (computerChoice === "Paper")) || 
            ((humanChoice === "Paper") && (computerChoice === "Scissors")) ||
            ((humanChoice === "Scissors") && (computerChoice === "Rock"))
        ){ // Lose
            return 2;
        } else if (
            (humanChoice === computerChoice)
        ) { // Tie
            return 0;
        }
    }

    choiceButtons.forEach((button) => {

        createButtonStyling(button);

        button.addEventListener('click', (event) => {
            rounds++;

            results.textContent = "";
            
            let target = event.target;

            humanChoice = target.id;
            results.textContent += humanChoice;
            
            computerChoice = getComputerChoice();
            results.textContent += " | " + computerChoice;

            switch (determineWinner(computerChoice, humanChoice)) {
                case 0: // Tie
                    winner.textContent = `It's a tie! You both chose ${computerChoice}`;
                    break;
                case 1: // Win
                    humanScore++;
                    winner.textContent = `You Won! ${humanChoice} beats ${computerChoice}`;
                    break;
                case 2: // Lose
                    computerScore++;
                    winner.textContent = `You Lost! ${computerChoice} beats ${humanChoice}`;
                    break;
            }

            if (humanScore >= 5 || computerScore >= 5) {
                screen.removeChild(gameScreen);
                winningScreen();
            }

            scores.textContent = `Human Score: ${humanScore} | Computer Score: ${computerScore}`;
        });
    });
}

function winningScreen() {

    let winner = document.createElement("h2");
    screen.appendChild(winner);
    switch (humanScore >= 5) {
        case true:
            winner.textContent = `Congratulations! You beat the computer in ${rounds} rounds!`;
            break;
        default:
            winner.textContent = `Oh no! The computer beat you in ${rounds} rounds!`;
            break;
    }

    let restartButton = document.createElement("button");
    createButtonStyling(restartButton);
    restartButton.textContent = "Play again?";
    screen.appendChild(restartButton);

    restartButton.addEventListener('click', () => {
        screen.removeChild(winner);
        screen.removeChild(restartButton);
        playGame();
    });
}