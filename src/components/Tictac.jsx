import React, { useState } from "react";
import { motion } from "framer-motion";

const Tictac = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTrun] = useState(true);
  const [winner, setWinner] = useState(null);

  const square = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const handleClick = (index) => {
    if (board[index] !== null || winner) {
      return;
    }

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[index] = isXTurn ? "X" : "O";
      const winnerCombination = checkWinner(newBoard);
      if (winnerCombination) {
        setWinner(newBoard[winnerCombination[0]]);
      } else if (newBoard.every((square) => square !== null)) {
        setWinner("Draw");
      }
      return newBoard;
    });

    setIsXTrun(!isXTurn);
  };

  const checkWinner = (newBoard) => {
    const combination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < combination.length; i++) {
      const [a, b, c] = combination[i];

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c]
      ) {
        return combination[i];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTrun(true);
    setWinner(null);
  };

  return (
    <>
      <motion.h2
        initial={{ opacity: 0, x: "-100%" }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        Welcome to the TIC TAC TOE game
      </motion.h2>
      <div className="board">
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="board-row"
        >
          {square(0)}
          {square(1)}
          {square(2)}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="board-row"
        >
          {square(3)}
          {square(4)}
          {square(5)}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="board-row"
        >
          {square(6)}
          {square(7)}
          {square(8)}
        </motion.div>
      </div>
      {winner && (
        <motion.div
          initial={{ opacity: 0, y: "+100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3>
            {winner === "Draw"
              ? "Match Draw"
              : `${winner} is the winner of this Game`}
          </h3>

          <button onClick={resetGame}>Restart</button>
        </motion.div>
      )}
    </>
  );
};

export default Tictac;
