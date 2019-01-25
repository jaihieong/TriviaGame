////////////////////////////////////////////////////////////
// windows scope VARS
var count, indexCorrect, answerSelected, questions, counterCorrect, counterIncorrect, counterTimeout;
var showQuestion;
var showResult;
var showResultPage;
/////////////////////////////////////////////////////////////
questions = [
    {
    question: "Which sport is played during the World Cup?",
    answers: ["baseball", "basketball", "soccer", "hockey"],
    indexCorrect: 2
    },
    {
    question: "Which country holds the most number of titles throught the history of the World Cup?",
    answers: ["Italy", "Brazil", "United States", "France"],
    indexCorrect: 1
    },
    {
    question: "Which country hosted and became the title winner of the very first World Cup in 1930?",
    answers: ["Mexico", "Argentina", "Portugal", "Uruguay"],
    indexCorrect: 3
    },
    {
    question: "The smallest country (in terms of population) to ever compete in the World Cup is:",
    answers: ["Iceland", "Korea", "Chile", "Italy"],
    indexCorrect: 0
    },
    {
    question: "What is USA's best ever result in World Cups which took place in the very first tournament?",
    answers: ["First", "Second", "Third", "Fourth"],
    indexCorrect: 2
    },
    {
    question: "Which country scored the most goals of 10 in a single match?",
    answers: ["Hungary", "Argentina", "Spain", "Poland"],
    indexCorrect: 0
    },
];


/////////////////////////////////////////////////////////////
// event listeners --->
$(document).ready(function() {
    
    $("#choice0").on("click", function() 
    {
        console.log("choice 1 clicked");
        answerSelected = 0;
        displayResult();
        stopTime();
    });
    
    $("#choice1").on("click", function() 
    {
        console.log("choice 2 clicked");
        answerSelected = 1;
        displayResult();
        stopTime();
    });
    
    $("#choice2").on("click", function() 
    {
        console.log("choice 3 clicked");
        answerSelected = 2;
        displayResult();
        stopTime();
    });
    
    $("#choice3").on("click", function() 
    {
        console.log("choice 4 clicked");
        answerSelected = 3;
        displayResult();
        stopTime();
    });

    $("#start-button").on("click", function() {
        console.log("start button clicked");
        startGame();
    });
});
// <--- event listeners
/////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// Time Count --->
var time;
var intervalID;

function decrement() {
    time--;
    $("#time-remaining").html("<h2>" + time + "</h2>");
    
    if (time === 0) {
        stopTime();
        if (count < questions.length){
            displayResult();
        }
    }
};

function stopTime() {
    clearInterval(intervalID);
    $("#time-remaining").hide();
    // if (count < questions.length) {
    //     displayResult();
    // }
};

function runTime() {
    clearInterval(intervalID);
    time = 15;
    $("#time-remaining").html("<h2>" + time + "</h2>");
    $("#time-remaining").show();
    intervalID = setInterval(decrement, 1000);
};
// <--- time count
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
// functions --->
function initGame() {
    count = 0;
    counterCorrect = 0;
    counterIncorrect = 0;
    counterTimeout = 0;
    $("#start-button").show();
    hideMainContents();
    $("#result-correct").hide();
    $("#result-incorrect").hide();
    $("#result-unanswered").hide();
    $("#result").hide();
    $("#correct-answer").hide();
};

function hideMainContents() {
    $("#display-time").hide();
    $("#display-question").hide();
    $("#choice0").hide();
    $("#choice1").hide();
    $("#choice2").hide();
    $("#choice3").hide();
    
};

function showMainContents() {
    $("#display-time").show();
    $("#display-question").show();
    $("#choice0").show();
    $("#choice1").show();
    $("#choice2").show();
    $("#choice3").show();
    $("#result").hide();
    $("#correct-answer").hide();
};
    

function startGame() {
    $("#start-button").hide();
    showMainContents();
    modifyMainContents();
    runTime();
};

function modifyMainContents() {  
    // display question on browser
    $("#question").html("<h3>" + questions[count].question + "</h3>");
    // display answer choices on browser
    for (var i = 0; i< questions[count].answers.length; i++) {
        $("#choice" + i).html("<p>" + questions[count].answers[i] + "</p>");
    }
    // log out the correct answer in console.
    console.log("Correct Answer: " + questions[count].indexCorrect);
    console.log(questions[count].answers[questions[count].indexCorrect]);
};


function checkAnswer(userChoice) {
    // stopTime(); If time is stopped here, program does not run.
    var result;
    if (userChoice === questions[count].indexCorrect) {
        counterCorrect++;
        result = true;
    } else {
        counterIncorrect++;
        result = false;
    }
    
    return result;
};

function displayResult() {
    
    hideMainContents();
    
    var imageResult = $("<img>");
    var answerCorrect;
    var result;
    if (time > 0) {
        if (checkAnswer(answerSelected)) {
            imageResult.attr("src", "assets/images/correct.jpg");
            result = "You are correct !";
            $("#correct-answer").text("");
            console.log("correct");
        } else {
            imageResult.attr("src", "assets/images/incorrect.jpg");
            console.log("incorrect");
            result = "Wrong!";
            answerCorrect = questions[count].answers[questions[count].indexCorrect];
            $("#correct-answer").text("Correct Answer was: "+ answerCorrect);
        }
    } else {
        imageResult.attr("src", "assets/images/incorrect.jpg");
        result = "Sorry, you're out of time"
        counterTimeout++;
        answerCorrect = questions[count].answers[questions[count].indexCorrect];
        $("#correct-answer").text("Correct Answer was: "+ answerCorrect);
        console.log("timeout");
    }
    $("#result").text(result);
    $("#result").show();
    $("#correct-answer").show();
    console.log(answerCorrect);
    $("#result-image").html(imageResult);
    $("#result-image").show();
    // show the result for 3 seconds
    
    if (count < questions.length){
        setTimeout(nextQuestion, 3000);
    }
    // display counter
};

function nextQuestion() {
    // $("#time-remaining").hide();
    $("#result-image").hide();
    count++;
    runTime();
    
    // run this funtion only until the length of the questions array
    if (count < questions.length){
        showMainContents();
        modifyMainContents();
    // stops showing next question when questions array length is reached
    } else {
        resultPage();
    }
};

function resultPage() {
    
    $("#result-correct").text("Number of Correct Answers: " + counterCorrect);
    $("#result-incorrect").text("Number of Incorrect Answers: " + counterIncorrect);
    $("#result-unanswered").text("Number of questions NOT answered: " + counterTimeout);
    $("#result-correct").show();
    $("#result-incorrect").show();
    $("#result-unanswered").show();
    $("#result").hide();
    $("#correct-answer").hide();
    hideMainContents();
    stopTime();
    var btnStartAgain = $("#start-button").text("Start GAME again");
    
    setTimeout(initGame, 5000);
    
    console.log("this is result page");
};


// <--- functions 
////////////////////////////////////////////////////////////////////

initGame();