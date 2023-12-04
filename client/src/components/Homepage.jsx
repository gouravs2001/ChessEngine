import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigator = useNavigate();
  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '15vh',
  };
  const headingStyle = {
    textAlign: 'center',
    marginTop: '140px', 
    color: 'white',
    fontSize: '120px', 
  };

  const chessVerseStyle = {
    color: 'red',
    display: 'inline-block',
  };

  //   const buttonContainerStyle = {
  //   marginTop: '20px',
  // };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: '0px',
    color: 'white',
    padding: '10px 20px',
    margin: '15px',
    cursor: 'pointer',
    transition: 'color 0.3s ' ,
    fontSize : '45px',
    borderRadius : '20px'
  };

  const handleButtonHover = (e) => {
    e.target.style.fontSize = '50px';
    e.target.style.backgroundColor = 'rgba( 255, 255, 255 , 0.3 )';
  };

  const handleButtonLeave = (e) => {
    e.target.style.fontSize = '45px';
    e.target.style.backgroundColor = 'transparent';
  };
  const mainDivColor = {
    margin : 'auto',
    backgroundColor : 'rgba( 0, 0, 0 , 0.2 )',
    maxWidth : '1000px',
    height : '55vh'

  }
    

  return (
    <div style =  {mainDivColor} >
      <h1 style={headingStyle}>
        <span style={chessVerseStyle}>C</span>hess <span style={chessVerseStyle}>V</span>erse
      </h1>
      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onMouseOver={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          onClick =  {() => navigator("/vsAi")}
        >
          vs Ai
        </button>
        <br />
        <button
          style={buttonStyle}
          onMouseOver={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          onClick={() => {navigator("/vsPlayer")}}
        >
          vs Player
        </button>
      </div>
    </div >
  );
};

export default Homepage;