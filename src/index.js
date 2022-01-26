import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// const checkWin = (state) => {
//   const winScenarios = {
//     vertical: [
//       [1, 4, 7],
//       [2, 5, 8],
//       [3, 6, 9],
//     ],
//     horizontal: [
//       [1, 2, 3],
//       [4, 5, 6],
//       [7, 8, 9],
//     ],
//     diagonal: [
//       [1, 5, 9],
//       [3, 5, 7],
//     ],
//   };

//   winScenarios.forEach((scenario) => {
//     scenario.forEach((combination) => {
//       if (
//         state.board
//           .filter((square) => combination.contains(square.id))
//           .every((val) => val === 'X')
//       ) {
//         return { winner: 'X' };
//       }

//       if (
//         state.board
//           .filter((square) => combination.contains(square.id))
//           .every((val) => val === 'O')
//       ) {
//         return { winner: 'O' };
//       }
//     });
//   });

//   return { winner: null };
// };

let numMoves = 0;

function App() {
  const squares = new Array(9).fill(null).map((_, idx) => idx + 1);

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
