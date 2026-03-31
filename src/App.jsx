import React from "react";
import { languages } from "./assets/languages.js";
import { getFarewellText, getRandomWord } from "./assets/utils.js";
import clsx from "clsx";

export default function AssemblyEndgame() {
  // States Values
  const [currentWord, setCurrentWord] = React.useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetter] = React.useState([]);

  // Derived Values
  let wrongGuessCount = 0;
  guessedLetters.map((letter) => {
    if (!currentWord.includes(letter)) {
      wrongGuessCount++;
    }
  });
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const chips = languages.map((chip, index) => {
    const styles = {
      color: chip.color,
      backgroundColor: chip.backgroundColor,
    };

    const lostClassName = wrongGuessCount > index ? "lost" : "";

    return (
      <span style={styles} key={chip.name} className={lostClassName}>
        {chip.name}
      </span>
    );
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
        disabled={isGameOver}
        aria-disabled={isGameOver}
        aria-label={`Letter ${letter}`}
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

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return <p>{getFarewellText(languages[wrongGuessCount - 1].name)}</p>;
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
    return null;
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetter([]);
  }

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section aria-live="polite" role="status" className={gameStatusClass}>
        {renderGameStatus()}
      </section>
      <section className="chip-container">{chips}</section>
      <section className="current-word">
        {!isGameLost
          ? letterElements
          : currentWord.split("").map((letter, index) => {
              const letterClassName = clsx(
                isGameLost &&
                  !guessedLetters.includes(letter) &&
                  "missed-letter",
              );
              return (
                <span key={index} className={letterClassName}>
                  {letter.toLocaleUpperCase()}
                </span>
              );
            })}
      </section>
      <section className="keyboard">{keyboardEl}</section>
      {isGameOver && (
        <button onClick={startNewGame} className="new-game">
          New Game
        </button>
      )}
    </main>
  );
}
