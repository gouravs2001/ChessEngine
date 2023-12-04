import {React,useState} from 'react'
import { Chessboard } from 'react-chessboard'
import Chess  from 'chess.js'


let i = 0;
const Openings = () => {

const[game,setGame] = useState(new Chess());


const openings = {
    
    "Queen's Gambit" : ['d4','d5','c4','Bf5'] ,
    "London System": ['d4','Nf6','Nf3','e6','Bf4'],
    " Slav Main" : ['d4' ,'d5' ,'c4' ,'c6' ,'Nf3', 'Nf6','Nc3' ,'dxc4' ,'a4','Bf'],
    "Caro Kann Advance" : ['e4', 'c6' ,'d4' ,'d5' ,'e5'],
    "King's Pawn" : ['e4' , 'e5' ,  'f4'],
    "King's Indian Defense" : ['d4' , 'Nf6' ,  'c4' , 'g6'],
    "Grun Feld Defense" : ['d4' , 'Nf6' , 'c4' , 'g6' , 'Nc3' ,  'd5']
    
    
}
const [selectedOpening,setSelectedOpening] = useState(openings['Queen\'s Gambit'])


  const setMove = ()=>{
    const gameCopy = {...game};
     gameCopy.move(selectedOpening[i++])
     setGame(gameCopy)
    //  console.log(openings[selectedOpening[i++]]);
  }

 const  setopenings = (event) =>{
     i =  0
     console.log(event.target.value , selectedOpening)
     const gameCopy = {...game};
     gameCopy.reset();
     setGame(gameCopy);
     console.log(event.target.value , selectedOpening)
     setSelectedOpening(openings[event.target.value])
     
    }
   

 console.log(i,"IIIIIIIIIIIIIIIIIIIIIIIIIIIII")
  
  return (
    <div>
    <select id="difficulty"  onChange={setopenings} >
    {
        Object.keys(openings).map((key)=>{
            return (<option value={key}>{key}</option>)
        })
    }
    </select>
    <Chessboard position={game.fen() } boardWidth={800}  isDraggablePiece={()=>false} />
    <button onClick={setMove}>next</button>
    </div>
  )
}

export default Openings
