var timerEl = document.querySelector('.time-remaining');
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var highScoreEl = document.getElementById('high-scores');
var highScoreButton = document.getElementById('high-score-btn');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-list');
var questionContainerEl = document.getElementById('question-container');

let shuffledQuestions, currentQuestionIndex

var timer;
var timerCount;

var questionBank = [
    {
        question: 'Math.floor performs the following action?',
        answers: [
            { id: 0, text: 'It rounds the number down', correct: true },
            { id: 1, text: 'It calls the lowest number in an array', correct: false },
            { id: 2, text: 'It rounds the number up', correct: false },
            { id: 3, text: 'It calls the highest number in an array', correct: false }
        ]
    },
    {
        question: 'Which symbols denote an "or" statement?',
        answers: [
            { id: 0, text: '$$', correct: false },
            { id: 1, text: '&&', correct: false },
            { id: 2, text: '||', correct: true },
            { id: 3, text: '^^', correct: false }
        ]
    },
    {
        question: 'Why are "let" declarations preferred to "var"?',
        answers: [
            { id: 0, text: 'let can be used globally', correct: false },
            { id: 1, text: 'let is only available for use within a block', correct: true },
            { id: 2, text: 'let can be re-declared', correct: false },
            { id: 3, text: 'var and let are interchangeable', correct: false }
        ]
    },
    {
        question: 'What does isNaN mean?',
        answers: [
            { id: 0, text: 'is Non-applicable Node', correct: false },
            { id: 1, text: 'Time settings are not correct', correct: false },
            { id: 2, text: 'is Not a Number', correct: true },
            { id: 3, text: 'JavaScript file not linked properly', correct: false }
        ]
    },
];

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questionBank.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    timerCount = 60
    startTimer()
    setNextQuestion(true)
}

function setNextQuestion(startOfGame) {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex], startOfGame)
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('answer-btn')
        button.innerText = answer.text
        button.classList.add('answer-btn')
        button.setAttribute('id', answer.id)
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
    var correct = shuffledQuestions[currentQuestionIndex].answers[selectedButton.id].correct
    setStatusClass(selectedButton, correct)
    if (!correct) {
        timerCount -= 15
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        highScoreButton.innerText = 'Go to High Scores'
        highScoreButton.classList.remove('hide')
        getHighScore()
        clearInterval(timer);
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

function getHighScore() {
    questionContainerEl.textContent = "Score: " + timerCount;
    localStorage.getItem = timerCount
}

// function logHighScore() {
//     highScoreEl.textContent = "High Score: " + timerCount;
//     localStorage.getItem = timerCount
// }

function loseGame() {
    questionContainerEl.textContent = "GAME OVER";
    nextButton.classList.remove('hide')
    nextButton.innerText = 'Go to High Scores anyway'
}

function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = "Time Remaining: " + timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}
