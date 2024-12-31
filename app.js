import { words } from "./data.js";

const userName = localStorage.getItem("username") || null;
const chanceLeft = document.querySelector(".chance");
let stats = JSON.parse(localStorage.getItem("stats") || null);
if (!stats) {
  stats = {
    streek: 0,
    totalWin: 0,
    totalLost: 0,
  };
}
const resultInfo = document.querySelector(".resultInfo");
resultInfo.style.display = "none";
const random = Math.floor(Math.random() * words.length);
const answer = words[random].toUpperCase();
console.log(answer);
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
    chanceLeft.innerHTML = 6 - chance;
    if (count != 6 && chance == 6) {
      localStorage.setItem(
        "stats",
        JSON.stringify({ ...stats, streek: 0, totalLost: stats.totalLost + 1 })
      );
      document.querySelector(".subheading").style.display = "none";
      document.querySelector(".chance-div").innerHTML = "💔";
      gameOver(`${userName} lost!`);
    } else if (count == 6) {
      localStorage.setItem(
        "stats",
        JSON.stringify({
          ...stats,
          streek: stats.streek + 1,
          totalWin: stats.totalWin + 1,
        })
      );
      document.querySelector(".subheading").style.display = "none";
      document.querySelector(".chance-div").innerHTML = "🥳";
      gameOver(`${userName} won!`);
    }
  }
}

function gameOver(result) {
  const resultInfo = document.querySelector(".resultInfo");
  const winResult = document.querySelector(".win-result");
  winResult.innerHTML = result;
  resultInfo.style.display = "block";
  wordsDiv.style.display = "none";
  document.getElementById("word").innerHTML = answer;
}
