let square = document.getElementsByClassName('square');
let r, g, b, winningRGBValues;
let h1 = document.getElementsByTagName('h1')[0];
let message = document.getElementById('message');

//starts game at medium level with 6 squares
makeTheSquares(6);
setUpSquaresColor(6);
squareClick();

// setInterval(function() {
// 	makeTheSquares(6);
// 	setUpSquaresColor(6);
// 	squareClick();
// }, 1000);

//easy level, 3 squares to pick from
let easyButton = document.getElementById('easy');
easyButton.addEventListener('click', function() {
	hardButton.classList.remove('selected');
	easyButton.classList.add('selected');
	makeTheSquares(3);
	setUpSquaresColor(3);
	squareClick();
});

//hard level, 9 squares to pick from
let hardButton = document.getElementById('hard');
hardButton.addEventListener('click', function() {
	easyButton.classList.remove('selected');
	hardButton.classList.add('selected');
	makeTheSquares(9);
	setUpSquaresColor(9);
	squareClick();
});

//changes the colors
let newColorsButton = document.getElementById('newColors');
newColorsButton.addEventListener('click', function() {
	makeTheSquares(square.length);
	setUpSquaresColor(square.length);
	squareClick();
});

//resets everything to default, deletes old squares, creates new squares
function makeTheSquares(numberOfSquares) {
	//sets Play Again? message to New Colors
	let newColorsButton = document.getElementById('newColors');
	newColorsButton.textContent = 'New Colors';
	//sets message to blank
	message.textContent = '';
	//reset h1 background color to default color
	h1.style.backgroundColor = '#F4976C'; //used style.backgroundColor rather than style.background because it is compatible with all browsers
	//deletes existing squares if there are any which is why square.length is used
	for (let i = 0; i < square.length; i++) {
		let element = document.getElementById('container');
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}
	//creates new squares
	for (let i = 0; i < numberOfSquares; i++) {
		let div = document.createElement('div');
		div.className = 'square';
		document.getElementById('container').appendChild(div);
	}
}

//setting up the squares so that each has a different color
function setUpSquaresColor(numberOfSquares) {
	let winningSquare = Math.floor(Math.random() * numberOfSquares);
	for (let i = 0; i < numberOfSquares; i++) {
		//random color from 0 to 255
		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);
		square[i].style.backgroundColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
		//sets up the h1 to have the correct rgb value heading for user to guess
		if (i === winningSquare) {
			h1.innerHTML = 'Awesome <br>RGB(' + r + ', ' + g + ', ' + b + ')' + '<br>Guessing Game';
			winningRGBValues = 'rgb(' + r + ', ' + g + ', ' + b + ')';
		}
	}
}

//listens for click on each square and takes action
function squareClick() {
	for (let i = 0; i < square.length; i++) {
		square[i].addEventListener('click', function() {
			//picked correct color, win the game
			if (this.style.backgroundColor === winningRGBValues) {
				for (let i = 0; i < square.length; i++) {
					square[i].style.backgroundColor = winningRGBValues;
					square[i].classList.remove('transparent');
				}
				message.textContent = 'YOU WIN!';
				h1.style.backgroundColor = winningRGBValues;
				let newColorsButton = document.getElementById('newColors');
				newColorsButton.textContent = 'Play Again?';
			} else {
				//picked incorrect color, try again
				this.classList.add('transparent');
				message.textContent = 'INCORRECT';
			}
		});
	}
}
