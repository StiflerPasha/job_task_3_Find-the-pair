let myCards = document.getElementById('container');
let resultsArray = [];
let counter = 0;

let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let appendMilliseconds = document.getElementById("milliseconds");
let appendSeconds = document.getElementById("seconds");
let appendMinutes = document.getElementById("minutes");

let Interval;
let colors = ['1', '2', '3', '4', '5', '6', '7', '8'];
let cards = [...colors, ...colors];

const shuffleArray = (array) => {
	 return array.sort(() => Math.random() - 0.5)
};

shuffleArray(cards);

cards.forEach((card, i) => {
	 card = document.createElement('div');
	 card.dataset.item = cards[i];
	 card.dataset.view = "card";
	 myCards.appendChild(card);

	 card.onclick = function () {
			if (this.className !== 'flipped' && this.className !== 'correct') {
				 this.className = 'flipped';
				 let result = this.dataset.item;
				 resultsArray.push(result);
				 clearInterval(Interval);
				 Interval = setInterval(startTimer, 10);
			}


			if (resultsArray.length > 1) {
				 if (resultsArray[0] === resultsArray[1]) {
						check("correct");
						counter++;
						win();
						resultsArray = [];
				 } else {
						check("reverse");
						resultsArray = [];
				 }
			}
	 }
});


const check = (className) => {
	 let elements = document.getElementsByClassName("flipped");

	 setTimeout(() => {
			for (let i = (elements.length - 1); i >= 0; i--) {
				 elements[i].className = className;
			}
	 }, 500);
};

const win = () => {
	 if (counter === 8) {
			clearInterval(Interval);
			setTimeout(() =>
				alert(`Вы выиграли! \nЗатраченное время: ${getEndTime()}`), 500)
	 }
};

const startTimer = () => {
	 milliseconds++;

	 if (milliseconds < 9) {
			appendMilliseconds.innerHTML = "0" + milliseconds;
	 }

	 if (milliseconds > 9) {
			appendMilliseconds.innerHTML = milliseconds;
	 }

	 if (milliseconds > 99) {
			seconds++;
			appendSeconds.innerHTML = "0" + seconds;
			milliseconds = 0;
			appendMilliseconds.innerHTML = "0" + 0;
	 }

	 if (seconds > 9) {
			appendSeconds.innerHTML = seconds;
	 }

	 if (seconds > 59) {
			minutes++;
			appendMinutes.innerHTML = "0" + minutes;
			seconds = 0;
			appendSeconds.innerHTML = "0" + 0;
	 }

	 if (minutes > 9) {
			appendMinutes.innerHTML = minutes;
	 }
};

const getEndTime = () => `${minutes}:${seconds}.${milliseconds}`;












