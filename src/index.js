import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let numMoves = 0;

function App() {
  const squares = new Array(9).fill(null).map((_, idx) => idx);

  const handleMove = (e) => {
    if (e.target.innerText) return;
    e.target.innerText = numMoves % 2 ? 'O' : 'X';
    numMoves++;
  };

  return (
    <div className="board" onClick={handleMove}>
      {squares.map((val) => (
        <span key={val} id={`square-${val}`} className="square" />
      ))}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
