var img1 = document.querySelector('div .img1');
var img2 = document.querySelector('div .img2');

var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var randomImage1 = "images/dice" + randomNumber1 + ".png";
img1.setAttribute('src', randomImage1);

var randomImage2 = "images/dice" + randomNumber2 + ".png";
img2.setAttribute('src', randomImage2);

if (randomNumber1 > randomNumber2) {
	document.querySelector('h1').innerHTML = '🔥Player 1 wins!';
} else if (randomNumber2 > randomNumber1) {
	document.querySelector('h1').innerHTML = 'Player 2 wins!🔥';
} else {
	document.querySelector('h1').innerHTML = '😞Draw!😞';
}