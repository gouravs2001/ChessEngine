import { useEffect, useState } from "react";
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import { evaluateBoard } from "../utils/evaluateBoard";
import {minimax} from '../utils/minimax'
import {FormControl, MenuItem  ,Select  ,InputLabel } from '@mui/material'

let globalSum = 0;
const Board = ()=> {
  const [game, setGame] = useState(new Chess());
  const [text,  setText] =  useState("")
  const [history , setHistory] = useState(game.history())
  const [hint ,setHint] =  useState()
  const [depth , setDepth] = useState(2)

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
    setHint(null)
  
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

  const handleDifficultyChange = (event) => {
    setDepth(event.target.value);
  };



  
useEffect(  () => {
  if (game.turn() === 'w' && (!game.in_checkmate()) && (!game.in_draw()) && (!game.in_stalemate()) && (!game.insufficient_material()) && (!game.in_threefold_repetition()))
  {
    setText("White's Turn")
  }
  else if (game.turn() === "b" && (!game.in_checkmate()) && (!game.in_draw()) && (!game.in_stalemate()) && (!game.insufficient_material()) && (!game.in_threefold_repetition()))
  {
    setText("Black's Turn")
  }
  if (game.in_checkmate())
  {
    setText("Game in Checkmate")
  }
  else if (game.in_check()){
    setText(game.turn() === 'w' ? "White's in Check"  : "Black's in Check")
  }
  else if (game.in_draw())
  {
    setText("Game Draw")
  }
  setHistory(game.history() )


} ,  [game])

const stylefordiv =  {
  marginLeft: '900px',
  // justifyContent : "center",
  // alignItems : "center"
}

const bigdiv = {
  margin : "20px",

   
}

const isWhiteTurn = game.turn() === 'w';
return (
  
  <div style = {{marginLeft :  '450px' ,  marginTop : '50px'}} >
  <label htmlFor="difficulty">Select Difficulty:</label>
  <select id="difficulty" onChange={handleDifficultyChange} value={depth}>
    <option value= "1">Easy</option>
    <option value="2">Medium</option>
    <option value="3">Hard</option>
    </select>
  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
    <div style={{ marginRight: '20px' }}>
      {/* Chessboard */}
      <Chessboard position={game.fen()} onPieceDrop={onDrop} boardWidth={800} animationDuration={0} autoPromoteToQueen={true} />
    </div>

    <div >
    <div> 
      {/* Game History */}
      <div id="ithasatag" style={{ marginBottom: '10px' }}>
        {history.map((item, index) => {
          return (item = item + '\n');
        })}
      </div>
      <div style= {{ color: isWhiteTurn ? 'black' : 'white', backgroundColor: isWhiteTurn ? 'white' : 'black'  ,  borderRadius :'12px'  ,  alignItems : 'center' , height: '40px' , width : '100px'}}> {text}
      </div>
      <div>
        <button
          onClick={() => {
            let move = getBestMove(game, game.turn(), game.turn() === 'w' ? -globalSum : globalSum)[0];
            setHint(move);
          }}
        >
          Hint
        </button>
        <button
          onClick={() => {
            const gameCopy = { ...game };
            gameCopy.undo();
            setGame(gameCopy);
            console.log(game.history().length);
            let move = getBestMove(game, game.history().length % 2 === 0 ? 'b' : 'w', globalSum)[0];
            globalSum = evaluateBoard(game, move, globalSum, 'b');
            updateAdvantage();
          }}
        >
          Undo
        </button>
        </div> 
        <div> 
          {hint === null || hint === undefined ? "" :  hint.from + "---->"+ hint.to}
        </div>
    </div>
  </div>
      

    {/* Buttons */}
    <br/>
        </div>
      </div>
);

    
  }

export default Board;