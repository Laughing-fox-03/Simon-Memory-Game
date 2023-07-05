var userClickedpattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var firstTimeCalled = false;
var level = 0;

// on first time key press change the h1 to level 0 and call next sequence function

$(document).on("keypress", function () {
  if (firstTimeCalled === false) {
    $("h1").text("Level " + level);
    firstTimeCalled = true;
    nextSequence();
  }
});

// check which button was pressed
$(".btn").on("click", function handler() {
  var userChosenColour = this.id;
  userClickedpattern.push(userChosenColour);
  playAudio(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedpattern.length - 1);
});

// function to check user's answer
function checkAnswer(currentLevel) {
  if (userClickedpattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedpattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, HuH loser 🤣, Press Any Key to Restart");
    startOver();

  }
}

// function to restart the game
function startOver(){
    level = 0;
    gamePattern = [];
    firstTimeCalled = false;
}

// generate random number
function nextSequence() {
  $("h1").text("Level " + level);
  level++;
  userClickedpattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // flashingAnimation(button);
  var button = "#" + randomChosenColour;
  $(button).fadeIn(100).fadeOut(100).fadeIn(100);

  // adding audio to the color which is randomly generated and is flashing
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

// function to play  audio with input color name
function playAudio(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  animatePress(this.id);
}

// function to animate on pressing the buttons
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}
