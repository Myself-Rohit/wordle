import { words } from "./data.js";
const resultInfo = document.querySelector(".resultInfo");
resultInfo.style.display = "none";

const random = Math.floor(Math.random() * 30);
const answer = words[random].toUpperCase();
let chance = 0;
const wordsDiv = document.querySelector("#words-div");
wordsDiv.childNodes.forEach((inp) => {
	if (inp.id != "0") inp.disabled = true;
});
wordsDiv.childNodes[0].disabled = false;
let guess = [];
wordsDiv.addEventListener("keyup", (e) => {
	let element = e.target;

	if (e.keyCode == 8 && !element.previousElementSibling.disabled) {
		element.previousElementSibling.focus();
		element.previousElementSibling.value = "";
		guess.pop();
	}
	if (
		(element.value >= "a" && element.value <= "z") ||
		(element.value >= "A" && element.value <= "Z")
	) {
		guess.push(element.value.toUpperCase());

		if (element.value) {
			element.value = element.value.toUpperCase();
			if (element.nextElementSibling) {
				element.nextElementSibling.disabled = false;
				element.nextElementSibling.focus();
			}
		}

		if (guess.length == 6) {
			checkGuess();
		}
	} else {
		e.target.value = "";
	}
});

function checkGuess() {
	console.log("ans = ", answer);
	console.log("guess = ", guess);
	if (chance < 6) {
		let count = 0;
		for (let i = 0; i < 6; i++) {
			const letter = document.getElementById(chance * 6 + i);
			letter.disabled = true;
			if (answer.indexOf(guess[i]) != -1) {
				letter.classList.add("yellow");
			}
			if (answer[i] == guess[i]) {
				letter.style.background = "green";
				count++;
			}
		}
		guess = [];
		chance++;
		if (count != 6 && chance == 6) {
			gameOver("lost!");
		} else if (count == 6) {
			gameOver("won!");
		}
	}
}

function gameOver(result) {
	const resultInfo = document.querySelector(".resultInfo");
	const winResult = document.querySelector(".win-result");
	winResult.innerHTML = "You " + result;
	resultInfo.style.display = "block";
	wordsDiv.style.display = "none";
	document.getElementById("word").innerHTML = answer;
}
