var buttonColours = ["red", "blue", "green", "yellow"]; //array of colours

var userClickedPattern = []; //empty array used to store user pattern
var gamePattern = []; //empty array used to store game pattern

var started = false; //var to check if game has started
var level = 0;

$(document).keypress(function () {
	if (!started) {
		$("h1").text("Level " + level);
		nextSequence();
		started = true;
	}
});

function nextSequence() {
  userClickedPattern = []; //refresh the user's pattern array
	level++; //increment level by 1 every new sequence after the first

	$("h1").text("Level " + level); //display lvl increase with h1

	var randomNumber = Math.floor(Math.random() * 4); //generate random number
	var randomChosenColour = buttonColours[randomNumber]; //use random number to pick a random color
	gamePattern.push(randomChosenColour);
	console.log(gamePattern);

	$("#" + randomChosenColour)
		.css({ opacity: 0 })
		.animate({ opacity: 1 }, 150); //flash random colour chosen on reload

	playSound(randomChosenColour);
}

// logic to track user click
$(".btn").click(function () {
	var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
	playSound(userChosenColour);
	animatePress(userChosenColour);

	var currentColourIndex = userClickedPattern.length - 1;

	checkAnswer(currentColourIndex);
});

// Function to play sound
function playSound(name) {
	var sound = new Audio("sounds/" + name + ".mp3");
	sound.play();
}

// Function to animate clicked colour
function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(() => {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

// Function to check answer
function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {  //check if last elements of both arrays are the same
    if (userClickedPattern.length === gamePattern.length) { //check if both arrays are the same length so as to check if player is still entering answers
      setTimeout(() => {
        nextSequence();
        // userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound('wrong');

    $('body').addClass('game-over') //display game over style
    setTimeout(() => {
      $('body').removeClass('game-over')  //remove gameover style after 200ms
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
	}
}


//Function to start over the game
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}