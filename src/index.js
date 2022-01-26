import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// let numMoves = 0;

// function App() {
//   const squares = new Array(9).fill(null).map((_, idx) => idx + 1);

//   const handleMove = (e) => {
//     if (e.target.innerText) return;
//     e.target.innerText = numMoves % 2 ? 'O' : 'X';
//     numMoves++;
//   };

//   return (
//     <div className="board" onClick={handleMove}>
//       {squares.map((val) => (
//         <span key={val} id={`square-${val}`} className="square" />
//       ))}
//     </div>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Array(9)
        .fill(null)
        .map((_, idx) => ({ id: `square-${idx}`, move: null })),
      winner: null,
      numMoves: 0,
    };
  }

  checkWin(newBoard) {
    const winScenarios = {
      vertical: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      horizontal: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    const res = { winner: null };

    for (const key in winScenarios) {
      winScenarios[key].forEach((combination) => {
        const filtered = newBoard.filter((square) => {
          return combination.includes(+square.id[square.id.length - 1]);
        });

        if (filtered.every((square) => square.move === 'X')) {
          console.log('yay winner is x');
          res.winner = 'X';
        }

        if (filtered.every((square) => square.move === 'O')) {
          console.log('yay winner is o');
          res.winner = 'O';
        }
      });
    }

    return res;
  }

  handleMove(e) {
    const squareId = +e.target.id[e.target.id.length - 1];

    if (this.state.board[squareId].move) {
      console.log('occupato');
      return;
    }

    const move = this.state.numMoves % 2 ? 'O' : 'X';

    const newBoard = [
      ...this.state.board.slice(0, squareId),
      { ...this.state.board[squareId], move: move },
      ...this.state.board.slice(squareId + 1),
    ];

    this.setState((prevState) => ({
      board: newBoard,
      numMoves: ++prevState.numMoves,
      winner: winner,
    }));

    const { winner } = this.checkWin(newBoard);

    console.log('winner is: ', winner);
  }

  render() {
    return (
      <>
        {this.state.winner && <div>{`${this.state.winner} wins!`}</div>}
        <div
          className="board"
          onClick={(e) => {
            this.handleMove(e);
          }}
        >
          {this.state.board.map(({ id, move }) => (
            <span key={id} id={id} className="square">
              {move}
            </span>
          ))}
        </div>
      </>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
