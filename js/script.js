const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hanglman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgain = document.querySelector(".play-again");

playAgain.addEventListener('click', ()=>{
location.reload()
})


let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 6;
//selecionar palavra
const getRandomWord = () =>{
    const {palavra, dica} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = palavra;
  document.querySelector(".hint-text").innerHTML = dica;
   wordDisplay.innerHTML = palavra.split("").map(() => `  <li class="letter"></li>`).join("");
   
}

const gameOver = (isWinner) => {
    setTimeout(() =>{
       const modalText = isWinner ? `Você acertou a palavra:` : `você errou a palavra:`;
       gameModal.querySelector("img").src = `images/${isWinner ? 'victory': 'lost'}.gif`
       gameModal.querySelector("h4").innerText = `${isWinner ? 'Parabéns!': 'Fim de Jogo!'}`
       gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>` 
        gameModal.classList.add("show");

    }, 300);
}

//iniciar o jogo
const initGame = (button, clickedLetter) => {

if(currentWord.includes(clickedLetter)){
    [...currentWord].forEach((letter, index) => {
        if(letter === clickedLetter){
            correctLetters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
    })
} else{
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
}
button.disabled = true;
guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`


// condicional para o fim do jogo
if(wrongGuessCount === maxGuesses) return gameOver(false);

if(correctLetters.length === currentWord.length) return gameOver(true);
}

//criação dos botões 
for(let i = 97; i <= 122; i++){

    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
   button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
