import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigator = useNavigate();
  return (
    <>
      <button onClick={() => navigator("/vsAi")}> vs AI </button>
      <button onClick={() => navigator("/vsPlayer")}> vs Player </button>
    </>
  );
};

export default Homepage;