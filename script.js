var timerEl = document.querySelector('.time-remaining');
var beginButton = document.getElementById('begin-button');
var mainEl = document.querySelector('#main');
var questionEl = document.querySelector('#question');
var quizContainerEl = document.querySelector('#quiz-container');

var winCount;
var loseCount;
var timer;
var timerCount;
var isWin = false;
var currentQuestion = 0;

const quizQuestions = [
    {
        question: 'Question 1?',
        answers: [
            { text: 'answer 1', correct: true },
            { text: 'answer 2', correct: false },
            { text: 'answer 3', correct: false },
            { text: 'answer 4', correct: false }
        ]
    },
    {
        question: 'Question 2?',
        answers: [
            { text: 'answer 1', correct: false },
            { text: 'answer 2', correct: false },
            { text: 'answer 3', correct: true },
            { text: 'answer 4', correct: false }
        ]
    },
    {
        question: 'Question 3?',
        answers: [
            { text: 'answer 1', correct: false },
            { text: 'answer 2', correct: true },
            { text: 'answer 3', correct: false },
            { text: 'answer 4', correct: false }
        ]
    },
    {
        question: 'Question 4?',
        answers: [
            { text: 'answer 1', correct: false },
            { text: 'answer 2', correct: false },
            { text: 'answer 3', correct: true },
            { text: 'answer 4', correct: false }
        ]
    },
    {
        question: 'Was this assignment the hardest one yet?',
        answers: [
            { text: 'Yes', correct: true },
            { text: 'My goodness, yes', correct: true },
            { text: 'It took me over 20 hours to complete', correct: true },
            { text: 'Nope, finished it early', correct: false },
        ]
    }
];


// The startGame function is called when the start button is clicked
function startGame() {
    isWin = false;
    timerCount = 75;
    // Prevents start button from being clicked when round is in progress
    mainEl.style.display = "none";
    startTimer();
    questionEl.textContent = quizQuestions[0].question;
    for (var i = 0; i < quizQuestions[0].answers.length; i++) {
        var answerButtonEl = document.createElement("button");
        answerButtonEl.innerHTML = quizQuestions[0].answers[i].answer;
        quizContainerEl.appendChild(answerButtonEl);
    }
}

// The winGame function is called when the win condition is met
function winGame() {
    quizContainerEl.textContent = "YOU WON!!!🏆 ";
    winCounter++
    beginButton.disabled = true;
}

// The loseGame function is called when timer reaches 0
function loseGame() {
    quizContainerEl.textContent = "GAME OVER";
    loseCounter++
    beginButton.disabled = true;
}

function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = "Time Remaining: " + timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met
            if (isWin && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                winGame();
            }
        }
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

// These functions are used by init
function getWins() {
    // Get stored value from client storage, if it exists
    var storedWins = localStorage.getItem("winCount");
    // If stored value doesn't exist, set counter to 0
    if (storedWins === null) {
        winCounter = 0;
    } else {
        // If a value is retrieved from client storage set the winCounter to that value
        winCounter = storedWins;
    }
    //Render win count to page
    win.textContent = winCounter;
}

function getlosses() {
    var storedLosses = localStorage.getItem("loseCount");
    if (storedLosses === null) {
        loseCounter = 0;
    } else {
        loseCounter = storedLosses;
    }
    lose.textContent = loseCounter;
}

beginButton.addEventListener("click", startGame);