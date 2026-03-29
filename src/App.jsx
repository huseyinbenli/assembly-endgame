import React from "react";
import { languages } from "./assets/languages.js";
import clsx from "clsx";

export default function AssemblyEndgame() {
  const chips = languages.map((chip) => {
    const styles = { color: chip.color, backgroundColor: chip.backgroundColor };
    return (
      <span style={styles} key={chip.name}>
        {chip.name}
      </span>
    );
  });

  // States Values
  const [currentWord, setCurrentWord] = React.useState("react");
  const [guessedLetters, setGuessedLetter] = React.useState([]);

  // Derived Values
  let wrongGuessCount = 0;
  guessedLetters.map((letter) => {
    if (!currentWord.includes(letter)) {
      wrongGuessCount++;
    }
  });

  function guessLetters(letter) {
    setGuessedLetter((prevLetter) =>
      prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter],
    );
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const keyboardEl = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);

    const style = clsx({ correct: isCorrect, incorrect: isWrong });

    return (
      <button
        key={letter}
        onClick={() => guessLetters(letter)}
        className={style}
      >
        {letter.toLocaleUpperCase()}
      </button>
    );
  });

  const letterElements = currentWord
    .split("")
    .map((letter, index) => (
      <span key={index}>
        {guessedLetters.includes(letter) ? letter.toLocaleUpperCase() : ""}
      </span>
    ));

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="chip-container">{chips}</section>
      <section className="current-word">{letterElements}</section>
      <section className="keyboard">{keyboardEl}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}
