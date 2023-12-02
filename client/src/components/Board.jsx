import { useState } from "react";
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import { evaluateBoard } from "../utils/evaluateBoard";
import {minimax} from '../utils/minimax'

let globalSum = 0;
const Board = ()=> {
  const [game, setGame] = useState(new Chess());

  function checkStatus() {
    if (game.in_checkmate()) {
      console.log("CHeckmate");
    } else if (game.insufficient_material()) {
      console.log("Draw Insufficient Material");    }
       else if (game.in_threefold_repetition()) {
        console.log("threefold repetetion draw");
    } else if (game.in_stalemate()) {
      console.log("stalemate");    }
       else if (game.in_draw()) {
        console.log("50 move repetion Draw");
    } else if (game.in_check()) {
      console.log("Check");
      return false;
    } else {
      console.log("cool");
      return false;
    }
    return true;
  }
  
  function updateAdvantage() {
    if (globalSum > 0) {
     console.log("Black in advantage ",globalSum);
    } else if (globalSum < 0) {
      console.log("White in advantage ",globalSum);
    } else {
      console.log("No one is in advantage ",globalSum);
    }
  }
  

  function makeAMove(move) {
    const gameCopy = { ...game };
    console.log(game.history())
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

 
  


  function getBestMove(game, color, currSum) {
   let depth = 2;
    let [bestMove, bestMoveValue] = minimax(
      game,
      depth,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      color ==='b',
      currSum,
      color
    );
  
    return [bestMove, bestMoveValue];
  }

  function makeBestMove(color) {
    let move
    if (color === 'b') {
       move = getBestMove(game, color, globalSum)[0];
    } 
    else if(color ==='w'){
      move = getBestMove(game, color, -globalSum)[0];
    }
  
    globalSum = evaluateBoard(game, move, globalSum, 'b');
    updateAdvantage();
  
  const gameCopy = { ...game };
  gameCopy.move(move);
  setGame(gameCopy);
      checkStatus();
  }
  

  function onDrop(source, target) {
  
    // see if the move is legal
    let move = makeAMove({
      from: source,
      to: target,
      promotion: 'q', // NOTE: always promote to a queen for example simplicity
    });
  
    // Illegal move
    if (move === null) return 'snapback';
  
    globalSum = evaluateBoard(game, move, globalSum, 'b');
    updateAdvantage();
      // Make the best move for black
      if(!game.in_checkmate() || !game.in_draw() || !game.in_stalemate() || !game.insufficient_material() || !game.in_threefold_repetition())
      window.setTimeout(function () {
        makeBestMove('b');
      }, 250);
   

  }
  

  return (
  <> 
  <Chessboard position={game.fen()} onPieceDrop={onDrop} boardWidth={650} animationDuration = {0} autoPromoteToQueen={true}/>
  <button onClick={()=>{
      let move = getBestMove(game, 'w', -globalSum)[0];
      console.log(move);

    }}>Hint</button>
    <button onClick={()=>{
      const gameCopy = { ...game };
      gameCopy.undo();
      setGame(gameCopy);
      console.log(game.history().length);
      let move = getBestMove(game,game.history().length % 2 === 0 ? 'b':'w',globalSum)[0]
      globalSum = evaluateBoard(game, move, globalSum, 'b');
    updateAdvantage();
      }}>
        undo</button>

  </>
  )
  }

export default Board;