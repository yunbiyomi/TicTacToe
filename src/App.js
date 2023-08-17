import { useState } from "react";
import "./App.css"
import Board from "./components/Board";

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNum, setStepNum] = useState(0);

  // 위너 판별
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }
    return null;
  }

  const current = history[stepNum];
  const winner = calculateWinner(current.squares);

  // 헤더 멘트
  let status = winner ? `Winner : ${winner}` : `Player : ${xIsNext ? 'X' : 'O'}`;

  // 클릭 시 이벤트
  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNum + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();
    if(calculateWinner(newSquares) || newSquares[i])
      return;

    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, {squares: newSquares}]);
    setXIsNext(prev => !prev);

    setStepNum(newHistory.length);
  }

  const moves = history.map((step, move)=> {
    const desc= move ?
      `#${move}번째 이동` :
      `처음으로`;
      return (
        <li key={move}>
          <button className="move-btn" onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      )
  })

  const jumpTo = (move) => {
    setStepNum(move);
    setXIsNext((move % 2) === 0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)}/>
      </div>
      <div className="game-info">
        <div className='status'>{status}</div>
        <div className="move-wrapper">
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

export default App;
