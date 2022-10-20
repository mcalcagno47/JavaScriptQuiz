var timerEl = document.getElementById('countdown');
var beginButton = document.getElementById('begin-button');
var mainEl = document.getElementById('main');
var question = document.getElementById('question');

function countdown() {
    var timeLeft = 15;
    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = timeLeft + ' seconds';
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timerEl.textContent = timeLeft + ' second';
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            timerEl.textContent = '';
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
            // Call the `displayMessage()` function
            displayMessage();
        }
    }, 1000);
}


// Displays the end of quiz message, displaying their score and directing them to the high score section
function displayMessage() {
    var questionCount = 0;

    // Uses the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var questionInterval = setInterval(function () {
        // If there are no more words left in the message
        if (words[questionCount] === undefined) {
            // Use `clearInterval()` to stop the timer
            clearInterval(questionInterval);
        } else {
            // Display one word of the message
            mainEl.textContent = words[questionCount];
            questionCount++;
        }
    }, 1000);
}

countdown();
