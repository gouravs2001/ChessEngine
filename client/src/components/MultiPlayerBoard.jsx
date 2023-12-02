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
		const [boardOrientation,setBoardOrientation] = useState('white');
	

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


	  useEffect(()=>{

		socket.on('setBoardColor',(data)=>{
			setBoardOrientation(data);
			console.log('opponent Joined')
		})

		socket.on("recieved_move",(move)=>{
			makeAMove(move);
		})
	  },[socket])

	   
	return (
		<>
			<Chessboard position={game.fen() } boardWidth={700} onPieceDrop={onDrop} animationDuration={0} boardOrientation={boardOrientation}  />
			
		</>
	);
};

export default MultiPlayerBoard;