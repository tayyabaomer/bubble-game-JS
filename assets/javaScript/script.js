

// Dynamically Generate Bubble and put random numbers by using random and floor methods
var pBottom = document.querySelector('#pbtm');
var clutter = '';
function makeBubble() {
    clutter = ''; // Clear clutter before generating new bubbles
    for(var i = 1; i <= 105; i++) {
        var rn = Math.floor(Math.random()*10);
        clutter += `<div class="bubble">${rn}</div>`;
    }
    pBottom.innerHTML = clutter;    
}


// let's do the timer start
var timer = 60;
var dTime = document.querySelector('#timer');
function runTimer() {
    // store set interval and clear it when timer reaches to 0, to save the memory
    var timerInterval = setInterval(function() {
        if(timer > 0){
            timer--;
            dTime.textContent = timer;
        }
        else {
            clearInterval(timerInterval);
            pBottom.innerHTML = `<h1 id="message">Game Over</h1>`;
            hiScore(); // Check high score on game over
        }
    }, 1000);
};


// make a function for new hit the number user should click
var hit = document.querySelector('#hit');
var hitRN;
function getNewHit() {
    hitRN = Math.floor(Math.random() * 10);
    hit.textContent = hitRN;
}


// Increase Score when you clicked on hit numbers
var score = 0;
var scoreVal = document.querySelector('#score');
function increaseScore() {
    // save and increase score
    score += 10;
    scoreVal.textContent = score;
}


// we can add event listener to parent div too if you have so many child and don't which one will be click
pBottom.addEventListener('click', function(details) {
    // target propety will collect div of exact bubble's detail, then get text content by textContent property
    var clickedNum = Number(details.target.textContent);
    if(clickedNum === hitRN) {
        increaseScore();
        makeBubble();
        getNewHit();
    }
     
})


// Hi Score function, get the value from local storage
var hiscoreID = document.querySelector('#hiScore');
function hiScore(){

    var storedScore = localStorage.getItem('hiScore') || 0;

    if (score > storedScore) {
        localStorage.setItem('hiScore', score); // Store new high score
        hiscoreID.textContent = score;  // Update high score display
    }
    else {
        hiscoreID.textContent = storedScore;    // Display existing high score
    }
}




// Initialize Game
hiScore();
getNewHit();
runTimer();
makeBubble();