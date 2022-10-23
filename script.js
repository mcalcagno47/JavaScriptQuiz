var timerEl = document.querySelector('.time-remaining');
var startButton = document.getElementById('start-btn');
var mainEl = document.querySelector('#main');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-btns')
var questionContainerEl = document.getElementById('question-container');

var winCount;
var loseCount;
var timer;
var timerCount;
var isWin = false;
var currentQuestion = 0;

var quizQuestions = [
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

startButton.addEventListener("click", startGame);

// The startGame function is called when the start button is clicked
function startGame() {
    startButton.classList.add('hide');
    questionContainerEl.classList.remove('hide')
    timerCount = 75;
    startTimer();
    showQuestion();
}

function showNextQuestion() {
    questionEl(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.quizQuestions;
}

// The winGame function is called when the win condition is met
function winGame() {
    quizContainerEl.textContent = "YOU WON!!!🏆 ";
    console.log(timerCount)
}

// The loseGame function is called when timer reaches 0
function loseGame() {
    quizContainerEl.textContent = "GAME OVER";
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

