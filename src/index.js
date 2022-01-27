// 1st
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let numMoves = 0;

// 2nd
function App() {
  // 3rd
  const squares = new Array(9).fill(null).map((_, idx) => idx);

  // 4th, talk about declarative vs imperative
  // how will we manipulate state?
  const handleMove = (e) => {
    if (e.target.innerText) return;
    e.target.innerText = numMoves % 2 ? 'O' : 'X';
    numMoves++;
  };

  // 3rd
  return (
    <div className="board" onClick={handleMove}>
      {squares.map((val) => (
        <span key={val} id={`square-${val}`} className="square" />
      ))}
    </div>
  );
}

// 1st
ReactDOM.render(<App />, document.getElementById('root'));
