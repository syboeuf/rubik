import React from "react";
import { movesArray } from "gameHelpers";

const Options = ({ setOption }) => (
  <div>
    <h1>Faire un mouvement</h1>
    {movesArray.map((option, index) => (
      <button className="button" onClick={() => setOption(option)} key={index}>
        {option}
      </button>
    ))}
  </div>
);

export default Options;
