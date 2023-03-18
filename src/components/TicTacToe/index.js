import React, { useEffect, useMemo, useState } from 'react';
import { calculateWinner, checkTie } from '../../helpers/checker';
import Square from '../Square';
import './styles.css'

function TicTacToe() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [tieScore, setTieScore] = useState(0);
  const [status, setStatus] = useState('');

  const current = history[stepNumber];
  const winner = useMemo(() => calculateWinner(current.squares), [current.squares]);
  const tie = useMemo(() => checkTie(current.squares), [current.squares]);

  useEffect(() => {
    const storedPlayer1Score = localStorage.getItem('player1Score');
    const storedPlayer2Score = localStorage.getItem('player2Score');
    const storedTieScore = localStorage.getItem('tieScore');

    if (storedPlayer1Score !== null) {
      setPlayer1Score(parseInt(storedPlayer1Score));
    }
    if (storedPlayer1Score !== null) {
      setPlayer2Score(parseInt(storedPlayer2Score || 0));
    }
    if (storedTieScore !== null) {
      setTieScore(parseInt(storedTieScore));
    }
  }, []);

  useEffect(() => {
    if (winner) {
      setStatus('Winner: ' + winner)

      if (winner === 'X') {
        localStorage.setItem('player1Score', parseInt(player1Score + 1));
        setPlayer1Score(player1Score + 1);
      } else {
        localStorage.setItem('player2Score', parseInt(player2Score + 1));
        setPlayer2Score(player2Score + 1);
      }
    } else if (tie) {
      setTieScore(tieScore + 1);
      localStorage.setItem('tieScore', parseInt(tieScore + 1));
      setStatus('Tie Game')
    } else {
      setStatus('Next player: ' + (xIsNext ? 'X' : 'O'))
    }
  }, [current.squares]);


  function handleClick(i) {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return null;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares: squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  }

  const renderSquare = (i) => {
    return <Square value={current.squares[i]} onClick={() => handleClick(i)} />;
  }

  return (
    <div className="game">
      <div className="game-board">
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>
          Player(x): {player1Score || 0}
        </div>
        <div>
          Player(o): {player2Score || 0}
        </div>
        <div>
          Tie: {tieScore || 0}
        </div>
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default TicTacToe;
