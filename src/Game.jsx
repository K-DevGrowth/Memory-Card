import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  function getBestScore() {
    if (score > bestScore) {
      setBestScore(score);
    }
    setScore(0);
  }

  return (
    <div className="game">
      <div className="header">
        <div>
          <h1>Pokemon Memory Game</h1>
          <p>
            Get points by clicking on an image but don't click on any more than
            once!
          </p>
        </div>
        <div>
          <p>Score: {score}</p>
          <p>Best score: {bestScore}</p>
        </div>
      </div>
      <Board getScore={() => setScore(score + 1)} getBestScore={getBestScore} />
    </div>
  );
}