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



  const nextMove = ()=>{
    const gameCopy = {...game};
     gameCopy.move(selectedOpening[i])
     if(i< selectedOpening.length){
        i++;
     }
     setGame(gameCopy)
    //  console.log(openings[selectedOpening[i++]]);
  }

  const prevMove = ()=>{
    if(i){
      i--;
    }
    const gameCopy = {...game};
    gameCopy.undo();
    setGame(gameCopy);
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
    console.log(game.history())

 console.log(i,"IIIIIIIIIIIIIIIIIIIIIIIIIIIII")

  
 return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' , marginLeft : '65px' }}>
      <div style = {{marginLeft :  '450px' ,  marginTop : '50px' }} >
      <label htmlFor="difficulty"  style={ {color : 'white' , fontWeight : 'bolder' , fontSize : '25px'}}  > Select Openings:  </label>
        <select id="difficulty" onChange={setopenings} 
        style={{
          padding: '10px',
          fontSize: '16px',
          border: '2px solid #ccc',
          borderRadius: '5px',
          backgroundColor: 'white',
          color: 'black',
          cursor: 'pointer',
        }}>
          {Object.keys(openings).map((key) => (
            <option key={key} value={key} style={{cursor : 'pointer'}}>
              {key}
            </option>
          ))}
        </select>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ marginRight: '20px' }}>
            <Chessboard position={game.fen()} boardWidth={800} isDraggablePiece={() => false} />
          </div>
          <div>
            {/* Game History */}
            <div style={{ marginBottom: '10px', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.3)', height: '600px', minWidth: '400px', maxWidth: '400px', borderRadius: '10px', padding: '20px', fontWeight: 'bolder' , overflowY : 'auto' }}>
            <ol>{game.history().map((item, index) => {
          return (<li>{item}</li>);
        })}</ol>
            </div>
            <button onClick={prevMove} style={{margin : '5px'}}> <img src="./back.png"/> </button>
            <button onClick={nextMove} style={{margin : '5px'}}> <img src="./fwd.png"/> </button>
          </div>
        </div>
      </div>
    // </div>
  );

}

export default Openings

