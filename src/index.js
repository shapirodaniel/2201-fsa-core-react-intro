import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import { checkWin } from './util/checkWin';
import './index.css';

const initBoard = new Array(9)
  .fill(null)
  .map((_, idx) => ({ id: `square-${idx}`, move: null }));

const initState = {
  board: [...initBoard],
  winner: null,
  numMoves: 0,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initState };
  }

  handleMove(e) {
    if (this.state.winner) {
      console.log('this game already has a winner!');
      return;
    }

    const squareId = +e.target.id[e.target.id.length - 1];

    if (this.state.board[squareId].move) {
      console.log('this square already has a move!');
      return;
    }

    const move = this.state.numMoves % 2 ? 'O' : 'X';

    const newBoard = this.state.board.map((square) => {
      const currentSquareId = +square.id[square.id.length - 1];

      if (currentSquareId === squareId) {
        return { ...square, move };
      }

      return square;
    });

    const { winner, boardWithWinSequence } = checkWin(newBoard);

    this.setState((prevState) => ({
      board: boardWithWinSequence || newBoard,
      numMoves: ++prevState.numMoves,
      winner: prevState.numMoves === 9 ? 'Draw!' : winner,
    }));
  }

  playAgain() {
    this.setState({ ...initState });
  }

  render() {
    return (
      <Fragment>
        {this.state.winner && (
          <>
            <span>
              {this.state.winner === 'Draw!'
                ? 'Draw!'
                : this.state.winner + ' wins!'}
            </span>
            <button onClick={() => this.playAgain()}>play again</button>
          </>
        )}
        <div className="board" onClick={(e) => this.handleMove(e)}>
          {this.state.board.map(({ id, move, won }) => (
            <span key={id} id={id} className={`square ${won ? 'won' : ''}`}>
              {move}
            </span>
          ))}
        </div>
      </Fragment>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
