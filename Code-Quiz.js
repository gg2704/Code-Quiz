//my quiz    
var questions = [{
    title: "Which of the following tag is used for inserting the largest heading in HTML?",
    choices: ["h3( )", "h1( )", "h5( )", "h6( )"],
    answer: "h1( )"
},
{
    title: "Which is used to represent the closing of a tag in HTML?",
    choices: ["+( )", "@( )", "!( )", "/( )"],
    answer: "/( )"
},
{
    title: " Which of the following is a Javascript data type?",
    choices: ["null( )", "undefined( )", "object( )", "All of the above."],
    answer: "All of the above( )"
},
{
    title: "What is the HTML tag under which one can write the JavaScript code?",
    choices: ["javascript( )", "scripted( )", "script( )", "js( )"],
    answer: "script( )"
},
{
    title: "Which of the following function of String object combines the text of two strings and returns a new string?",
    choices: ["add( )", "concat( )", " merge( )", "append( )"],
    answer: "concat( )"
}
]

//my variables
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//timer
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//end timer
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}


//store the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();

function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s score is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br>

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}
//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
    JavaScript Quiz!
</h1>
<h3>
    Click to play!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//take away from timer
function incorrect() {
timeLeft -= 15; 
next();
}

//points for questions
function correct() {
score += 20;
next();
}

//loops for questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}
