// 1
import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// later
import { checkWin } from './util/checkWin';

// 3
const initBoard = new Array(9)
  .fill(null)
  // talk about how we modified the board to objects
  // so we can track multiple pieces of data per board square
  // the DOM handle (square-#), and the DOM data (move: X|O)
  .map((_, idx) => ({ id: `square-${idx}`, move: null }));

// 3
const initState = {
  board: [...initBoard],
  winner: null,
  numMoves: 0,
};

// 2 -> also skip to bottom and talk about strictmode errors
class App extends Component {
  // 3 build init board and init state above,
  // then simplify this.state and talk about base component receiving props
  constructor(props) {
    super(props);
    this.state = { ...initState };
  }

  // 5 the crux! handle move is now declarative
  // instead of manipulating DOM data, we check and update state
  // on the component, which is used by the reconciliation engine
  // to DRIVE change toward the new state

  /* 
    handleMove basically does 4 things

    - prevent further game play if someone won
    - prevent changing a square that already has a move
    - generate the new game board state and check for a win
    - update state to drive the next render cycle
  
    talk about this.setState and why prevState callback
    https://reactjs.org/docs/react-component.html#setstate

    basically setState is finicky because React makes
    unpredictable optimizations that may delay the setState call

    that makes reading this.state after a setState call difficult to track
    it may not predictably change by the time it's evaluated

    so we use a callback which is "guarantee to fire after the update has been applied"
  */
  handleMove(e) {
    // guard clauses
    if (this.state.winner) {
      console.log('this game already has a winner!');
      return;
    }

    const squareId = +e.target.id[e.target.id.length - 1];

    if (this.state.board[squareId].move) {
      console.log('this square already has a move!');
      return;
    }

    // check for inherent truthiness of the mod of however many moves have happened
    const move = this.state.numMoves % 2 ? 'O' : 'X';

    // we need to evaluate the new state,
    // but we can't manipulate state directly, or directly beforehand
    // since it might not be "ready" by the time we need to use it here
    // so we'll generate an immutable copy of the board and use .map()
    // to replace the square that received the move (the e.target from our event handler)
    const newBoard = this.state.board.map((square) => {
      const currentSquareId = +square.id[square.id.length - 1];

      if (currentSquareId === squareId) {
        return { ...square, move };
      }

      return square;
    });

    // talk briefly about checkWin logic in util
    const { winner, boardWithWinSequence } = checkWin(newBoard);

    // finally we can setState
    // boardWithWinSequence is null until there's a win
    // so we can shortcut that value with our newBoard
    this.setState((prevState) => ({
      board: boardWithWinSequence || newBoard,
      numMoves: ++prevState.numMoves,
      winner: prevState.numMoves === 9 ? 'Draw!' : winner,
    }));
  }

  // last: convenience function for erasing game board / state
  playAgain() {
    this.setState({ ...initState });
  }

  // 4 leave out winner + btn at first, talk about fragment vs empty tag
  // leave out play again btn
  // convert fn-component state vals to this.state.*
  // leave out onClick at first as well as winning className in span.square
  render() {
    return (
      <Fragment>
        {/* 
        
        // do this LAST
        // the state of our winner and a replay button
        // talk about arrow binding and why 
        // () => this.playAgain() results in this-binding but
        // this.playAgain doesn't

        // because () => this.playAgain(), since arrow fns don't have this context
        // and they steal from their surrounding
        // the anon arrow fn here binds to the render() context
        
        // add won logic for className
        // add span for Draw! / X|O wins!
        // add btn for play again
        */}
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

// 2
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
