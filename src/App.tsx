import React, { useState, useCallback } from 'react';
import Hangman from './components/Hangman';

const words = ['react', 'typescript', 'hangman'];

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const App: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  const handleGuess = (letter: string) => {
    if (word.includes(letter)) {
      setCorrectGuesses((prev) => [...prev, letter]);
    } else {
      setIncorrectGuesses((prev) => prev + 1);
    }
  };

  const handleRestart = useCallback(() => {
    setWord(getRandomWord());
    setIncorrectGuesses(0);
    setCorrectGuesses([]);
  }, []);

  useState(() => {
    handleRestart();
  });

  return (
    <div>
      <h1>Hangman Game</h1>
      <Hangman
        word={word}
        incorrectGuesses={incorrectGuesses}
        correctGuesses={correctGuesses}
        onRestart={handleRestart}
      />
      <div>
        <h2>Guess a Letter:</h2>
        {/* Wygeneruj przyciski dla wszystkich liter */}
        {alphabet.split('').map((letter) => (
          <button key={letter} onClick={() => handleGuess(letter)}>
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;