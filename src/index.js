// 1st
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 4th later, with handleMove
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
    // wait on onClick till rest of markup done
    <div className="board" onClick={handleMove}>
      {squares.map((val) => (
        // https://reactjs.org/docs/lists-and-keys.html
        // talk about key in .map() fn
        <span key={val} id={`square-${val}`} className="square" />
      ))}
    </div>
  );
}

// 1st
ReactDOM.render(<App />, document.getElementById('root'));
