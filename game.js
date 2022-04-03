var buttonColours = ["red", "blue", "green", "yellow"];
// var randomChosenColour = buttonColours[nextSequence()];
var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = 0;

if (started === 0) {
  $(document).on("keypress", function() {
        nextSequence();
        started = 1;
    })
};
$(".startButton").on("click", function() {
  $(".startButton").addClass('pressed').delay(100).queue(function() {
    $(this).removeClass('pressed');
    $(this).dequeue();
    $(".startButton").hide();
  });
  playAudio("yellow");
  nextSequence();
  started = 1;
});



$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(buttonColours.indexOf(userChosenColour));
  animatePress(buttonColours.indexOf(userChosenColour));
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
});

function playAudio(value) {
  switch (value) {
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();

      break;
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();

      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();

      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();

      break;
    default:

  }
};




function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(buttonColours.indexOf(randomChosenColour));

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playAudio(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
  console.log(gamePattern);
  // return randomChosenColour;
};

function animatePress(currentColour) {
  $('#' + buttonColours[currentColour]).addClass('pressed').delay(100).queue(function() {
    $(this).removeClass('pressed');
    $(this).dequeue();
    playAudio(buttonColours[currentColour]);
  });
}

function checkAnswer(currentColour) {
  if (userClickedPattern[currentColour] === gamePattern[currentColour]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    };
  } else {
    console.log("Wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass('game-over').delay(200).queue(function() {
      $(this).removeClass('game-over');
      $(this).dequeue();
    });
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $(".startButton").show();
    startOver();
  }
};

function startOver() {
  gamePattern = [];
  level = 0;
  started = 0;
}
