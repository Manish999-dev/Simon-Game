// Array of color options
var buttonColours = ["red", "blue", "green", "yellow"];

// To store the game's pattern sequence
var gamePattern = [];

var userClickedPattern = [];

//1. Using jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
   
    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
 
    var userChosenColour = $(this).attr("id");

    //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

//   console.log(userClickedPattern);

    //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);
});


function nextSequence() {
    // Random number from 0 to 3
    var randomNumber = Math.floor(Math.random() * 4);

    // Use it to pick a random color
    var randomChosenColour = buttonColours[randomNumber];

    // Add color to game pattern
    gamePattern.push(randomChosenColour);

    // Animate the chosen button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // Refactoring the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
