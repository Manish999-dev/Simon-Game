var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//2. Creating a new variable called level and start at level 0.
var level = 0;

//1. Using jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function () {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);

    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  // 2. Calling checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

// Checking the User's Answer Against the Game Sequence8

// 1.Creating a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

  //3. Writing an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");

    // Playing the wrong sound if the user presses any wrong pattern
    playSound("wrong");

    //Changing the background of the body according to the class game-over for 200 milliseconds
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Displaying the h1  or level title class as Game Over to the user and restarting the game again
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Finally calling the startOver function to restart the game after resetting the values of variables
    startOver();
  }
}

function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //4. Inside nextSequence(), increasing the level by 1 every time nextSequence() is called.
  level++;

  //5. Inside nextSequence(), updating the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Creating a new function to restart the game after game-over
function startOver() {

  // Inside this function, resetting the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}