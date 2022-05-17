var buttonColours = ["red", "blue", "green", "yellow"]; //array of colors

var gamePattern = []; //array to track random pattern which user has to replicate
var userClickedPattern = []; //array to track user clicks or answers

var started = false; //to check if this is the first nextSeq call
var level = 0;

//
$(document).keypress(function () {
	if (!started) {
		nextSequence();
		$("h1").text("Level " + level);
	}
});

//Function to pick random colours
function nextSequence() {
	userClickedPattern = []; //refresh userClickedPattern for every new level

	level++; //increment level on every nextSeq call
	$("h1").text("Level " + level);

	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber]; //random color

	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100); //animation as visual cue for user
	playSound(randomChosenColour);

	console.log("gamePattern: " + gamePattern);
}

//Logic for user clicks
$(".btn").click(function () {
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);
	animatePress(userChosenColour);

	var currentColourIndex = userClickedPattern.length - 1;
	checkAnswer(currentColourIndex);

	console.log("userCLickedPattern :" + userClickedPattern);
});

//Function for sound
function playSound(name) {
	var sound = new Audio("sounds/" + name + ".mp3");
	sound.play();
}

// Function to animate blocks when clicked
function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(() => {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

// Logic for the game
function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");
		if (gamePattern.length === userClickedPattern.length) {
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	} else {
		console.log("wrong");
		startOver();
	}
}

//Function to restart the game
function startOver() {
	playSound("wrong");

	$("body").addClass("game-over");
	setTimeout(() => {
		$("body").removeClass("game-over");
	}, 200);

	$("h1").text("Game Over, Press Any Key to Restart");

	level = 0;
	started = false;
	gamePattern = [];
}
