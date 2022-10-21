var timerEl = document.getElementById('.time-remaining');
var beginButton = document.getElementById('.begin-button');
var mainEl = document.getElementById('.main');
var questionEl = document.getElementById('.question');

var timer;
var timerCount;

function startTimer() {
    timer= setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;
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
