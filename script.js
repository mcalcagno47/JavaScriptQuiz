var timerEl = document.querySelector('.time-remaining');
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var highScoreButton = document.getElementById('high-score-btn')
var mainEl = document.querySelector('#main');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-btns')
var questionContainerEl = document.getElementById('question-container');

let shuffledQuestions, currentQuestionIndex

var timer;
var timerCount;
var isWin = false;

var question = [
    {
        question: 'Who was the first captain of the NCC-1701?',
        answers: [
            { text: 'Robert April', correct: true },
            { text: 'Christopher Pike', correct: false },
            { text: 'James Kirk', correct: false },
            { text: 'Will Decker', correct: false }
        ]
    },
    {
        question: 'What class was the USS Valiant?',
        answers: [
            { text: 'Valiant', correct: false },
            { text: 'Intrepid', correct: false },
            { text: 'Defiant', correct: true },
            { text: 'Galaxy', correct: false }
        ]
    },
    {
        question: 'Question 3?',
        answers: [
            { text: 'answer 1', correct: false },
            { text: 'the answer', correct: true },
            { text: 'answer 3', correct: false },
            { text: 'answer 4', correct: false }
        ]
    },
    {
        question: 'Question 4?',
        answers: [
            { text: 'answer 1', correct: false },
            { text: 'answer 2', correct: false },
            { text: 'the answer', correct: true },
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

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = question.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    timerCount = 15
    startTimer()
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('btn')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        } else {
            button.dataset.wrong = answer.wrong
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        highScoreButton.innerText = 'Go to High Scores'
        highScoreButton.classList.remove('hide')
        console.log(timerCount)
        getHighScore()
        stopTimer
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function collectScore() {
    button.addEventListener('click', getHighScore)
}

function getHighScore() {
    questionContainerEl.textContent = "Score: " + timerCount;
    localStorage.getItem = timerCount
}

// The winGame function is called when the win condition is met
function winGame() {
    questionContainerEl.textContent = "YOU WON!!!🏆 ";
    console.log(timerCount)
}

// The loseGame function is called when timer reaches 0
function loseGame() {
    questionContainerEl.textContent = "GAME OVER";
    nextButton.classList.remove('hide')
    nextButton.innerText = 'Go to High Scores anyway'
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

function stopTimer() {
    timerEl.classList.add('hide')
}

