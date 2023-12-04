import React, { useState, useRef, useReducer, useEffect } from 'react';
import Chess from 'chess.js';
import io from 'socket.io-client';
import qs from 'query-string';
import {Chessboard} from 'react-chessboard'



const SOCKET_SERVER = 'localhost:5000';
let socket = io.connect(SOCKET_SERVER,()=>{socket.emit('opponentJoin')});


const MultiPlayerBoard = (
	
	) => {
		//The FEN representation of the board. Stored in state
		
		const[game,setGame] = useState(new Chess());
		const [text,  setText] =  useState("")
		const [history , setHistory] = useState(game.history())
		const [boardOrientation,setBoardOrientation] = useState('white');
		const [playerID , setPlayerId] = useState(null)
	

	function makeAMove(move) {
		const gameCopy = { ...game };
		console.log(game.history())
		const result = gameCopy.move(move);
		setGame(gameCopy);
		return result; // null if the move was illegal, the move object if the move was legal
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

		socket.emit("move",move)
	   
	
	  }

	  const isWhiteTurn = game.turn() === 'w';
	  const isChecked = game.in_check() || game.in_checkmate();

	  useEffect(()=>{

		socket.on('setBoardColor',(data)=>{
			setBoardOrientation(data);
			console.log('opponent Joined')
		})

		socket.on("recieved_move",(move)=>{
			makeAMove(move);
		})
		socket.on("socketid" , (id)=>{
		setPlayerId(id)
		console.log(playerID)
		}) 
	  },[socket])

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

	   
	  return (
  
		<div style = {{marginLeft :  '450px' ,  marginTop : '50px'}} >
		<div style={{ display: 'flex', alignItems: 'flex-start' }}>
		  <div style={{ marginRight: '20px' }}>
			{/* Chessboard */}
			<Chessboard position={game.fen()} onPieceDrop={onDrop} boardWidth={800} animationDuration={0} autoPromoteToQueen={true} boardOrientation={boardOrientation}/>
		  </div>
	  
		  <div >
		  <div> 
			{/* Game History */}
			<div id="ithasatag" style={{ marginBottom: '10px',  color: 'white' , backgroundColor : 'rgba( 0, 0, 0 , 0.3 )' ,  height : '600px' , minWidth : '400px' , maxWidth : '400px' ,  borderRadius : '10px' , padding : '20px' , fontWeight : 'bolder'}}>
        {history.map((item, index) => {
          return (item = item + '\n');
        })}
      </div>
			<div style={{
  color:  isChecked ? 'white' :   (isWhiteTurn ? 'black' : 'white'),
  backgroundColor:isChecked ? 'red' :   (isWhiteTurn ? 'white' : 'black'),
  borderRadius: '12px',
  alignItems: 'center',
  height: '40px',
  width: '160px',
  paddingTop: '12px',
  paddingLeft: '0px',
  borderWidth: '2px',
  borderColor: 'gold', 
  borderStyle: 'solid',
  margin : "5px",
  paddingBottom: '0px',
  fontWeight : 'bolder',
  textAlign : 'center' ,
  alignContent : 'center',
  paddingRight : '6px'

  
}}>{text}
			</div>
		  </div>
		</div>
			
	  

			  </div>
			</div>
	  );
};

export default MultiPlayerBoard;




// backgroundImage : 'url("./wood.jpeg")'