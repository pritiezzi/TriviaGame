$(document).ready(function () {
    var options = [
        {
            question: "Where is acai fruit from?", 
            choice: ["Ethiopia", "Brazil", "Peru", "Guatamala"],
            answer: 1,
            photo: "assets/images/acai.jpg"
         },
         {
             question: "What popular soda beverage was originally developed as a mixer for whiskey?", 
            choice: ["Mountain Dew", "Sprite", "7-UP", "Coke"],
            answer: 0,
            photo: "assets/images/mtndew.png"
         }, 
         {
             question: "Kopi luwak is a very expensive type of what?", 
            choice: ["Spice", "Caviar", "Coffee", "Rice variety" ],
            answer: 2,
            photo: "assets/images/coofee.jpg"
        }, 
        {
            question: "Which is not an ingredient in a margarita?", 
            choice: ["Orange Juice", "tequila", "Sour Mix", "Galliano" ],
            answer: 3,
            photo: "assets/images/margarita.jpg"
        }, 
        {
            question: "wich of the following fruits comes from an herb", 
            choice: ["oranges", "pineapple", "apples", "bananas" ],
            answer: 3,
            photo: "assets/images/banana.jpg"
        }, 
        {
            question: "What is the most widely eaten fish in the world?", 
            choice: ["Tilapia", "Herring", "Sardine", "Tuna" ],
            answer: 1,
            photo: "assets/images/herring.jpg"
        }, 
        {
            question: "Which fruit does not ripen once it has been picked?", 
            choice: ["Banana", "Lemon", "Mango", "Apple" ],
            answer: 1,
            photo: "assets/images/lemon.jpg"
        }, 
        {
            question: "Which fruit contains the most protein per 100 calories?", 
            choice: ["Guava", "Avocado", "Banana", "Blackberries" ],
            answer: 0,
            photo: "assets/images/guava.jpg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
  
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    
    function displayQuestion() {
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
   
    }
    

    $(".answerchoice").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })