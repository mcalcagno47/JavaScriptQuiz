function countdown() {
    var timeLeft = 75;
    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 0) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = timeLeft;
            // Decrement `timeLeft` by 1
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


// Displays the message one word at a time
function displayMessage() {
    var wordCount = 0;

    // Uses the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var msgInterval = setInterval(function () {
        // If there are no more words left in the message
        if (words[wordCount] === undefined) {
            // Use `clearInterval()` to stop the timer
            clearInterval(msgInterval);
        } else {
            // Display one word of the message
            mainEl.textContent = words[wordCount];
            wordCount++;
        }
    }, 1000);
}

countdown();
