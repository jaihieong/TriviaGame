////////////////////////////////////////////////////////////
// windows scope VARS
var count, indexCorrect, answerSelected, questions, counterCorrect, counterIncorrect, counterTimeout;
var showQuestion;
var showResult;
var showResultPage;
/////////////////////////////////////////////////////////////
questions = [];

questions[0] = {
    question: "Which sport is played during the World Cup?",
    answers: ["baseball", "basketball", "soccer", "hockey"],
    indexCorrect: 2
};

questions[1] = {
    question: "Which country holds the most number of titles throught the history of the World Cup?",
    answers: ["Italy", "Brazil", "United States", "France"],
    indexCorrect: 1

};

questions[2] = {
    question: "Which country hosted and became the title winner of the very first World Cup in 1930?",
    answers: ["Mexico", "Argentina", "Portugal", "Uruguay"],
    indexCorrect: 3
};

questions[3] = {
    question: "The smallest country (in terms of population) to ever compete in the World Cup is:",
    answers: ["Iceland", "Korea", "Chile", "Italy"],
    indexCorrect: 0
};

questions[4] = {
    question: "What is USA's best ever result in World Cups which took place in the very first tournament?",
    answers: ["First", "Second", "Third", "Fourth"],
    indexCorrect: 2
};

questions[5] = {
    question: "Which country scored the most goals of 10 in a single match?",
    answers: ["Hungary", "Argentina", "Spain", "Poland"],
    indexCorrect: 0
};

/////////////////////////////////////////////////////////////
// event listeners --->
$(document).ready(function() {
    
    $("#choice0").on("click", function() 
    {
        console.log("choice 1 clicked");
        answerSelected = 0;
        displayResult();
    });
    
    $("#choice1").on("click", function() 
    {
        console.log("choice 2 clicked");
        answerSelected = 1;
        displayResult();
    });
    
    $("#choice2").on("click", function() 
    {
        console.log("choice 3 clicked");
        answerSelected = 2;
        displayResult();
    });
    
    $("#choice3").on("click", function() 
    {
        console.log("choice 4 clicked");
        answerSelected = 3;
        displayResult();
    });

    $("#start-button").on("click", function() {
        console.log("start button clicked");
        // start the game by displaying the first questions
        startGame();
        showQuestion = setInterval(nextQuestion, 5000);
    });
});
// <--- event listeners
/////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// Time Count --->
var time = 10;
var intervalID;

function decrement() {
    time--;
    $("#time-remaining").html("<h2>" + time + "</h2>");
    
    if (time <= 0) {
        stop();
    }
};

function stop() {
    clearInterval(intervalID);
};

function runTime() {
    $("#time-remaining").html("<h2>" + time + "</h2>");
    clearInterval(intervalID);
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
    $("#start-button").show();
    $("#display-time").hide();
    $("#display-question").hide();
    $("#choice0").hide();
    $("#choice1").hide();
    $("#choice2").hide();
    $("#choice3").hide();
};

function startGame() {
    $("#display-time").show();
    $("#display-question").show();
    $("#choice0").show();
    $("#choice1").show();
    $("#choice2").show();
    $("#choice3").show();
    $("#start-button").hide();
    displayContent();
};

function checkAnswer(userChoice) {
    if (userChoice === questions[count].indexCorrect) {
        console.log("correct!");
        counterCorrect++;
        return true;
    } else {
        console.log("incorrect =(");
        counterIncorrect++;
        return false;
    }
};

function displayContent() {  
    // display question on browser
    $("#question").html("<h3>" + questions[count].question + "</h3>");
    // display answer choices on browser
    for (var i = 0; i< questions[count].answers.length; i++) {
        $("#choice" + i).html("<p>" + questions[count].answers[i] + "</p>");
    }
    console.log("Correct Answer: " + questions[count].indexCorrect);
};

function nextQuestion() {
    count++;
    // run this funtion only until the length of the questions array
    if (count < questions.length){
        displayContent();
    // stops showing next question when questions array length is reached
    } else {
        count = 0;
        clearInterval(showQuestion);
        initGame();
    }
};

function displayResult() {
    var imageResult = $("<img>");
    if (checkAnswer(answerSelected)) {
        imageResult.attr("src","assets/images/correct.jpg");
    } else {
        imageResult.attr("src", "assets/images/incorrect.jpg");
    }
    $("#result-image").html(imageResult);
    // display counter
};
// <--- functions 
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
// run the program

initGame();

// display title, start button

// when start game is clicked
// display the first question

// if answer is clicked
    // if correct
    // show correct image
    // increment correct count

    // else
    // show inccorrect image
    // increment incorrect count
