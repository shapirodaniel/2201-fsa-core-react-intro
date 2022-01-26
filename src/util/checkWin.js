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

export function checkWin(newBoard) {
  /* 
  
    how does this function work?
    
    1.
    we're checking each of the win scenarios (vertical, horizontal, diagonal)
    by iterating through the winScenarios object and calling .forEach() on each scenario
    
    that yields a sub-array that represents a winning combination
    (since there are only 8 of these, we don't have to worry about the nested loops)
    
    2.
    we filter out the new board that checkWin receives as a param
    and only keep the squares whose id prop is contained in the combination
    where each square is an obj structured { id: number, move: 'X' | 'O' } 

    each square.id is "square-<idx>" where idx is the index of the square in the board array
    so we're accessing the last char in each id string with square.id[square.id.length - 1]
    and we're leveraging the unary operator ( + ) to coerce the string val to a number
    to satisfy our strict equality checks ( === )
    
    3.
    if every square in our filtered array has the same move, we've found a winner! 
    from there, we assign the winner prop of our result (res) object
    and we add a new board array, where each winning square has a "won" prop assigned

    4.
    we leverage this "won" prop when we're assigning classNames to our squares

  */

  const result = { winner: null };

  // this helper generates a board where each winning square has a won prop set to true
  function generateBoardWithWinSequence(newBoard, combination) {
    return newBoard.map((square) => {
      if (combination.includes(+square.id[square.id.length - 1])) {
        return { ...square, won: true };
      }

      return square;
    });
  }

  for (const key in winScenarios) {
    winScenarios[key].forEach((combination) => {
      const filtered = newBoard.filter((square) =>
        combination.includes(+square.id[square.id.length - 1])
      );

      if (filtered.every((square) => square.move === 'X')) {
        result.winner = 'X';
        result.boardWithWinSequence = generateBoardWithWinSequence(
          newBoard,
          combination
        );
      }

      if (filtered.every((square) => square.move === 'O')) {
        result.winner = 'O';
        result.boardWithWinSequence = generateBoardWithWinSequence(
          newBoard,
          combination
        );
      }
    });
  }

  return result;
}
