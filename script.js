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
        question: 'Who was the first captain of the NCC-1701?',
        answers: [
            { id: 0, text: 'Robert April', correct: true },
            { id: 1, text: 'Christopher Pike', correct: false },
            { id: 2, text: 'James Kirk', correct: false },
            { id: 3, text: 'Will Decker', correct: false }
        ]
    },
    {
        question: 'What class was the USS Valiant?',
        answers: [
            { id: 0, text: 'Valiant', correct: false },
            { id: 1, text: 'Intrepid', correct: false },
            { id: 2, text: 'Defiant', correct: true },
            { id: 3, text: 'Galaxy', correct: false }
        ]
    },
    {
        question: 'Question 3?',
        answers: [
            { id: 0, text: 'answer 1', correct: false },
            { id: 1, text: 'the answer', correct: true },
            { id: 2, text: 'answer 3', correct: false },
            { id: 3, text: 'answer 4', correct: false }
        ]
    },
    {
        question: 'Question 4?',
        answers: [
            { id: 0, text: 'answer 1', correct: false },
            { id: 1, text: 'answer 2', correct: false },
            { id: 2, text: 'the answer', correct: true },
            { id: 3, text: 'answer 4', correct: false }
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
