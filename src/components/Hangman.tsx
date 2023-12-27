// src/components/Hangman.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Definicja stylów dla komponentu
const WordContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Letter = styled.span`
  margin: 0 5px;
`;

// Deklaracja interfejsu określającego strukturę właściwości (props) komponentu
interface HangmanProps {
  word: string;
  incorrectGuesses: number;
  correctGuesses: string[];
  onRestart: () => void;
}

// Komponent funkcjonalny Hangman
const Hangman: React.FC<HangmanProps> = ({
  word,
  incorrectGuesses,
  correctGuesses,
  onRestart,
}) => {
  // Funkcja, która zwraca wyraz z zaznaczonymi odgadniętymi literami
  const getDisplayWord = () => {
    return word
      .split('')
      .map((letter) =>
        correctGuesses.includes(letter) ? letter : '_'
      )
      .join(' ');
  };

  // Efekt uboczny, który sprawdza, czy gra się zakończyła
  useEffect(() => {
    const isGameOver =
      incorrectGuesses >= 6 ||
      word.split('').every((letter) => correctGuesses.includes(letter));

    if (isGameOver) {
      alert('Game Over!');
      onRestart();
    }
  }, [incorrectGuesses, correctGuesses, onRestart, word]);

  // Renderowanie komponentu Hangman
  return (
    <div>
      <WordContainer>{getDisplayWord()}</WordContainer>
      <div>Incorrect Guesses: {incorrectGuesses}</div>
    </div>
  );
};

// Eksport komponentu Hangman
export default Hangman;